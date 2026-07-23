import { RedisClientType } from "redis";
import redisClient from "@/lib/redisClient";
import { NextApiRequest } from "next";

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter: number;
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return typeof forwarded === "string" ? forwarded.split(",")[0].trim() : forwarded[0];
  }
  const ip = req.socket?.remoteAddress;
  if (!ip) return "unknown";
  return ip === "::1" ? "127.0.0.1" : ip;
}

interface CreateRateLimiterOptions {
  maxRequests: number;
  windowMs?: number;
  keyPrefix?: string;
}

export function createRateLimiter({
  maxRequests,
  windowMs = 60_000,
  keyPrefix = "rl",
}: CreateRateLimiterOptions) {
  async function checkRateLimit(
    req: NextApiRequest
  ): Promise<RateLimitResult> {
    const ip = getClientIP(req);
    const now = Date.now();
    const windowStart = now - windowMs;
    const key = `rl:${keyPrefix}:${ip}`;

    try {
      const client = redisClient as RedisClientType;

      await client.zRemRangeByScore(key, "-inf", String(windowStart));
      await client.expire(key, Math.ceil(windowMs / 1000));

      const currentCount = await client.zCard(key);

      if (currentCount >= maxRequests) {
        const oldest = await client.zRangeWithScores(key, 0, 0);
        const oldestScore = oldest?.[0]?.score ?? now;
        const retryAfter = Math.ceil((oldestScore + windowMs - now) / 1000);

        return {
          allowed: false,
          limit: maxRequests,
          remaining: 0,
          reset: Math.ceil((oldestScore + windowMs) / 1000),
          retryAfter: Math.max(1, retryAfter),
        };
      }

      const member = `${now}-${Math.random().toString(36).slice(2, 9)}`;
      await client.zAdd(key, { score: now, value: member });

      const remaining = maxRequests - currentCount - 1;
      const reset = Math.ceil((now + windowMs) / 1000);

      return {
        allowed: true,
        limit: maxRequests,
        remaining,
        reset,
        retryAfter: 0,
      };
    } catch (error) {
      console.warn("[RateLimit] Redis unavailable, skipping rate limit:", error);
      return {
        allowed: true,
        limit: maxRequests,
        remaining: maxRequests,
        reset: Math.ceil((now + windowMs) / 1000),
        retryAfter: 0,
      };
    }
  }

  return checkRateLimit;
}