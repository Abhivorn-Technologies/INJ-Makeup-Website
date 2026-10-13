import "server-only";

import type { StoredEnquiry } from "@/lib/server/enquiry-store";

const TYPE_LABEL: Record<StoredEnquiry["type"], string> = {
  booking: "Appointment enquiry",
  contact: "Contact message",
  course: "Academy course enquiry",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function humanise(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

/**
 * Optional email notification to the studio via Resend's HTTP API.
 * Enabled only when RESEND_API_KEY, NOTIFY_EMAIL_TO and NOTIFY_EMAIL_FROM are set.
 * The enquiry is already saved before this runs, so a failed email never
 * loses a request — it is only logged.
 */
export async function notifyStudio(e: StoredEnquiry) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!key || !to || !from) return { sent: false as const, reason: "not-configured" };

  const rows: [string, string][] = [
    ["Reference", e.reference],
    ["Name", e.fullName],
    ["Phone", e.phone],
    ["Email", e.email ?? "—"],
    ...Object.entries(e.details).map(([k, v]) => [humanise(k), String(v ?? "—")] as [string, string]),
  ];

  const html = `<h2 style="font-family:Georgia,serif">${TYPE_LABEL[e.type]} — ${escapeHtml(e.reference)}</h2>
<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${rows.map(([k, v]) => `<tr><td style="color:#6b5a4c;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}
</table>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#6b5a4c">This is an enquiry, not a confirmed booking. Reply to the client to confirm availability.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: e.email ?? undefined,
        subject: `${TYPE_LABEL[e.type]}: ${e.fullName} (${e.reference})`,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[notify] Resend responded", res.status, await res.text().catch(() => ""));
      return { sent: false as const, reason: "provider-error" };
    }
    return { sent: true as const };
  } catch (err) {
    console.error("[notify] Failed to send enquiry email", err);
    return { sent: false as const, reason: "network-error" };
  }
}
