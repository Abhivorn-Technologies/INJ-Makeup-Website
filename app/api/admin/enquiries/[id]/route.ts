import { cookies } from "next/headers";
import { z } from "zod";

import { ADMIN_COOKIE, verifySessionToken } from "@/lib/server/admin-auth";
import { getStore } from "@/lib/server/enquiry-store";
import { enquiryStatuses } from "@/lib/validations";

const patchSchema = z.object({
  status: z.enum(enquiryStatuses).optional(),
  notes: z.string().max(2000).optional(),
});

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/enquiries/[id]">) {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) {
    return Response.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  // Basic CSRF defence in addition to the SameSite=Strict cookie.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return Response.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!z.uuid().safeParse(id).success) {
    return Response.json({ ok: false, error: "Not found." }, { status: 404 });
  }
  const parsed = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "Invalid update." }, { status: 422 });

  const store = getStore();
  if (!store) return Response.json({ ok: false, error: "Database not configured." }, { status: 503 });

  const updated = await store.update(id, parsed.data);
  if (!updated) return Response.json({ ok: false, error: "Not found." }, { status: 404 });
  return Response.json({ ok: true, enquiry: updated });
}
