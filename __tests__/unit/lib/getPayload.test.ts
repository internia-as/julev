import { describe, it, expect, vi, beforeEach } from "vitest";
import getPayload from "@/lib/divvun/getPayload";

describe("getPayload", () => {
  describe("AllLemmas operation", () => {
    it("should return correct payload structure", () => {
      const payload = getPayload(
        "AllLemmas",
        "test",
        ["sme", "smj"],
        ["gtnobsme"]
      );

      expect(payload).toEqual({
        operationName: "AllLemmas",
        variables: {
          inputValue: "test",
          searchMode: "start",
          srcLangs: ["sme", "smj"],
          targetLangs: ["sme", "smj"],
          wantedDicts: ["gtnobsme"],
        },
        query: expect.any(String),
      });
    });

    it("should use empty arrays for undefined params", () => {
      const payload = getPayload(
        "AllLemmas",
        "test",
        undefined,
        undefined
      );

      expect(payload.variables.inputValue).toBe("test");
    });
  });

  describe("TermArticles operation", () => {
    it("should return correct payload structure", () => {
      const payload = getPayload(
        "TermArticles",
        "lemma",
        ["sme"],
        ["gtnobsme"]
      );

      expect(payload).toEqual({
        operationName: "TermArticles",
        variables: {
          lemma: "lemma",
          srcLangs: ["sme"],
          targetLangs: ["sme"],
        },
        query: expect.any(String),
      });
    });
  });

  describe("DictArticles operation", () => {
    it("should return correct payload structure", () => {
      const payload = getPayload(
        "DictArticles",
        "word",
        ["sme", "smj"],
        ["gtnobsme", "gtsmenob"]
      );

      expect(payload).toEqual({
        operationName: "DictArticles",
        variables: {
          lemma: "word",
          srcLangs: ["sme", "smj"],
          targetLangs: ["sme", "smj"],
          wantedDicts: ["gtnobsme", "gtsmenob"],
        },
        query: expect.any(String),
      });
    });
  });

  describe("Generated operation", () => {
    it("should return correct payload structure", () => {
      const payload = getPayload(
        "Generated",
        "bures",
        undefined,
        undefined,
        "sme",
        ["+V+Ind+Prs+Sg1", "+V+Ind+Prs+Sg2"]
      );

      expect(payload).toEqual({
        operationName: "Generated",
        query: expect.any(String),
        variables: {
          language: "sme",
          origform: "bures",
          paradigmTemplates: ["+V+Ind+Prs+Sg1", "+V+Ind+Prs+Sg2"],
        },
      });
    });
  });

  it("should throw error for unknown operation name", () => {
    expect(() => getPayload("UnknownOp", "test")).toThrow(
      "Unknown operation name: UnknownOp"
    );
  });
});