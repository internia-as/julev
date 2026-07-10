import { describe, it, expect } from "vitest";
import { getParadigmTemplates } from "@/lib/divvun/getParadigmTemplates";

describe("getParadigmTemplates", () => {
  describe("verb templates (V)", () => {
    it("should return verb templates for 'V' POS", () => {
      const templates = getParadigmTemplates("V");
      expect(templates).toHaveLength(18);
      expect(templates).toContain("+V+Ind+Prs+Sg1");
      expect(templates).toContain("+V+Ind+Prt+Sg1");
      expect(templates).toContain("+V+Ind+Prs+Pl3");
      expect(templates).toContain("+V+Ind+Prt+Pl3");
    });
  });

  describe("noun templates (N)", () => {
    it("should return noun templates for 'N' POS", () => {
      const templates = getParadigmTemplates("N");
      expect(templates).toHaveLength(13);
      expect(templates).toContain("+N+Sg+Nom");
      expect(templates).toContain("+N+Pl+Nom");
      expect(templates).toContain("+N+Sg+Gen");
      expect(templates).toContain("+N+Ess");
    });
  });

  describe("adjective templates (A)", () => {
    it("should return adjective templates for 'A' POS", () => {
      const templates = getParadigmTemplates("A");
      expect(templates).toHaveLength(48);
      expect(templates).toContain("+A+Attr");
      expect(templates).toContain("+A+Sg+Nom");
      expect(templates).toContain("+A+Pl+Nom");
      expect(templates).toContain("+A+Ess");
    });

    it("should include derived/compound and derived/superlative templates", () => {
      const templates = getParadigmTemplates("A");
      expect(templates).toContain("+A+Der/Comp+A+Attr");
      expect(templates).toContain("+A+Der/Superl+A+Attr");
    });
  });

  it("should return empty array for unknown POS", () => {
    expect(getParadigmTemplates("X")).toEqual([]);
    expect(getParadigmTemplates("")).toEqual([]);
  });
});