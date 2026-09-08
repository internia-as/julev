import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { mockFetchResponse, createMockRequest, createMockResponse } from "../../helpers";

describe("Kartverket API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    process.env.KARTVERKET_URL = "https://kartverket.example.com/stedsnavn";
    const module = await import("@/pages/api/kartverket");
    handler = module.default;
  });

  it("should return 400 when query parameter is missing", async () => {
    const req = createMockRequest({
      query: {},
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing query parameter" });
  });

  it("should fetch place names from Kartverket", async () => {
    const mockPlaceData = {
      features: [
        {
          properties: {
            navn: "Kautokeino",
            stedsdelType: "stedsdel",
          },
        },
      ],
    };

    mockFetchResponse({
      ok: true,
      status: 200,
      body: mockPlaceData,
    });

    const req = createMockRequest({
      query: {
        q: "Kautokeino",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetch).toHaveBeenCalledWith(
      "https://kartverket.example.com/stedsnavn?sok=Kautokeino&fuzzy=false&treffPerSide=500&filter=stedsnavn"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPlaceData);
  });

  it("should encode query parameter", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      body: { features: [] },
    });

    const req = createMockRequest({
      query: {
        q: "Øvre Pasvik",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("sok=%C3%98vre%20Pasvik");
  });
});