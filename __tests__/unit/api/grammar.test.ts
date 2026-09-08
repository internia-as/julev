import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { mockFetchResponse, createMockRequest, createMockResponse } from "../../helpers";

vi.mock("@/lib/addStatistics", () => ({
  default: vi.fn(),
}));

describe("Grammar API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    process.env.GRAMMAR_CHECKER_URL = "https://grammar-api.example.com";
    const module = await import("@/pages/api/grammar");
    handler = module.default;
  });

  it("should proxy grammar check request and return response", async () => {
    const mockGrammarData = {
      matches: [],
    };

    mockFetchResponse({
      ok: true,
      status: 200,
      body: mockGrammarData,
    });

    const req = createMockRequest({
      body: {
        lang: "sme",
        text: "Buorre beaivi dutnje",
        encoding: "utf-8",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetch).toHaveBeenCalledWith(
      "https://grammar-api.example.com/sme?encoding=utf-8",
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGrammarData);
  });

  it("should send POST request with correct headers and body", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      body: { matches: [] },
    });

    const req = createMockRequest({
      body: {
        lang: "smj",
        text: "Test text",
        encoding: "utf-8",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetch).toHaveBeenCalledWith(
      "https://grammar-api.example.com/smj?encoding=utf-8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "Test text" }),
      }
    );
  });

  it("should handle non-200 response from grammar API", async () => {
    mockFetchResponse({
      ok: false,
      status: 400,
      body: { error: "Bad request" },
    });

    const req = createMockRequest({
      body: {
        lang: "invalid",
        text: "test",
        encoding: "utf-8",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch grammar check",
      status: 400,
    });
  });

  it("should handle fetch errors with 500 response", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Network error")
    );

    const req = createMockRequest({
      body: {
        lang: "sme",
        text: "test",
        encoding: "utf-8",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should call addStatistics on successful grammar check", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      body: { matches: [] },
    });

    const req = createMockRequest({
      body: {
        lang: "sme",
        text: "Buorre beaivi",
        encoding: "utf-8",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const { default: addStatistics } = await import("@/lib/addStatistics");
    expect(addStatistics).toHaveBeenCalledWith("GrammarCheck", "Buorre beaivi");
  });
});