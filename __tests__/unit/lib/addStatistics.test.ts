import { describe, it, expect, vi, beforeEach } from "vitest";
import { vi as vitest } from "vitest";

// Create proper mock structure
const mockPrismaInstance = {
  smj_translations: {
    findMany: vitest.fn().mockResolvedValue([]),
  },
  statistics: {
    findMany: vitest.fn().mockResolvedValue([]),
    findUnique: vitest.fn().mockResolvedValue(null),
    findFirst: vitest.fn().mockResolvedValue(null),
    count: vitest.fn().mockResolvedValue(0),
    create: vitest.fn().mockResolvedValue({}),
    createMany: vitest.fn().mockResolvedValue({ count: 0 }),
    update: vitest.fn().mockResolvedValue({}),
    delete: vitest.fn().mockResolvedValue({}),
    deleteMany: vitest.fn().mockResolvedValue({ count: 0 }),
    groupBy: vitest.fn().mockResolvedValue([]),
    aggregate: vitest.fn().mockResolvedValue({}),
  },
  $connect: vitest.fn().mockResolvedValue(undefined),
  $disconnect: vitest.fn().mockResolvedValue(undefined),
  $use: vitest.fn(),
};

vitest.mock("@/lib/prisma", () => ({
  prisma: mockPrismaInstance,
}));

describe("addStatistics", () => {
  beforeEach(() => {
    vitest.resetModules();
    mockPrismaInstance.statistics.create.mockClear();
  });

  it("should create a new statistics entry", async () => {
    mockPrismaInstance.statistics.create.mockResolvedValue({
      id: 1n,
      type: "Translation",
      query: "test query",
      createdAt: new Date(),
    });

    const { default: addStatistics } = await import("@/lib/addStatistics");
    await addStatistics("Translation", "test query");

    expect(mockPrismaInstance.statistics.create).toHaveBeenCalledWith({
      data: {
        type: "Translation",
        query: "test query",
      },
    });
  });

  it("should handle different event types", async () => {
    mockPrismaInstance.statistics.create.mockResolvedValue({});

    const { default: addStatistics } = await import("@/lib/addStatistics");

    await addStatistics("GrammarCheck", "grammar test");
    expect(mockPrismaInstance.statistics.create).toHaveBeenCalledWith({
      data: {
        type: "GrammarCheck",
        query: "grammar test",
      },
    });
  });

  it("should handle empty query string", async () => {
    mockPrismaInstance.statistics.create.mockResolvedValue({});

    const { default: addStatistics } = await import("@/lib/addStatistics");
    await addStatistics("Translation", "");

    expect(mockPrismaInstance.statistics.create).toHaveBeenCalledWith({
      data: {
        type: "Translation",
        query: "",
      },
    });
  });

  it("should propagate database errors", async () => {
    vitest.resetModules();
    mockPrismaInstance.statistics.create.mockRejectedValue(
      new Error("Database connection error")
    );

    const { default: addStatistics } = await import("@/lib/addStatistics");
    await expect(addStatistics("Translation", "test")).rejects.toThrow(
      "Database connection error"
    );
  });
});