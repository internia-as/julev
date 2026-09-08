import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  probe,
  withFetchSpy,
  createMockRequest,
  createMockResponse,
} from "./helpers";

const URL = process.env.NEXT_PUBLIC_SIKOR_URL as string;
const LANGUAGE = "smj";
const LEMA = "boahte";

// Probe with a single known corpus + lemma that returns 200.
const cqp = `[lemma%20=%20"${LEMA}"]`;
const reachable = await probe(
  `${URL}backend-${LANGUAGE}/query?corpus=SMJ_NEWS_20211118&cqp=${cqp}&start=0&end=0`
);

describe.runIf(reachable)("SIKOR API (live)", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  let fetchSpy: ReturnType<typeof withFetchSpy>;

  beforeEach(async () => {
    vi.resetModules();
    const module = await import("@/pages/api/sikor");
    handler = module.default;
    fetchSpy = withFetchSpy();
  });

  it("returns concordance data for a real lemma", async () => {
    const req = createMockRequest({ query: { language: LANGUAGE, lemma: LEMA } });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(vi.mocked(res.status)).toHaveBeenCalledWith(200);

    const payload = vi.mocked(res.json).mock.calls[0][0];
    expect(payload).toHaveProperty("kwic");
    expect(Array.isArray(payload.kwic)).toBe(true);
    expect(payload).toHaveProperty("corpus_hits");
  });

  it("builds the upstream SIKOR query URL", async () => {
    const req = createMockRequest({ query: { language: LANGUAGE, lemma: LEMA } });
    const res = createMockResponse();

    await handler(req, res);

    const callUrl = fetchSpy.mock.calls[0][0] as string;
    expect(callUrl).toContain(`backend-${LANGUAGE}/query`);
    expect(callUrl).toContain(`cqp=[lemma%20=%20"${LEMA}"]`);
  });
});