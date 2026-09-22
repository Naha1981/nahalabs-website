
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 12_000;
const UA = "NahaLabs-Revenue-Leak-Audit/1.0 (+https://nahalabs.co.za/)";

type Severity = "critical" | "high" | "medium" | "low";
type Category = "conversion" | "trust" | "mobile" | "technical" | "performance" | "local";

function attr(tag: string, name: string) {
  const pattern = `${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`;
  const match = tag.match(new RegExp(pattern, "i"));
  return (match?.[1] || match?.[2] || match?.[3] || "").trim();
}

function tags(html: string, name: string) {
  return [...html.matchAll(new RegExp("<" + name + "\\b[^>]*>", "gi"))].map((m) => m[0]);
}

function strip(html: string) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function title(html: string) {
  return strip(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function meta(html: string, key: string, value: string) {
  for (const tag of tags(html, "meta")) {
    if (attr(tag, key).toLowerCase() === value.toLowerCase()) return attr(tag, "content");
  }
  return "";
}

function hasRel(html: string, wanted: string) {
  return tags(html, "link").some((tag) =>
    attr(tag, "rel").toLowerCase().split(/\s+/).includes(wanted.toLowerCase())
  );
}

function isPrivateV4(ip: string) {
  const [a, b] = ip.split(".").map(Number);
  return ![a, b].every(Number.isFinite)
    || a === 0
    || a === 10
    || a === 127
    || (a === 169 && b === 254)
    || (a === 172 && b >= 16 && b <= 31)
    || (a === 192 && b === 168)
    || a >= 224;
}

function isPrivateV6(ip: string) {
  const v = ip.toLowerCase();
  return v === "::" || v === "::1" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80") || v.startsWith("ff");
}

async function safe(url: URL) {
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only HTTP and HTTPS URLs are supported.");
  if (url.username || url.password) throw new Error("URLs containing credentials are not supported.");

  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal") || host === "metadata.google.internal") {
    throw new Error("That hostname is not publicly reachable.");
  }

  const kind = isIP(host);
  if (kind === 4 && isPrivateV4(host)) throw new Error("Private or local addresses are not allowed.");
  if (kind === 6 && isPrivateV6(host)) throw new Error("Private or local addresses are not allowed.");
  if (kind) return;

  const records = await lookup(host, { all: true, verbatim: true });
  if (!records.length) throw new Error("The hostname could not be resolved.");

  for (const record of records) {
    const recordType = isIP(record.address);
    if ((recordType === 4 && isPrivateV4(record.address)) || (recordType === 6 && isPrivateV6(record.address))) {
      throw new Error("The hostname resolves to a private or local address.");
    }
  }
}

async function readBody(response: Response) {
  if (!response.body) return { text: await response.text(), bytes: 0 };
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;

  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        throw new Error("The page is larger than the free audit limit.");
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  return { text, bytes };
}

async function fetchPage(input: URL) {
  let current = new URL(input.toString());
  const started = Date.now();

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await safe(current);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(current, {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
        headers: {
          "user-agent": UA,
          accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        },
        signal: controller.signal,
      });

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location) throw new Error("Redirect destination missing.");
        current = new URL(location, current);
        continue;
      }

      const contentType = (response.headers.get("content-type") || "").toLowerCase();
      if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
        throw new Error("That URL does not appear to serve an HTML page.");
      }

      const declared = Number(response.headers.get("content-length") || 0);
      if (declared > MAX_BYTES) throw new Error("The page is larger than the free audit limit.");

      const body = await readBody(response);
      return {
        html: body.text,
        finalUrl: current,
        status: response.status,
        bytes: body.bytes || declared,
        responseMs: Date.now() - started,
      };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("The website took too long to respond.");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error("Too many redirects.");
}

async function exists(base: URL, pathname: string) {
  try {
    const target = new URL(pathname, base);
    await safe(target);
    const response = await fetch(target, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
      headers: { "user-agent": UA },
      signal: AbortSignal.timeout(6000),
    });
    return response.status >= 200 && response.status < 400;
  } catch {
    return false;
  }
}

function f(
  id: string,
  severity: Severity,
  category: Category,
  title: string,
  description: string,
  why: string,
  fixTitle: string,
  fixAction: string,
  points: number
) {
  return { id, severity, category, title, description, whyItMatters: why, fixTitle, fixAction, points };
}

function buildFixPlan(findings: ReturnType<typeof f>[]) {
  const groups = [
    {
      id: "conversion",
      title: "Conversion layer",
      description: "Turn the visitor's intent into a low-friction enquiry.",
      modules: ["Primary CTA", "WhatsApp / click-to-call", "Short form", "Booking / quote path"],
      ids: ["missing-cta", "missing-contact", "missing-whatsapp", "missing-booking", "long-form"],
    },
    {
      id: "trust",
      title: "Trust layer",
      description: "Put evidence beside the decision point.",
      modules: ["Reviews", "Testimonials", "Case studies", "Proof points"],
      ids: ["missing-proof"],
    },
    {
      id: "visibility",
      title: "Visibility layer",
      description: "Repair search, social and local-business signals.",
      modules: ["Title", "Meta", "H1", "Canonical", "Open Graph", "LocalBusiness", "Sitemap / robots"],
      ids: ["missing-title", "weak-title", "missing-description", "missing-h1", "multiple-h1", "missing-canonical", "missing-og", "missing-local-signal", "missing-robots", "missing-sitemap"],
    },
    {
      id: "performance",
      title: "Mobile performance layer",
      description: "Reduce friction before the visitor can even act.",
      modules: ["Viewport", "Image semantics", "Script reduction", "Response-time tuning"],
      ids: ["missing-viewport", "missing-alt", "heavy-page", "slow-response", "js-heavy"],
    },
  ];

  return groups
    .map((group) => {
      const matched = findings.filter((item) => group.ids.includes(item.id));
      if (!matched.length) return null;
      return { id: group.id, title: group.title, description: group.description, modules: group.modules, sourceFindingIds: matched.map((item) => item.id) };
    })
    .filter(Boolean);
}

async function audit(raw: string) {
  const input = raw.trim();
  if (!input) throw new Error("Enter a website URL.");

  const candidate = /^https?:\/\//i.test(input) ? input : "https://" + input;
  let requested = new URL(candidate);
  await safe(requested);

  let page;
  try {
    page = await fetchPage(requested);
  } catch (error) {
    if (requested.protocol !== "https:") throw error;
    requested = new URL(requested.toString().replace(/^https:/i, "http:"));
    page = await fetchPage(requested);
  }

  const html = page.html;
  const text = strip(html);
  const pageLinks = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({
    href: attr(m[0], "href"),
    text: strip(m[2]).toLowerCase(),
  }));
  const interactive = [
    ...[...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)].map((m) => strip(m[1]).toLowerCase()),
    ...pageLinks.map((link) => link.text),
  ];

  const titleText = title(html);
  const description = meta(html, "name", "description");
  const ogTitle = meta(html, "property", "og:title");
  const ogDescription = meta(html, "property", "og:description");
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1])).filter(Boolean);
  const forms = (html.match(/<form\b/gi) || []).length;
  const firstForm = html.match(/<form\b[^>]*>[\s\S]*?<\/form>/i)?.[0] || "";
  const formFields = (firstForm.match(/<(?:input|select|textarea)\b/gi) || []).length;
  const images = tags(html, "img");
  const imagesMissingAlt = images.filter((tag) => !attr(tag, "alt")).length;
  const scripts = tags(html, "script").length;
  const linksCount = tags(html, "a").length;

  const linkText = pageLinks.map((link) => link.href + " " + link.text).join(" ");
  const phone = pageLinks.some((link) => /^tel:/i.test(link.href)) || /(?:\+27|0[1-9][0-9])[\s().-]*[0-9]{3}[\s.-]*[0-9]{4}/.test(text);
  const email = /mailto:/i.test(html) || /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text);
  const whatsapp = /whatsapp|wa\.me/i.test(linkText);
  const booking = /book|appointment|schedule|calendly|acuity|setmore|booksy|fresha|simplybook|reserve/i.test(linkText);
  const form = forms > 0;
  const contactPath = /contact|enquir|quote|request|mailto:|tel:|whatsapp|wa\.me/i.test(linkText) || form || phone || email;
  const cta = /book|quote|enquir|contact|call|whatsapp|get started|request|schedule|appointment|reserve|consult|order/i.test(interactive.join(" "));
  const proof = /testimonial|review|case stud|customer stor|five star|★★★★★/i.test(text)
    || /Review|AggregateRating/i.test(html)
    || /\b[0-9]{2,}[+]?\s*(?:clients|customers|projects|reviews|years)\b/i.test(text);
  const localSchema = /"@type"\s*:\s*"(?:LocalBusiness|ProfessionalService|Restaurant|MedicalBusiness|Store)"/i.test(html);
  const localSignal = localSchema
    || /PostalAddress|addressLocality|areaServed/i.test(html)
    || /\b(?:Johannesburg|Soweto|Sandton|Pretoria|Cape Town|Durban|Gauteng|South Africa|Midrand|Randburg|Centurion)\b/i.test(text);
  const viewport = tags(html, "meta").some((tag) => attr(tag, "name").toLowerCase() === "viewport");
  const canonical = hasRel(html, "canonical");
  const robots = await exists(page.finalUrl, "/robots.txt");
  const sitemap = await exists(page.finalUrl, "/sitemap.xml");
  const javascriptHeavy = text.split(/\s+/).filter(Boolean).length < 180 && scripts >= 10;

  const findings = [];
  if (page.finalUrl.protocol !== "https:") findings.push(f("no-https", "critical", "technical", "The website is not serving securely over HTTPS.", "The final URL is HTTP.", "An insecure first impression can create trust friction.", "Force HTTPS", "Redirect all HTTP traffic to HTTPS and update canonicals.", 10));
  if (!titleText) findings.push(f("missing-title", "high", "technical", "The page has no title tag.", "No HTML title was detected.", "The main search label is missing.", "Write a commercial title", "Use a concise service + location + brand title.", 7));
  else if (titleText.length < 25 || titleText.length > 65) findings.push(f("weak-title", "medium", "technical", "The page title is not well formed.", "Current title length: " + titleText.length + " characters.", "The title is a core signal for what the page is about.", "Rewrite the title", "Use a concise service + location + brand title.", 4));
  if (!description) findings.push(f("missing-description", "medium", "technical", "There is no meta description.", "No description meta tag was detected.", "Search snippets get less controlled context about the offer.", "Write a conversion-focused description", "Add a concise description explaining the offer and next action.", 5));
  if (!h1s.length) findings.push(f("missing-h1", "high", "technical", "There is no clear H1 headline.", "No H1 heading was detected.", "Visitors should understand the offer within seconds.", "Rewrite the hero", "Add one clear H1 focused on the customer problem or outcome.", 7));
  else if (h1s.length > 1) findings.push(f("multiple-h1", "low", "technical", "The page has multiple H1 headings.", "Detected " + h1s.length + " H1 headings.", "Competing primary headlines can weaken the hierarchy.", "Simplify the heading hierarchy", "Keep one primary H1 and move supporting headings to H2/H3.", 2));
  if (!viewport) findings.push(f("missing-viewport", "high", "mobile", "The page is missing a mobile viewport declaration.", "No responsive viewport declaration was detected.", "Mobile visitors may see a poor first experience.", "Fix the mobile viewport", "Add a responsive viewport and verify on a real phone.", 8));
  if (!canonical) findings.push(f("missing-canonical", "medium", "technical", "No canonical URL was found.", "A canonical link was not detected.", "The site lacks an explicit preferred URL.", "Add a canonical", "Set the canonical URL for the commercial page.", 3));
  if (!ogTitle && !ogDescription) findings.push(f("missing-og", "low", "technical", "Social sharing metadata is missing.", "No Open Graph title or description was detected.", "Shared links may have weak previews.", "Add social preview metadata", "Add Open Graph title, description and image.", 2));
  if (!cta) findings.push(f("missing-cta", "critical", "conversion", "There is no obvious primary call to action.", "No clear booking, quote, call, enquiry or WhatsApp action was detected.", "Traffic without a next action is traffic that may not convert.", "Install a primary CTA", "Add one dominant action and repeat it near decision points.", 18));
  if (!contactPath) findings.push(f("missing-contact", "critical", "conversion", "The page does not expose a clear enquiry path.", "No obvious phone, email, form, WhatsApp or contact path was detected.", "High-intent visitors can leave because the next step is unclear.", "Create a friction-light enquiry path", "Add WhatsApp or call plus a short form or booking path.", 18));
  if (!whatsapp) findings.push(f("missing-whatsapp", "high", "conversion", "No WhatsApp conversion path was detected.", "No WhatsApp or wa.me link was found.", "A direct chat path can shorten the route to an actual conversation.", "Add WhatsApp", "Add a tracked WhatsApp CTA with a useful prefilled message.", 10));
  if (!booking && !form) findings.push(f("missing-booking", "high", "conversion", "There is no obvious booking, quote or enquiry mechanism.", "No booking provider or form was detected.", "The visitor may understand the offer but still have no low-friction way to become a lead.", "Install a conversion path", "Add a short form, booking, call or WhatsApp flow.", 10));
  if (form && formFields > 6) findings.push(f("long-form", "high", "conversion", "The first enquiry form is asking for too much.", "Detected " + formFields + " fields in the first form.", "Long forms add friction before the visitor has received value.", "Shorten the lead form", "Ask only for the minimum details needed to qualify the enquiry.", 8));
  if (!proof) findings.push(f("missing-proof", "high", "trust", "Customer proof is not clearly visible.", "No obvious reviews, testimonials, case studies or quantified proof were detected.", "People often need evidence immediately before they enquire.", "Add proof near the CTA", "Place strong reviews or proof points beside the conversion path.", 8));
  if (images.length && imagesMissingAlt >= Math.max(3, Math.ceil(images.length / 2))) findings.push(f("missing-alt", "medium", "technical", "Many images are missing alt text.", imagesMissingAlt + " of " + images.length + " images have no alt text.", "Important visual content is harder to interpret.", "Clean up image semantics", "Add descriptive alt text to meaningful images.", 3));
  if (!localSignal) findings.push(f("missing-local-signal", "medium", "local", "Local relevance is not clearly expressed.", "No LocalBusiness schema, service-area signal or obvious local address signal was detected.", "A local visitor should quickly understand where the business operates.", "Add local business signals", "Add accurate location/service-area copy and LocalBusiness schema.", 5));
  if (!robots) findings.push(f("missing-robots", "low", "technical", "robots.txt was not found.", "The standard crawler guidance file could not be fetched.", "It is part of a clean technical foundation.", "Add robots.txt", "Publish a simple robots.txt pointing to the sitemap.", 2));
  if (!sitemap) findings.push(f("missing-sitemap", "low", "technical", "sitemap.xml was not found.", "The standard sitemap endpoint could not be fetched.", "A sitemap helps crawlers discover important URLs.", "Publish a sitemap", "Add a sitemap and keep it current.", 2));
  if (page.bytes > MAX_BYTES * 0.75) findings.push(f("heavy-page", "high", "performance", "The HTML payload is unusually large.", "The response is about " + Math.round(page.bytes / 1024) + " KB.", "Large responses can delay meaningful content.", "Reduce page weight", "Remove unnecessary markup and defer non-critical assets.", 6));
  if (page.responseMs > 4000) findings.push(f("slow-response", "high", "performance", "The first response is slow.", "The audit server measured about " + page.responseMs + " ms.", "Waiting is a conversion cost before the visitor sees the offer.", "Reduce response time", "Move slow work off the request path and improve caching/hosting.", 7));
  if (javascriptHeavy) findings.push(f("js-heavy", "medium", "performance", "The page looks heavily dependent on JavaScript.", "The raw HTML contains little readable content but many scripts.", "A weak initial render can hurt search, previews and low-bandwidth users.", "Improve first-content rendering", "Render the core offer, CTA and proof directly in HTML and defer non-critical JavaScript.", 6));

  findings.sort((a, b) => ({ critical: 4, high: 3, medium: 2, low: 1 }[b.severity] - { critical: 4, high: 3, medium: 2, low: 1 }[a.severity] || b.points - a.points));

  const penalty = Math.min(82, findings.reduce((sum, item) => sum + item.points, 0));
  const score = Math.max(18, 100 - penalty);
  const grade = score >= 78 ? "strong" : score >= 55 ? "needs-attention" : "high-leak-risk";

  return {
    url: input,
    finalUrl: page.finalUrl.toString(),
    domain: page.finalUrl.hostname,
    scannedAt: new Date().toISOString(),
    score,
    grade,
    summary: score >= 78
      ? "The core conversion foundation is present. The next gains are likely to come from tightening the highest-value leaks."
      : score >= 55
        ? "The website is doing some of the work, but several visible leaks can make traffic harder to turn into enquiries."
        : "The page has multiple visible conversion leaks. Fix the enquiry path, trust signals and mobile friction before adding more traffic.",
    findings,
    fixPlan: buildFixPlan(findings),
    metrics: {
      responseMs: page.responseMs,
      pageSizeKb: Math.round((page.bytes / 1024) * 10) / 10,
      status: page.status,
      h1Count: h1s.length,
      formCount: forms,
      firstFormFieldCount: formFields,
      imageCount: images.length,
      imagesMissingAlt,
      scriptCount: scripts,
      linkCount: linksCount,
    },
    signals: {
      https: page.finalUrl.protocol === "https:",
      title: Boolean(titleText),
      metaDescription: Boolean(description),
      h1: h1s.length > 0,
      viewport,
      canonical,
      openGraph: Boolean(ogTitle || ogDescription),
      cta,
      contactPath,
      phone,
      email,
      whatsapp,
      booking,
      form,
      socialProof: proof,
      localBusinessSchema: localSchema,
      localSignal,
      robots,
      sitemap,
      javascriptHeavy,
    },
  };
}

const limit = new Map<string, { count: number; resetAt: number }>();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const forwarded = String(req.headers["x-forwarded-for"] || "");
  const ip = forwarded.split(",")[0].trim() || String(req.socket?.remoteAddress || "unknown");
  const now = Date.now();
  const current = limit.get(ip);

  if (!current || current.resetAt <= now) {
    limit.set(ip, { count: 1, resetAt: now + 60_000 });
  } else {
    current.count += 1;
    if (current.count > 3) {
      return res.status(429).json({ error: "Free scan limit reached. Please try again in a minute." });
    }
  }

  try {
    const raw = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const url = String(raw?.url || "").trim();
    if (!url || url.length > 2048) return res.status(400).json({ error: "Enter a valid website URL." });

    const result = await audit(url);
    return res.status(200).json({ ok: true, audit: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Audit failed.";
    console.error("[audit]", error);
    return res.status(400).json({ error: message });
  }
}
