import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { createMockRequest, createMockResponse } from "../../helpers";

// Create proper mock
const mockPrismaInstance = {
  statistics: {
    findMany: vi.fn().mockResolvedValue([]),
    findUnique: vi.fn().mockResolvedValue(null),
    count: vi.fn().mockResolvedValue(0),
    create: vi.fn().mockResolvedValue({}),
    groupBy: vi.fn().mockResolvedValue([]),
    aggregate: vi.fn().mockResolvedValue({}),
  },
};

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrismaInstance,
}));

describe("Statistics API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    mockPrismaInstance.statistics.groupBy.mockClear();
    mockPrismaInstance.statistics.count.mockClear();
    mockPrismaInstance.statistics.findMany.mockClear();

    const module = await import("@/pages/api/statistics");
    handler = module.default;
  });

  it("should return 405 for non-GET methods", async () => {
    const req = createMockRequest({
      method: "POST",
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: "Method not allowed" });
  });

  it("should return statistics grouped by type on GET", async () => {
    const mockTotalsByType = [
      { type: "Translation", _count: { id: 100 } },
      { type: "GrammarCheck", _count: { id: 50 } },
    ];

    mockPrismaInstance.statistics.groupBy
      .mockResolvedValueOnce(mockTotalsByType)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    mockPrismaInstance.statistics.count.mockResolvedValue(150);
    mockPrismaInstance.statistics.findMany.mockResolvedValue([]);

    const req = createMockRequest({
      method: "GET",
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall).toHaveProperty("totalsByType");
    expect(jsonCall).toHaveProperty("totalCount");
    expect(jsonCall).toHaveProperty("recentSearches");
    expect(jsonCall).toHaveProperty("popularQueries");
  });

  it("should return empty data when no statistics exist", async () => {
    mockPrismaInstance.statistics.groupBy.mockResolvedValue([]);
    mockPrismaInstance.statistics.count.mockResolvedValue(0);
    mockPrismaInstance.statistics.findMany.mockResolvedValue([]);

    const req = createMockRequest({
      method: "GET",
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.totalsByType).toEqual([]);
    expect(jsonCall.totalCount).toBe(0);
  });

  it("should handle database errors gracefully", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockPrismaInstance.statistics.groupBy.mockRejectedValue(
      new Error("Database connection failed")
    );

    const req = createMockRequest({
      method: "GET",
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should query with date filter for last 30 days", async () => {
    mockPrismaInstance.statistics.groupBy.mockResolvedValue([]);
    mockPrismaInstance.statistics.count.mockResolvedValue(0);
    mockPrismaInstance.statistics.findMany.mockResolvedValue([]);

    const req = createMockRequest({
      method: "GET",
    });
    const res = createMockResponse();

    await handler(req, res);

    // The second call to groupBy should include a date filter
    const groupByCalls = mockPrismaInstance.statistics.groupBy.mock.calls;
    expect(groupByCalls.length).toBeGreaterThanOrEqual(2);
    expect(groupByCalls[1][0]).toHaveProperty("where");
    expect(groupByCalls[1][0].where).toHaveProperty("createdAt");
  });

  it("should return only last 10 recent searches", async () => {
    mockPrismaInstance.statistics.groupBy.mockResolvedValue([]);
    mockPrismaInstance.statistics.count.mockResolvedValue(0);
    mockPrismaInstance.statistics.findMany.mockResolvedValue([]);

    const req = createMockRequest({
      method: "GET",
    });
    const res = createMockResponse();

    await handler(req, res);

    const findManyCall = mockPrismaInstance.statistics.findMany.mock.calls[0][0];
    expect(findManyCall.take).toBe(10);
    expect(findManyCall.orderBy).toEqual({ createdAt: "desc" });
  });
});