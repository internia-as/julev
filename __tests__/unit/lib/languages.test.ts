import { describe, it, expect } from "vitest";
import languages from "@/lib/languages";
import { Language } from "@/types/language";

describe("languages", () => {
  it("should export an array of languages", () => {
    expect(Array.isArray(languages)).toBe(true);
  });

  it("should have at least one language", () => {
    expect(languages.length).toBeGreaterThan(0);
  });

  it("should have all required fields on each language", () => {
    languages.forEach((lang) => {
      expect(lang).toHaveProperty("name");
      expect(lang).toHaveProperty("short");
      expect(lang).toHaveProperty("selected");
      expect(lang).toHaveProperty("translated");
      expect(lang).toHaveProperty("flag");
    });
  });

  it("should have all languages marked as selected by default", () => {
    languages.forEach((lang) => {
      expect(lang.selected).toBe(true);
    });
  });

  it("should include all Sami languages", () => {
    const samiCodes = ["sma", "sme", "smj", "smn", "sms"];
    const samiLanguages = languages.filter((l) => samiCodes.includes(l.short));
    expect(samiLanguages.length).toBe(5);
  });

  it("should include Norwegian Bokmål", () => {
    const nob = languages.find((l) => l.short === "nob");
    expect(nob).toBeDefined();
    expect(nob?.name).toBe("Norsk Bokmål");
    expect(nob?.translated).toBe(true);
  });

  it("should include English", () => {
    const eng = languages.find((l) => l.short === "eng");
    expect(eng).toBeDefined();
    expect(eng?.name).toBe("Engelsk");
    expect(eng?.translated).toBe(true);
  });

  it("should include Finnish", () => {
    const fin = languages.find((l) => l.short === "fin");
    expect(fin).toBeDefined();
    expect(fin?.name).toBe("Finsk");
  });

  it("should include Swedish", () => {
    const swe = languages.find((l) => l.short === "swe");
    expect(swe).toBeDefined();
    expect(swe?.name).toBe("Svensk");
  });

  it("should include Russian", () => {
    const rus = languages.find((l) => l.short === "rus");
    expect(rus).toBeDefined();
    expect(rus?.name).toBe("Russisk");
  });
});