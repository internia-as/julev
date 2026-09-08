import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { mockFetchResponse, createMockRequest, createMockResponse } from "../../helpers";

// Mock addStatistics to avoid DB calls in API route tests
vi.mock("@/lib/addStatistics", () => ({
  default: vi.fn(),
}));

describe("Translate API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    // Set env var before importing the handler
    process.env.TRANSLATE_URL = "https://translate-api.example.com/translate";
    const module = await import("@/pages/api/translate");
    handler = module.default;
  });

  it("should proxy translation request and return response", async () => {
    const mockTranslationData = {
      translatedText: "Buoret",
      backend: "apertium-sme-nob",
    };

    mockFetchResponse({
      ok: true,
      status: 200,
      body: mockTranslationData,
    });

    const req = createMockRequest({
      body: {
        langpair: "nob-sme",
        q: "Hello",
        markUnknown: "false",
        callBack: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetch).toHaveBeenCalledWith(
      "https://translate-api.example.com/translate?langpair=nob-sme&q=Hello&markUnknown=false&callBack="
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTranslationData);
  });

  it("should handle non-200 response from translation API", async () => {
    mockFetchResponse({
      ok: false,
      status: 503,
      body: { error: "Service unavailable" },
    });

    const req = createMockRequest({
      body: {
        langpair: "sme-nob",
        q: "Buoret",
        markUnknown: "false",
        callBack: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch translation",
      status: 503,
    });
  });

  it("should handle 400 response from translation API", async () => {
    mockFetchResponse({
      ok: false,
      status: 400,
      body: { error: "Bad request" },
    });

    const req = createMockRequest({
      body: {
        langpair: "invalid",
        q: "",
        markUnknown: "false",
        callBack: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch translation",
      status: 400,
    });
  });

  it("should encode query parameters in URL", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      body: { translatedText: "test" },
    });

    const req = createMockRequest({
      body: {
        langpair: "sme-nob",
        q: "Hei og hald på",
        markUnknown: "true",
        callBack: "myCallback",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetch).toHaveBeenCalled();
    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("q=Hei og hald på");
  });

  it("should call addStatistics on successful translation", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      body: { translatedText: "Buoret" },
    });

    const req = createMockRequest({
      body: {
        langpair: "nob-sme",
        q: "Hello",
        markUnknown: "false",
        callBack: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const { default: addStatistics } = await import("@/lib/addStatistics");
    expect(addStatistics).toHaveBeenCalledWith("Translation", "Hello");
  });
});