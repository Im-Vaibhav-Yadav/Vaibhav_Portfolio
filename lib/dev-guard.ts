import { NextRequest } from "next/server";

/**
 * Edit-mode writes (content save + image upload) must only ever work
 * when this app is running locally via `npm run dev`. Two independent
 * checks, both must pass:
 *  1. NODE_ENV is not "production" (true for `next dev`, false for any
 *     built/deployed instance — including `next start`).
 *  2. The request's Host header is localhost/127.0.0.1 — real visitors
 *     to a hosted domain can never spoof this in a way that matters,
 *     since browsers set Host to the domain they actually connected to.
 *
 * This protects against a misconfigured host that fails to set
 * NODE_ENV=production, without relying on that single signal alone.
 */
export function isLocalEditRequest(req: NextRequest): boolean {
  if (process.env.NODE_ENV === "production") return false;
  const host = req.headers.get("host") ?? "";
  return host.startsWith("localhost") || host.startsWith("127.0.0.1");
}
