import { describe, it, expect } from "vitest";
import { getColumn } from "@/lib/getColumn";

describe("getColumn", () => {
  describe("verbs (V)", () => {
    describe("Northern Sami (sme)", () => {
      it("should return correct verb paradigm columns", () => {
        const expected = ["mun", "don", "son", "moai", "doai", "soai", "mii", "dii", "sii"];
        expected.forEach((col, i) => {
          expect(getColumn(i, "V", "sme")).toBe(col);
        });
      });

      it("should return empty string for out-of-bounds index", () => {
        expect(getColumn(99, "V", "sme")).toBe("");
      });
    });

    describe("Lule Sami (smj)", () => {
      it("should return correct verb paradigm columns", () => {
        const expected = ["mån", "duon", "sån", "måj", "dåj", "såj", "mij", "dij", "sij"];
        expected.forEach((col, i) => {
          expect(getColumn(i, "V", "smj")).toBe(col);
        });
      });
    });

    describe("South Sami (sma)", () => {
      it("should return correct verb paradigm columns", () => {
        const expected = [
          "manne",
          "datne",
          "dïhte",
          "månnoeh",
          "dotne/dåtnoeh",
          "dah guaktah",
          "mij",
          "dijjieh",
          "dah",
        ];
        expected.forEach((col, i) => {
          expect(getColumn(i, "V", "sma")).toBe(col);
        });
      });
    });

    it("should return empty string for unsupported language", () => {
      expect(getColumn(0, "V", "nob")).toBe("");
    });
  });

  describe("nouns (N)", () => {
    it("should return correct noun paradigm for sme", () => {
      const expected = ["Nom", "Acc", "Gen", "Ill", "Loc", "Com", "Ess"];
      expected.forEach((col, i) => {
        expect(getColumn(i, "N", "sme")).toBe(col);
      });
    });

    it("should return correct noun paradigm for smj", () => {
      const expected = ["Nom", "Acc", "Gen", "Ill", "Ine", "Ela", "Com", "Abe", "Ess"];
      expected.forEach((col, i) => {
        expect(getColumn(i, "N", "smj")).toBe(col);
      });
    });

    it("should return correct noun paradigm for sma", () => {
      const expected = ["Nom", "Acc", "Gen", "Ill", "Ine", "Ela", "Com", "Ess"];
      expected.forEach((col, i) => {
        expect(getColumn(i, "N", "sma")).toBe(col);
      });
    });

    it("should return correct noun paradigm for smn", () => {
      const expected = ["Nom", "Acc", "Gen", "Ill", "Loc", "Com", "Abe", "Par", "Ess"];
      expected.forEach((col, i) => {
        expect(getColumn(i, "N", "smn")).toBe(col);
      });
    });

    it("should return correct noun paradigm for fin", () => {
      const expected = [
        "Nom", "Gen", "Par", "All", "Abl", "Abe", "Ill", "Ine", "Ela", "Abe", "Ess", "Tra", "Ins",
      ];
      expected.forEach((col, i) => {
        expect(getColumn(i, "N", "fin")).toBe(col);
      });
    });

    it("should return empty string for unsupported language", () => {
      expect(getColumn(0, "N", "nob")).toBe("");
    });
  });

  describe("adjectives (A)", () => {
    it("should return correct adjective paradigm for sme", () => {
      const expected = [
        "Attr", "Sg/Nom", "Pl/Nom", "Sg/Acc", "Pl/Acc", "Sg/Gen", "Pl/Gen",
        "Sg/Ill", "Pl/Ill", "Sg/Loc", "Pl/Loc", "Sg/Com", "Pl/Com", "Ess",
      ];
      expected.forEach((col, i) => {
        expect(getColumn(i, "A", "sme")).toBe(col);
      });
    });

    it("should return correct adjective paradigm for smj", () => {
      expect(getColumn(0, "A", "smj")).toBe("Attr");
    });

    it("should return correct adjective paradigm for sma", () => {
      expect(getColumn(0, "A", "sma")).toBe("Attr");
    });

    it("should return empty string for unsupported language", () => {
      expect(getColumn(0, "A", "smn")).toBe("");
    });
  });

  it("should return Unknown POS message for unknown part of speech", () => {
    expect(getColumn(0, "X", "sme")).toBe("Unknown POS: X");
  });
});