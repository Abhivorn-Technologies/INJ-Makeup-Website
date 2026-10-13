import { after } from "next/server";

import { getStore } from "@/lib/server/enquiry-store";
import { notifyStudio } from "@/lib/server/notify";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";
import { enquirySchema, normalisePhone } from "@/lib/validations";

const MIN_FILL_MS = 3000;
const MAX_BODY_BYTES = 16_000;

function json(body: unknown, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "Unsupported request format." }, 415);
  }

  const ip = clientIp(request.headers);
  const limited = rateLimit(`enquiry:${ip}`, 8, 10 * 60 * 1000);
  if (!limited.ok) {
    return json(
      { ok: false, error: "Too many requests. Please try again shortly, or contact us on WhatsApp." },
      429,
      { "Retry-After": String(limited.retryAfter) },
    );
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "Request too large." }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Honeypot / timing failures are reported generically.
    if (fieldErrors.website || fieldErrors.startedAt) {
      return json({ ok: false, error: "We could not accept this submission." }, 400);
    }
    return json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, 422);
  }

  const { consent: _consent, website: _website, startedAt, ...enquiry } = parsed.data;
  void _consent;
  void _website;
  if (Date.now() - startedAt < MIN_FILL_MS) {
    return json({ ok: false, error: "We could not accept this submission. Please try again." }, 400);
  }

  const store = getStore();
  if (!store) {
    console.error("[enquiries] No DATABASE_URL configured — enquiry was NOT saved.");
    return json(
      {
        ok: false,
        error:
          "Online enquiries are temporarily unavailable. Please call or WhatsApp us and we'll be happy to help.",
      },
      503,
    );
  }

  try {
    const saved = await store.save({ ...enquiry, phone: normalisePhone(enquiry.phone) });
    after(() => notifyStudio(saved));
    return json({ ok: true, reference: saved.reference }, 201);
  } catch (err) {
    console.error("[enquiries] Failed to save enquiry", err);
    return json(
      {
        ok: false,
        error:
          "Something went wrong and your enquiry was not sent. Please try again, or call or WhatsApp us.",
      },
      500,
    );
  }
}
