import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { mockFetchResponse, createMockRequest, createMockResponse } from "../../helpers";

describe("Sikor API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_SIKOR_URL = "https://sikor.example.com/";
    const module = await import("@/pages/api/sikor");
    handler = module.default;
  });

  it("should fetch SIKOR data with correct URL parameters", async () => {
    const mockSikorData = {
      hits: 5,
      concordance: [],
    };

    mockFetchResponse({
      ok: true,
      status: 200,
      body: mockSikorData,
    });

    const req = createMockRequest({
      query: {
        language: "sme",
        lemma: "bures",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetch).toHaveBeenCalled();
    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("backend-sme/query");
    expect(callUrl).toContain('cqp=[lemma%20=%20"bures"]');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockSikorData);
  });

  it("should use correct corpus for different languages", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      body: { hits: 0 },
    });

    // Test with sma
    (global.fetch as ReturnType<typeof vi.fn>).mockClear();
    const req = createMockRequest({
      query: {
        language: "sma",
        lemma: "jiehke",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("corpus=SMA_");
  });

  it("should handle non-200 response from SIKOR", async () => {
    mockFetchResponse({
      ok: false,
      status: 500,
      body: { error: "Internal server error" },
    });

    const req = createMockRequest({
      query: {
        language: "sme",
        lemma: "bures",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch data from SIKOR",
      status: 500,
    });
  });
});