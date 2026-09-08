import { describe, it, expect } from "vitest";
import getLangImg from "@/lib/getLangImg";

describe("getLangImg", () => {
  it("should return correct flag path for Sami languages", () => {
    const samLanguages = ["sma", "sme", "smj", "smn", "sms"];
    samLanguages.forEach((lang) => {
      expect(getLangImg(lang)).toBe("/images/flags/sm.jpeg");
    });
  });

  it("should return correct flag path for Finnish", () => {
    expect(getLangImg("fin")).toBe("/images/flags/fin.png");
  });

  it("should return correct flag path for Norwegian Bokmål", () => {
    expect(getLangImg("nob")).toBe("/images/flags/nob.png");
  });

  it("should return correct flag path for Swedish", () => {
    expect(getLangImg("swe")).toBe("/images/flags/swe.webp");
  });

  it("should return correct flag path for English", () => {
    expect(getLangImg("eng")).toBe("/images/flags/eng.png");
  });

  it("should return correct flag path for Russian", () => {
    expect(getLangImg("rus")).toBe("/images/flags/rus.png");
  });

  it("should return globe fallback for unknown language", () => {
    expect(getLangImg("unknown")).toBe("/images/flags/globe.png");
    expect(getLangImg("")).toBe("/images/flags/globe.png");
  });
});