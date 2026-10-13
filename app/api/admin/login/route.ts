import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  adminConfigured,
  checkPassword,
  createSessionToken,
} from "@/lib/server/admin-auth";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const back = (q: string) => NextResponse.redirect(new URL(`/admin?${q}`, request.url), 303);

  if (!adminConfigured()) return back("error=not-configured");

  const limited = rateLimit(`admin-login:${clientIp(request.headers)}`, 8, 15 * 60 * 1000);
  if (!limited.ok) return back("error=too-many");

  const form = await request.formData().catch(() => null);
  const password = String(form?.get("password") ?? "");
  if (!checkPassword(password)) return back("error=invalid");

  const { token, maxAge } = createSessionToken();
  const res = NextResponse.redirect(new URL("/admin/enquiries", request.url), 303);
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
  return res;
}
