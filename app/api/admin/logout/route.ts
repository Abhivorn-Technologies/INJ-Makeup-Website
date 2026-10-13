import { NextResponse } from "next/server";

import { ADMIN_COOKIE } from "@/lib/server/admin-auth";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/admin", request.url), 303);
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
