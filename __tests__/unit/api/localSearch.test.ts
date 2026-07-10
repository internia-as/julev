import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { createMockRequest, createMockResponse, createMockTranslations } from "../../helpers";

// Create shared mock
const mockPrismaInstance = {
  smj_translations: {
    findMany: vi.fn().mockResolvedValue([]),
  },
  statistics: {
    create: vi.fn().mockResolvedValue({}),
  },
};

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrismaInstance,
}));

vi.mock("@/lib/addStatistics", () => ({
  default: vi.fn(),
}));

describe("LocalSearch API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(() => {
    mockPrismaInstance.smj_translations.findMany.mockClear();
  });

  async function getHandler() {
    vi.resetModules();
    const module = await import("@/pages/api/localSearch");
    return module.default;
  }

  it("should return 400 when query parameter is missing", async () => {
    handler = await getHandler();
    const req = createMockRequest({ query: {} });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing query parameter" });
  });

  it("should return 400 for invalid page parameter", async () => {
    handler = await getHandler();
    const req = createMockRequest({
      query: { q: "test", direction: "relevance", page: "invalid", limit: "10" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid page parameter" });
  });

  it("should return 400 for page less than 1", async () => {
    handler = await getHandler();
    const req = createMockRequest({
      query: { q: "test", direction: "relevance", page: "0", limit: "10" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid page parameter" });
  });

  it("should return 400 for invalid limit (0)", async () => {
    handler = await getHandler();
    const req = createMockRequest({
      query: { q: "test", direction: "relevance", page: "1", limit: "0" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid limit parameter (1-100)" });
  });

  it("should return 400 for limit greater than 100", async () => {
    handler = await getHandler();
    const req = createMockRequest({
      query: { q: "test", direction: "relevance", page: "1", limit: "101" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid limit parameter (1-100)" });
  });

  it("should use default page=1 and limit=30 when not provided", async () => {
    handler = await getHandler();
    mockPrismaInstance.smj_translations.findMany.mockResolvedValue([]);

    const req = createMockRequest({
      query: { q: "test", direction: "relevance" },
    });
    const res = createMockResponse();

    await handler(req, res);

    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.pagination.page).toBe(1);
    expect(jsonCall.pagination.limit).toBe(30);
  });
});