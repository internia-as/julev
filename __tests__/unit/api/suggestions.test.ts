import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { createMockRequest, createMockResponse } from "../../helpers";

const mockPrismaInstance = {
  suggestions: {
    create: vi.fn().mockResolvedValue({}),
  },
};

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrismaInstance,
}));

describe("Suggestions API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    mockPrismaInstance.suggestions.create.mockClear();
    const module = await import("@/pages/api/suggestions");
    handler = module.default;
  });

  it("should return 405 for non-POST methods", async () => {
    const res = createMockResponse();
    await handler(createMockRequest({ method: "GET" }), res);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it("should save a valid suggestion", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { word: " hund ", translation: "bena", direction: "nob" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockPrismaInstance.suggestions.create).toHaveBeenCalledWith({
      data: { word: "hund", translation: "bena", direction: "nob", comment: null },
    });
  });

  it("should reject missing translation", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { word: "hund", translation: " ", direction: "nob" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockPrismaInstance.suggestions.create).not.toHaveBeenCalled();
  });

  it("should reject unknown direction", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { word: "hund", translation: "bena", direction: "xx" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should silently drop submissions that fill the hidden field", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { word: "hund", translation: "bena", direction: "nob", website: "spam" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockPrismaInstance.suggestions.create).not.toHaveBeenCalled();
  });

  it("should return 500 when the database fails", async () => {
    mockPrismaInstance.suggestions.create.mockRejectedValueOnce(new Error("db"));
    const req = createMockRequest({
      method: "POST",
      body: { word: "hund", translation: "bena", direction: "nob" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
