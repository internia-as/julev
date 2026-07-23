import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createMockRequest } from "../../helpers";

const mockStore = new Map<string, Map<string, number>>();

const mockRedis = {
  zRemRangeByScore: vi.fn(async (key, min, max) => {
    const set = mockStore.get(key);
    if (!set) return 0;
    const minNum = min === "-inf" ? -Infinity : Number(min);
    const maxNum = max === "+inf" ? Infinity : Number(max);
    let removed = 0;
    for (const [member, score] of set) {
      if (score >= minNum && score <= maxNum) {
        set.delete(member);
        removed++;
      }
    }
    return removed;
  }),
  zCard: vi.fn(async (key) => {
    return mockStore.get(key)?.size ?? 0;
  }),
  zAdd: vi.fn(async (key, members) => {
    if (!mockStore.has(key)) {
      mockStore.set(key, new Map());
    }
    const set = mockStore.get(key)!;
    if (Array.isArray(members)) {
      for (const m of members) {
        set.set(m.value, m.score);
      }
    } else {
      set.set(members.value, members.score);
    }
    return members.length ?? 1;
  }),
  expire: vi.fn(async () => true),
  zRangeWithScores: vi.fn(async (key, start, stop) => {
    const set = mockStore.get(key);
    if (!set) return [];
    const entries = Array.from(set.entries()).map(([value, score]) => ({
      value,
      score,
    }));
    return entries.slice(start, stop + 1);
  }),
};

vi.mock("@/lib/redisClient", () => ({ default: mockRedis }));

describe("Rate Limiter", () => {
  beforeEach(() => {
    vi.resetModules();
    mockStore.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should allow requests under the limit", async () => {
    const { createRateLimiter } = await import("@/lib/rateLimiter");
    const checkLimit = createRateLimiter({
      maxRequests: 3,
      windowMs: 60_000,
      keyPrefix: "test",
    });

    const req = createMockRequest({
      socket: { remoteAddress: "127.0.0.1" },
    });

    const result1 = await checkLimit(req);
    expect(result1.allowed).toBe(true);
    expect(result1.remaining).toBe(2);
    expect(result1.limit).toBe(3);

    const result2 = await checkLimit(req);
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(1);

    const result3 = await checkLimit(req);
    expect(result3.allowed).toBe(true);
    expect(result3.remaining).toBe(0);
  });

  it("should deny requests at the limit", async () => {
    const { createRateLimiter } = await import("@/lib/rateLimiter");
    const checkLimit = createRateLimiter({
      maxRequests: 2,
      windowMs: 60_000,
      keyPrefix: "test",
    });

    const req = createMockRequest({
      socket: { remoteAddress: "10.0.0.1" },
    });

    await checkLimit(req);
    await checkLimit(req);

    const result = await checkLimit(req);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it("should track different IPs independently", async () => {
    const { createRateLimiter } = await import("@/lib/rateLimiter");
    const checkLimit = createRateLimiter({
      maxRequests: 1,
      windowMs: 60_000,
      keyPrefix: "test",
    });

    const req1 = createMockRequest({
      socket: { remoteAddress: "192.168.1.1" },
    });
    const req2 = createMockRequest({
      socket: { remoteAddress: "192.168.1.2" },
    });

    await checkLimit(req1);
    const result1 = await checkLimit(req1);
    expect(result1.allowed).toBe(false);

    const result2 = await checkLimit(req2);
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(0);
  });

  it("should extract IP from x-forwarded-for header", async () => {
    const { createRateLimiter } = await import("@/lib/rateLimiter");
    const checkLimit = createRateLimiter({
      maxRequests: 1,
      windowMs: 60_000,
      keyPrefix: "test",
    });

    const req1 = createMockRequest({
      headers: { "x-forwarded-for": "192.168.1.1, 10.0.0.1" },
    });
    const req2 = createMockRequest({
      headers: { "x-forwarded-for": "192.168.1.1" },
    });

    await checkLimit(req1);
    const result = await checkLimit(req2);
    expect(result.allowed).toBe(false);
  });

  it("should normalize IPv6 localhost to IPv4", async () => {
    const { createRateLimiter } = await import("@/lib/rateLimiter");
    const checkLimit = createRateLimiter({
      maxRequests: 1,
      windowMs: 60_000,
      keyPrefix: "test",
    });

    const req1 = createMockRequest({
      socket: { remoteAddress: "::1" },
    });
    const req2 = createMockRequest({
      socket: { remoteAddress: "127.0.0.1" },
    });

    await checkLimit(req1);
    const result = await checkLimit(req2);
    expect(result.allowed).toBe(false);
  });

  it("should gracefully degrade when Redis throws", async () => {
    vi.resetModules();
    const failingRedis = {
      zRemRangeByScore: vi.fn(() => {
        throw new Error("Redis connection failed");
      }),
    };
    vi.doMock("@/lib/redisClient", () => ({ default: failingRedis }));

    const { createRateLimiter } = await import("@/lib/rateLimiter");
    const checkLimit = createRateLimiter({
      maxRequests: 1,
      windowMs: 60_000,
      keyPrefix: "test",
    });

    const req = createMockRequest();
    const result = await checkLimit(req);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(1);
  });
});