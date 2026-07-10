import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";
import { mockFetchResponse, createMockRequest, createMockResponse } from "../../helpers";

describe("Speech API Route", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    process.env.TEXT_TO_SPEECH_URL = "https://tts-api.example.com";
    const module = await import("@/pages/api/speech/index");
    handler = module.default;
  });

  it("should convert sme language code to 'se' and use 'biret' voice", async () => {
    const mockAudioBuffer = new ArrayBuffer(100);

    mockFetchResponse({
      ok: true,
      status: 200,
      arrayBuffer: mockAudioBuffer,
    });

    const req = createMockRequest({
      body: {
        text: "Buorre beaivi",
        lang: "sme",
        voice: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("/se/biret");
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "audio/wav");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should use 'aanna' voice for South Sami", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      arrayBuffer: new ArrayBuffer(100),
    });

    const req = createMockRequest({
      body: {
        text: "Goeie biejjie",
        lang: "sma",
        voice: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("/sma/aanna");
  });

  it("should use 'aanna' voice for sma_North dialect", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      arrayBuffer: new ArrayBuffer(100),
    });

    const req = createMockRequest({
      body: {
        text: "test",
        lang: "sma_North",
        voice: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("/sma/aanna");
  });

  it("should use 'aanna' voice for sma_Mid dialect", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      arrayBuffer: new ArrayBuffer(100),
    });

    const req = createMockRequest({
      body: {
        text: "test",
        lang: "sma_Mid",
        voice: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("/sma/aanna");
  });

  it("should use 'abmut' voice for Lule Sami", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      arrayBuffer: new ArrayBuffer(100),
    });

    const req = createMockRequest({
      body: {
        text: "Buerie bijie",
        lang: "smj",
        voice: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("/smj/abmut");
  });

  it("should keep original lang and voice for unhandled language", async () => {
    mockFetchResponse({
      ok: true,
      status: 200,
      arrayBuffer: new ArrayBuffer(100),
    });

    const req = createMockRequest({
      body: {
        text: "test",
        lang: "unknown",
        voice: "custom",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callUrl).toContain("/unknown/custom");
  });

  it("should handle non-200 response from TTS API", async () => {
    mockFetchResponse({
      ok: false,
      status: 500,
      text: "Internal server error",
    });

    const req = createMockRequest({
      body: {
        text: "test",
        lang: "sme",
        voice: "",
      },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch audio from external API",
      details: "Internal server error",
    });
  });
});