import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createMockRequest, createMockResponse } from "../../helpers";

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

describe("withRateLimit HOC", () => {
  beforeEach(() => {
    vi.resetModules();
    mockStore.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should pass through request when under limit", async () => {
    const { withRateLimit, clearLimiterCache } = await import("@/lib/withRateLimit");
    clearLimiterCache();

    const mockHandler = vi.fn(async (_req, res) => {
      res.status(200).json({ success: true });
    });

    const handler = withRateLimit(mockHandler, "translate");
    const req = createMockRequest();
    const res = createMockResponse();

    await handler(req, res);

    expect(mockHandler).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it("should return 429 when rate limit exceeded", async () => {
    const { withRateLimit, clearLimiterCache } = await import("@/lib/withRateLimit");
    clearLimiterCache();

    const mockHandler = vi.fn(async (_req, res) => {
      res.status(200).json({ success: true });
    });

    const handler = withRateLimit(mockHandler, "translate");
    const req = createMockRequest();

    for (let i = 0; i < 30; i++) {
      await handler(req, createMockResponse());
    }

    const res = createMockResponse();
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Too Many Requests",
      })
    );
  });

  it("should set rate limit headers on successful response", async () => {
    const { withRateLimit, clearLimiterCache } = await import("@/lib/withRateLimit");
    clearLimiterCache();

    const mockHandler = vi.fn(async (_req, res) => {
      res.status(200).json({ success: true });
    });

    const handler = withRateLimit(mockHandler, "translate");
    const req = createMockRequest();
    const res = createMockResponse();

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Limit", expect.any(String));
    expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Remaining", expect.any(String));
    expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Reset", expect.any(String));
  });

  it("should set Retry-After header on 429 response", async () => {
    const { withRateLimit, clearLimiterCache } = await import("@/lib/withRateLimit");
    clearLimiterCache();

    const mockHandler = vi.fn(async (_req, res) => {
      res.status(200).json({ success: true });
    });

    const handler = withRateLimit(mockHandler, "translate");
    const req = createMockRequest();

    for (let i = 0; i < 30; i++) {
      await handler(req, createMockResponse());
    }

    const res = createMockResponse();
    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith("Retry-After", expect.any(String));
  });

  it("should track different routes independently", async () => {
    const { withRateLimit, clearLimiterCache } = await import("@/lib/withRateLimit");
    clearLimiterCache();

    const translateHandler = vi.fn(async (_req, res) => {
      res.status(200).json({ success: true });
    });
    const grammarHandler = vi.fn(async (_req, res) => {
      res.status(200).json({ success: true });
    });

    const translate = withRateLimit(translateHandler, "translate");
    const grammar = withRateLimit(grammarHandler, "grammar");

    const req = createMockRequest();

    for (let i = 0; i < 30; i++) {
      await translate(req, createMockResponse());
    }

    const res = createMockResponse();
    await grammar(req, res);

    expect(grammarHandler).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});