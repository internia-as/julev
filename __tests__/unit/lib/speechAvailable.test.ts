import { describe, it, expect } from "vitest";
import speechAvailable from "@/lib/speechAvailable";

describe("speechAvailable", () => {
  it("should return true for South Sami (sma)", () => {
    expect(speechAvailable("sma")).toBe(true);
  });

  it("should return true for North Sami (sme)", () => {
    expect(speechAvailable("sme")).toBe(true);
  });

  it("should return true for Lule Sami (smj)", () => {
    expect(speechAvailable("smj")).toBe(true);
  });

  it("should return true for South Sami North dialect", () => {
    expect(speechAvailable("sma_North")).toBe(true);
  });

  it("should return true for South Sami Mid dialect", () => {
    expect(speechAvailable("sma_Mid")).toBe(true);
  });

  it("should return false for unsupported languages", () => {
    expect(speechAvailable("nob")).toBe(false);
    expect(speechAvailable("eng")).toBe(false);
    expect(speechAvailable("swe")).toBe(false);
    expect(speechAvailable("fin")).toBe(false);
    expect(speechAvailable("sms")).toBe(false);
    expect(speechAvailable("smn")).toBe(false);
  });

  it("should return false for null language", () => {
    expect(speechAvailable(null)).toBe(false);
  });
});