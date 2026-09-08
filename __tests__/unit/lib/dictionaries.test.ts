import { describe, it, expect } from "vitest";
import dictionaries from "@/lib/dictionaries";
import { Dictionary } from "@/types/dictionary";

describe("dictionaries", () => {
  it("should export an array of dictionaries", () => {
    expect(Array.isArray(dictionaries)).toBe(true);
  });

  it("should have at least one dictionary", () => {
    expect(dictionaries.length).toBeGreaterThan(0);
  });

  it("should have all required fields on each dictionary", () => {
    dictionaries.forEach((dict) => {
      expect(dict).toHaveProperty("title");
      expect(dict).toHaveProperty("lang");
      expect(dict).toHaveProperty("value");
      expect(dict).toHaveProperty("short");
      expect(dict).toHaveProperty("selected");
      expect(dict).toHaveProperty("type");
    });
  });

  it("should have all dictionaries marked as selected by default", () => {
    dictionaries.forEach((dict) => {
      expect(dict.selected).toBe(true);
    });
  });

  it("should have all dictionaries marked as divvun type", () => {
    dictionaries.forEach((dict) => {
      expect(dict.type).toBe("divvun");
    });
  });

  it("should contain dictionaries for Northern Sami (sme)", () => {
    const smeDictionaries = dictionaries.filter((d) => d.lang === "sme");
    expect(smeDictionaries.length).toBeGreaterThan(0);
  });

  it("should contain dictionaries for South Sami (sma)", () => {
    const smaDictionaries = dictionaries.filter((d) => d.lang === "sma");
    expect(smaDictionaries.length).toBeGreaterThan(0);
  });

  it("should contain dictionaries for Lule Sami (smj)", () => {
    const smjDictionaries = dictionaries.filter((d) => d.lang === "smj");
    expect(smjDictionaries.length).toBeGreaterThan(0);
  });

  it("should contain dictionaries for Inari Sami (smn)", () => {
    const smnDictionaries = dictionaries.filter((d) => d.lang === "smn");
    expect(smnDictionaries.length).toBeGreaterThan(0);
  });

  it("should contain Finnish-related dictionaries", () => {
    const finDictionaries = dictionaries.filter((d) => d.value.includes("fin"));
    expect(finDictionaries.length).toBeGreaterThan(0);
  });

  it("should contain Norwegian Bokmål-related dictionaries", () => {
    const nobDictionaries = dictionaries.filter((d) => d.value.includes("nob"));
    expect(nobDictionaries.length).toBeGreaterThan(0);
  });
});