import { describe, it, expect, vi, beforeEach } from "vitest";

describe("fetchSatni", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should fetch from DIVVUN_API_URL with POST method", async () => {
    process.env.DIVVUN_API_URL = "https://satni.example.com/graphql";

    const mockResponse = {
      data: {
        stemList: {
          totalCount: 5,
          edges: [
            { node: { stem: "bures" } },
            { node: { stem: "buoret" } },
          ],
        },
      },
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const { default: fetchSatni } = await import("@/lib/divvun/fetchSatni");

    const payload = {
      operationName: "AllLemmas",
      variables: { inputValue: "bur" },
      query: "query AllLemmas { ... }",
    };

    const result = await fetchSatni(payload);

    expect(fetch).toHaveBeenCalledWith("https://satni.example.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    expect(result).toEqual(mockResponse);
  });

  it("should return JSON response", async () => {
    process.env.DIVVUN_API_URL = "https://satni.example.com/graphql";

    const mockResponse = {
      data: {
        generated: [
          {
            paradigmTemplate: "+V+Ind+Prs+Sg1",
            analyses: [{ wordform: "mun", weight: 1.0 }],
          },
        ],
      },
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const { default: fetchSatni } = await import("@/lib/divvun/fetchSatni");

    const result = await fetchSatni({ operationName: "Generated" });

    expect(result).toEqual(mockResponse);
  });
});