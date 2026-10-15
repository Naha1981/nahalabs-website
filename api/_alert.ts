/**
 * Emails a copy of every stored submission to the owner via Resend.
 * Storage (Blob) stays the source of truth; the email is only an alert,
 * so a mail failure must never fail the visitor's submission.
 */

const ALERT_TO = "ai-solutions@nahalabs.co.za";
const ALERT_FROM = "NahaLabs Website <alerts@nahalabs.co.za>";

export async function sendLeadAlert(subject: string, text: string, replyTo?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[alert] RESEND_API_KEY is not configured - submission stored but no alert sent");
    return;
  }
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: ALERT_FROM,
        to: [ALERT_TO],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    });
    if (!resp.ok) {
      console.error("[alert] Resend rejected the alert:", resp.status, await resp.text().catch(() => ""));
    }
  } catch (error) {
    console.error("[alert] failed to send:", error);
  }
}
