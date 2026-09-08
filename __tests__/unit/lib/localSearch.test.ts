import { describe, it, expect, vi, beforeEach } from "vitest";

describe("getLocalResults", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should return empty results for empty query", async () => {
    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue([
            { id: 1n, fra: "test", til: "test2", oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
          ]),
        },
      },
    }));

    // Need to reset cache module too
    const { default: fetchLocalTranslations } = await import("@/lib/cache");
    const { getLocalResults } = await import("@/lib/localSearch");

    const result = await getLocalResults("", "relevance");

    expect(result).toEqual({
      results: [],
      totalCount: 0,
      hasMore: false,
    });
  });

  it("should return empty results for whitespace-only query", async () => {
    vi.resetModules();

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue([
            { id: 1n, fra: "test", til: "test2", oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
          ]),
        },
      },
    }));

    const { getLocalResults } = await import("@/lib/localSearch");

    const result = await getLocalResults("   ", "relevance");

    expect(result).toEqual({
      results: [],
      totalCount: 0,
      hasMore: false,
    });
  });

  it("should filter results by query matching 'fra' field", async () => {
    vi.resetModules();

    const mockTranslations = [
      { id: 1n, fra: "hello world", til: null, oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
      { id: 2n, fra: "goodbye world", til: null, oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
      { id: 3n, fra: "completely different", til: null, oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
    ];

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue(mockTranslations),
        },
      },
    }));

    const { getLocalResults } = await import("@/lib/localSearch");

    const result = await getLocalResults("world", "relevance");

    expect(result.results).toHaveLength(2);
    expect(result.totalCount).toBe(2);
  });

  it("should filter results by query matching 'til' field", async () => {
    vi.resetModules();

    const mockTranslations = [
      { id: 1n, fra: null, til: "bures boahtin", oversatt_fra: "sme", oversatt_til: "nob", kredittering: null, sikor_hits: null },
      { id: 2n, fra: null, til: "lihkosis máhcahan", oversatt_fra: "sme", oversatt_til: "nob", kredittering: null, sikor_hits: null },
    ];

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue(mockTranslations),
        },
      },
    }));

    const { getLocalResults } = await import("@/lib/localSearch");

    const result = await getLocalResults("boahtin", "relevance");

    expect(result.results).toHaveLength(1);
    expect(result.results[0].til).toBe("bures boahtin");
  });

  it("should prioritize exact matches over partial matches", async () => {
    vi.resetModules();

    const mockTranslations = [
      { id: 1n, fra: "hello world", til: null, oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
      { id: 2n, fra: "hello", til: null, oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
      { id: 3n, fra: "say hello to everyone", til: null, oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
    ];

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue(mockTranslations),
        },
      },
    }));

    const { getLocalResults } = await import("@/lib/localSearch");

    const result = await getLocalResults("hello", "relevance");

    expect(result.results).toHaveLength(3);
    // Exact match should be first
    expect(result.results[0].fra).toBe("hello");
  });

  it("should paginate results correctly", async () => {
    vi.resetModules();

    const mockTranslations = Array.from({ length: 50 }, (_, i) => ({
      id: BigInt(i + 1),
      fra: `item ${i + 1}`,
      til: null,
      oversatt_fra: "nob",
      oversatt_til: "smj",
      kredittering: null,
      sikor_hits: null,
    }));

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue(mockTranslations),
        },
      },
    }));

    const { getLocalResults } = await import("@/lib/localSearch");

    const result = await getLocalResults("item", "relevance", 1, 20);

    expect(result.results).toHaveLength(20);
    expect(result.totalCount).toBe(50);
    expect(result.hasMore).toBe(true);
  });

  it("should be case insensitive", async () => {
    vi.resetModules();

    const mockTranslations = [
      { id: 1n, fra: "Hello World", til: null, oversatt_fra: "nob", oversatt_til: "smj", kredittering: null, sikor_hits: null },
    ];

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue(mockTranslations),
        },
      },
    }));

    const { getLocalResults } = await import("@/lib/localSearch");

    const result = await getLocalResults("hello world", "relevance");

    expect(result.results).toHaveLength(1);
  });
});