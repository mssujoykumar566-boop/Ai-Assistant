import { NextRequest, NextResponse } from "next/server";

const productionClientOrigin = "https://ai-chat-asistant-client.vercel.app";

export function middleware(request: NextRequest) {
  // The hosted API trusts this canonical client origin. Requests from local
  // development and Vercel preview domains are proxied through Next.js, so
  // forward the trusted origin consistently in every environment.
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
