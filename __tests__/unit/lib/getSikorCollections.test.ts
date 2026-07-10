import { describe, it, expect } from "vitest";
import getSikorCollections from "@/lib/getSikorCollections";

describe("getSikorCollections", () => {
  it("should return correct collections for South Sami (sma)", () => {
    const collections = getSikorCollections("sma");
    expect(collections).toHaveLength(7);
    expect(collections).toContain("SMA_ADMIN_20211118");
    expect(collections).toContain("SMA_BIBLE_20211118");
    expect(collections).toContain("SMA_NEWS_20211118");
  });

  it("should return correct collections for North Sami (sme)", () => {
    const collections = getSikorCollections("sme");
    expect(collections).toHaveLength(12);
    expect(collections).toContain("SME_ADMIN_20181106");
    expect(collections).toContain("SME_BIBLE_20181106");
    expect(collections).toContain("SME_BLOGS_20181106");
  });

  it("should return correct collections for Lule Sami (smj)", () => {
    const collections = getSikorCollections("smj");
    expect(collections).toHaveLength(7);
    expect(collections).toContain("SMJ_BIBLE_20211118");
    expect(collections).toContain("SMJ_NEWS_20211118");
  });

  it("should return correct collections for Skolt Sami (sms)", () => {
    const collections = getSikorCollections("sms");
    expect(collections).toHaveLength(7);
    expect(collections).toContain("SMS_ADMIN_20211118");
    expect(collections).toContain("SMS_NEWS_20211118");
  });

  it("should return correct collections for Inari Sami (smn)", () => {
    const collections = getSikorCollections("smn");
    expect(collections).toHaveLength(8);
    expect(collections).toContain("SMN_ADMIN_20211118");
    expect(collections).toContain("SMN_WIKIPEDIA_20211118");
  });

  it("should return empty array for unknown language", () => {
    expect(getSikorCollections("unknown")).toEqual([]);
    expect(getSikorCollections("")).toEqual([]);
  });
});