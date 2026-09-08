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

const URL = process.env.GRAMMAR_CHECKER_URL as string;
const LANG = "smj";
const TEXT = "Buerie le aajhmesje.";

const probeBody = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: TEXT }) };
const reachable = await probe(`${URL}/${LANG}?encoding=utf-16`, probeBody);

describe.runIf(reachable)("Grammar API (live)", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  let fetchSpy: ReturnType<typeof withFetchSpy>;

  beforeEach(async () => {
    vi.resetModules();
    const module = await import("@/pages/api/grammar");
    handler = module.default;
    fetchSpy = withFetchSpy();
  });

  it("returns a real grammar check with an errs array", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { lang: LANG, text: TEXT, encoding: "utf-16" },
    });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(vi.mocked(res.status)).toHaveBeenCalledWith(200);

    const payload = vi.mocked(res.json).mock.calls[0][0];
    expect(payload).toHaveProperty("text");
    expect(Array.isArray(payload.errs)).toBe(true);
  });

  it("posts to the correct upstream path for the language", async () => {
    const req = createMockRequest({
      method: "POST",
      body: { lang: LANG, text: TEXT, encoding: "utf-16" },
    });
    const res = createMockResponse();

    await handler(req, res);

    const [callUrl, callInit] = fetchSpy.mock.calls[0];
    expect(callUrl).toBe(`${URL}/${LANG}?encoding=utf-16`);
    expect((callInit as RequestInit).method).toBe("POST");
    expect((callInit as RequestInit).body).toBe(JSON.stringify({ text: TEXT }));
  });
});