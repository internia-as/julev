import { createRateLimiter } from "@/lib/rateLimiter";
import { NextApiRequest, NextApiResponse } from "next";

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter: number;
}

interface RouteConfig {
  limit: number;
  windowMs: number;
  prefix: string;
}

const routeConfigs: Record<string, RouteConfig> = {
  translate: { limit: 30, windowMs: 60_000, prefix: "translate" },
  grammar: { limit: 20, windowMs: 60_000, prefix: "grammar" },
  speech: { limit: 15, windowMs: 60_000, prefix: "speech" },
  divvun: { limit: 60, windowMs: 60_000, prefix: "divvun" },
  sikor: { limit: 30, windowMs: 60_000, prefix: "sikor" },
  kartverket: { limit: 30, windowMs: 60_000, prefix: "kartverket" },
  localSearch: { limit: 60, windowMs: 60_000, prefix: "localSearch" },
  statistics: { limit: 120, windowMs: 60_000, prefix: "statistics" },
};

const limiterCache = new Map<
  string,
  (req: NextApiRequest) => Promise<RateLimitResult>
>();

function getLimiter(routeKey: string) {
  if (limiterCache.has(routeKey)) {
    return limiterCache.get(routeKey)!;
  }

  const config = routeConfigs[routeKey];
  if (!config) {
    console.warn(
      `[RateLimit] Unknown route key "${routeKey}", using default limiter`
    );
    const limiter = createRateLimiter({
      maxRequests: 60,
      windowMs: 60_000,
      keyPrefix: "default",
    });
    limiterCache.set(routeKey, limiter);
    return limiter;
  }

  const limiter = createRateLimiter({
    maxRequests: config.limit,
    windowMs: config.windowMs,
    keyPrefix: config.prefix,
  });
  limiterCache.set(routeKey, limiter);
  return limiter;
}

export function clearLimiterCache() {
  limiterCache.clear();
}

export function setRateLimitHeaders(
  res: NextApiResponse,
  result: RateLimitResult
) {
  res.setHeader("X-RateLimit-Limit", String(result.limit));
  res.setHeader("X-RateLimit-Remaining", String(result.remaining));
  res.setHeader("X-RateLimit-Reset", String(result.reset));
}

export function withRateLimit(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  routeKey: string
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const checkLimit = getLimiter(routeKey);
    const result = await checkLimit(req);

    if (!result.allowed) {
      res.setHeader("Retry-After", String(result.retryAfter));
      setRateLimitHeaders(res, result);
      console.warn(
        `[RateLimit] 429 for ${routeKey} from ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress}`
      );
      return res.status(429).json({
        error: "Too Many Requests",
        message: "Rate limit exceeded. Please try again later.",
        retryAfter: result.retryAfter,
      });
    }

    setRateLimitHeaders(res, result);

    if (result.remaining === 0) {
      console.warn(
        `[RateLimit] Limit reached for ${routeKey} from ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress}`
      );
    }

    await handler(req, res);
  };
}