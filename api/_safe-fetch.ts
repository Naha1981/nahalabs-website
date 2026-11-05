import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { Agent, fetch as undiciFetch } from "undici";
import ipaddr from "ipaddr.js";

export function publicAddress(address: string): boolean {
  try {
    const parsed = ipaddr.process(address);
    return parsed.range() === "unicast";
  } catch { return false; }
}

export async function resolvePublic(url: URL, resolver = lookup): Promise<{ address: string; family: number }> {
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Only HTTP and HTTPS URLs are supported.");
  if (url.username || url.password) throw new Error("URLs containing credentials are not supported.");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("Only standard web ports are supported.");
  const host = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (host === "localhost" || /\.(localhost|local|internal)$/.test(host)) throw new Error("That hostname is not publicly reachable.");
  const kind = isIP(host);
  const records = kind ? [{ address: host, family: kind }] : await resolver(host, { all: true, verbatim: true });
  if (!records.length || records.some(r => !publicAddress(r.address))) throw new Error("Private or local addresses are not allowed.");
  return records[0];
}

export function pinnedLookup(address: { address: string; family: number }) {
  return (_host: string, options: any, callback: any) => {
    // Node may ask for all addresses. Never do another DNS lookup here.
    if (options?.all) callback(null, [address]);
    else callback(null, address.address, address.family);
  };
}

export async function safeFetch(url: URL, init: any = {}) {
  const address = await resolvePublic(url);
  const dispatcher = new Agent({ connect: { lookup: pinnedLookup(address) } });
  try {
    const response = await undiciFetch(url, { ...init, redirect: "manual", dispatcher });
    // Callers must consume/cancel the body before releasing the connection.
    return { response: response as unknown as Response, close: () => dispatcher.destroy() };
  } catch (error) { await dispatcher.destroy(); throw error; }
}
