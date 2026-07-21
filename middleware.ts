import { NextRequest, NextResponse } from "next/server";

const productionClientOrigin = "https://ai-chat-asistant-client.vercel.app";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.next();
  }

  // The hosted API currently trusts only the production client origin. Forward
  // local `/api` requests through Next.js using that trusted origin until the
  // backend also whitelists localhost.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("origin", productionClientOrigin);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/api/:path*",
};
