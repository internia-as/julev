import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  probe,
  withFetchSpy,
  createMockRequest,
  createMockResponse,
} from "./helpers";

const URL = process.env.TEXT_TO_SPEECH_URL as string;
const TEXT = "Buerie.";

// The handler maps lang "smj" -> voice "abmut", so probe that exact path.
const reachable = await probe(`${URL}/smj/abmut`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: TEXT }),
});

describe.runIf(reachable)("Speech / TTS API (live)", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  let fetchSpy: ReturnType<typeof withFetchSpy>;

  beforeEach(async () => {
    vi.resetModules();
    const module = await import("@/pages/api/speech");
    handler = module.default;
    fetchSpy = withFetchSpy();
  });

  it("returns a real audio buffer", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { text: TEXT, lang: "smj", voice: "abmut" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(`${URL}/smj/abmut`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: TEXT }),
    });
    expect(vi.mocked(res.setHeader)).toHaveBeenCalledWith("Content-Type", "audio/wav");
    expect(vi.mocked(res.status)).toHaveBeenCalledWith(200);

    const sent = vi.mocked(res.send).mock.calls[0][0];
    expect(Buffer.isBuffer(sent)).toBe(true);
    expect(sent.length).toBeGreaterThan(0);
  });
});