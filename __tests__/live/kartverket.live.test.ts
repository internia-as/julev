import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  probe,
  withFetchSpy,
  createMockRequest,
  createMockResponse,
} from "./helpers";

const URL = process.env.KARTVERKET_URL as string;
const Q = "Trondheim";

const probeUrl = `${URL}?sok=${encodeURIComponent(Q)}&fuzzy=false&treffPerSide=500&filter=stedsnavn`;
const reachable = await probe(probeUrl);

describe.runIf(reachable)("Kartverket API (live)", () => {
  let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  let fetchSpy: ReturnType<typeof withFetchSpy>;

  beforeEach(async () => {
    vi.resetModules();
    const module = await import("@/pages/api/kartverket");
    handler = module.default;
    fetchSpy = withFetchSpy();
  });

  it("returns place-name results for a real query", async () => {
    const req = createMockRequest({ query: { q: Q } });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(probeUrl);
    expect(vi.mocked(res.status)).toHaveBeenCalledWith(200);

    const payload = vi.mocked(res.json).mock.calls[0][0];
    expect(payload).toHaveProperty("navn");
    expect(Array.isArray(payload.navn)).toBe(true);
    expect(payload.navn.length).toBeGreaterThan(0);
  });

  it("returns 400 when the query parameter is missing", async () => {
    const req = createMockRequest({ query: {} });
    const res = createMockResponse();

    await handler(req, res);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(vi.mocked(res.status)).toHaveBeenCalledWith(400);
    expect(vi.mocked(res.json)).toHaveBeenCalledWith({
      error: "Missing query parameter",
    });
  });
});