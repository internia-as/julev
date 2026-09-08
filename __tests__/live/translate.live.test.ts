import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  probe,
  withFetchSpy,
  createMockRequest,
  createMockResponse,
} from "./helpers";

// Keep the live route test off the database.
vi.mock("@/lib/addStatistics", () => ({ default: vi.fn() }));

const URL = process.env.TRANSLATE_URL as string;

// Probe with a known-good pair (sme|nob) so the suite skips if the API is down.
const reachable = await probe(
  `${URL}?langpair=sme|nob&q=hello&markUnknown=yes&callBack=text`
);

describe.runIf(reachable)("Translate API (live)", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  let fetchSpy: ReturnType<typeof withFetchSpy>;

  beforeEach(async () => {
    vi.resetModules();
    const module = await import("@/pages/api/translate");
    handler = module.default;
    fetchSpy = withFetchSpy();
  });

  it("proxies a real translation request and returns translatedText", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { langpair: "sme|nob", q: "Hello", markUnknown: "yes", callBack: "text" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(vi.mocked(res.status)).toHaveBeenCalledWith(200);

    const payload = vi.mocked(res.json).mock.calls[0][0];
    expect(payload).toHaveProperty("responseData");
    expect(payload.responseData).toHaveProperty("translatedText");
    expect(typeof payload.responseData.translatedText).toBe("string");
  });

  it("builds the upstream URL from the request body", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { langpair: "sme|nob", q: "Buoris", markUnknown: "yes", callBack: "text" },
    });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = fetchSpy.mock.calls[0][0] as string;
    expect(callUrl).toBe(`${URL}?langpair=sme|nob&q=Buoris&markUnknown=yes&callBack=text`);
  });
});