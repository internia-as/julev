// __tests__/live/helpers.ts
// Helpers for live (real network) integration tests.

import { vi } from "vitest";

export { createMockRequest, createMockResponse } from "../helpers";

/**
 * Perform a real, lightweight network probe to decide whether an external API
 * is currently reachable. Returns true only when the server responds with a
 * 2xx status; returns false on any network error or non-2xx response.
 *
 * Used with `describe.runIf(await probe(...))` so the whole suite is skipped
 * (not failed) when the endpoint is down or the network is unavailable.
 */
export async function probe(
  url: string,
  init?: RequestInit,
  timeoutMs: number = 8000
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Temporarily wrap the real global fetch with a recording spy that still
 * forwards to the real fetch. Lets a live test assert on the URL/args the
 * handler issued while still exercising the real network call.
 * Restored by `vi.unstubAllGlobals()` in the live setup's afterEach.
 */
export function withFetchSpy() {
  const realFetch = globalThis.fetch.bind(globalThis);
  const spy = vi.fn(realFetch);
  vi.stubGlobal("fetch", spy);
  return spy;
}