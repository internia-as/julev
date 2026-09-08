import { describe, it, expect, vi, beforeEach } from "vitest";

describe("fetchLocalTranslations (cache)", () => {
  // We test the cache behavior by mocking at the Prisma level
  // The cache.ts module uses a module-level variable for caching

  it("should export a default async function", async () => {
    vi.resetModules();

    vi.mock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue([]),
        },
      },
    }));

    const { default: fetchLocalTranslations } = await import("@/lib/cache");
    expect(typeof fetchLocalTranslations).toBe("function");
  });

  it("should call prisma.smj_translations.findMany with correct select fields", async () => {
    vi.resetModules();

    const mockFindMany = vi.fn().mockResolvedValue([
      {
        id: 1n,
        fra: "hello",
        til: "bures",
        oversatt_fra: "eng",
        oversatt_til: "sme",
        kredittering: "Test",
        sikor_hits: 5,
      },
    ]);

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: mockFindMany,
        },
      },
    }));

    const { default: fetchLocalTranslations } = await import("@/lib/cache");
    const result = await fetchLocalTranslations();

    expect(mockFindMany).toHaveBeenCalledWith({
      select: {
        id: true,
        fra: true,
        til: true,
        oversatt_fra: true,
        oversatt_til: true,
        kredittering: true,
        sikor_hits: true,
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0].fra).toBe("hello");
  });

  it("should return translated data from database", async () => {
    vi.resetModules();

    const mockTranslations = [
      {
        id: 1n,
        fra: "hello",
        til: "bures",
        oversatt_fra: "eng",
        oversatt_til: "sme",
        kredittering: "Test",
        sikor_hits: 5,
      },
      {
        id: 2n,
        fra: "goodbye",
        til: "lihku",
        oversatt_fra: "eng",
        oversatt_til: "sme",
        kredittering: null,
        sikor_hits: null,
      },
    ];

    vi.doMock("@/lib/prisma", () => ({
      prisma: {
        smj_translations: {
          findMany: vi.fn().mockResolvedValue(mockTranslations),
        },
      },
    }));

    const { default: fetchLocalTranslations } = await import("@/lib/cache");
    const result = await fetchLocalTranslations();

    expect(result).toHaveLength(2);
    expect(result[0].fra).toBe("hello");
    expect(result[1].fra).toBe("goodbye");
  });
});