import { NextResponse, type NextRequest } from "next/server";

import { visibleArticles } from "@/lib/journal";

/**
 * Journal articles are static content. Any /blog/<slug> that isn't a visible
 * article is rewritten to a missing route so it returns a real 404 status
 * (instead of a streamed "soft" 404).
 */
const slugs = new Set(visibleArticles().map((a) => a.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !slugs.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/blog/:slug",
};
