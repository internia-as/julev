// __tests__/live/setup.ts
// Live-test setup: point the external-API env vars at real production URLs.
// Deliberately does NOT mock global.fetch — these tests make real network calls.
// Values mirror .env.example so no local .env file is required.

import { afterEach, vi } from "vitest";

// Restore the real global fetch after any test that swapped in a spy.
afterEach(() => {
  vi.unstubAllGlobals();
});

process.env.TRANSLATE_URL =
  process.env.TRANSLATE_URL ||
  "https://gtweb-02.uit.no/apertium-api/translate";
process.env.GRAMMAR_CHECKER_URL =
  process.env.GRAMMAR_CHECKER_URL || "https://api-giellalt.uit.no/grammar";
process.env.TEXT_TO_SPEECH_URL =
  process.env.TEXT_TO_SPEECH_URL || "https://api-giellalt.uit.no/tts";
process.env.NEXT_PUBLIC_SIKOR_URL =
  process.env.NEXT_PUBLIC_SIKOR_URL || "https://gtweb.uit.no/korp/";
process.env.KARTVERKET_URL =
  process.env.KARTVERKET_URL || "https://ws.geonorge.no/stedsnavn/v1/sted";
process.env.DIVVUN_API_URL =
  process.env.DIVVUN_API_URL || "https://satni.uit.no/newsatni/graphql";