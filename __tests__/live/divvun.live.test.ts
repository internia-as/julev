import { describe, it, expect, vi, beforeAll } from "vitest";
import { probe } from "./helpers";

// Targets the fetchSatni lib directly (pure fetch, no DB/Redis) rather than the
// divvun route, which additionally requires Redis + the database.
const URL = process.env.DIVVUN_API_URL as string;

const payload = {
  operationName: "AllLemmas",
  variables: {
    inputValue: "bur",
    searchMode: "start",
    srcLangs: ["sma"],
    targetLangs: ["sma"],
    wantedDicts: [],
  },
  query: `query AllLemmas($inputValue: String!, $searchMode: String!, $srcLangs: [String]!, $targetLangs: [String]!, $wantedDicts: [String]!, $after: String) {
      stemList(first: 100, search: $inputValue, mode: $searchMode, srcLangs: $srcLangs, targetLangs: $targetLangs, wantedDicts: $wantedDicts, after: $after) {
        totalCount
        edges { node { stem } }
      }
    }`,
};

// The endpoint path has changed in production and currently returns 404, so
// this suite is skipped until it is reachable again.
const reachable = await probe(URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

describe.runIf(reachable)("Divvun / Satni GraphQL (live)", () => {
  let fetchSatni: (p: unknown) => Promise<any>;

  beforeAll(async () => {
    vi.resetModules();
    ({ default: fetchSatni } = await import("@/lib/divvun/fetchSatni"));
  });

  it("returns stemList data from the real API", async () => {
    const result = await fetchSatni(payload);
    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("stemList");
    expect(result.data.stemList).toHaveProperty("totalCount");
  });
});