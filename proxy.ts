import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/basicAuth";

// Statistics and word suggestions contain what users typed, so they are
// only shown to logged-in staff. Submitting a suggestion stays public.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api/suggestions") && req.method === "POST") {
    return NextResponse.next();
  }

  if (isAuthorized(req.headers.get("authorization"))) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Julev statistikk"' },
  });
}

export const config = {
  matcher: ["/statistics/:path*", "/api/statistics/:path*", "/api/suggestions/:path*"],
};
