import { describe, it, expect } from "vitest";
import { highlightText, splitText, linkifyJf } from "@/lib/textFormating";

describe("highlightText", () => {
  it("should highlight matching query in text", () => {
    const result = highlightText("Hello world", "world");
    expect(result).toBe("Hello <mark>world</mark>");
  });

  it("should highlight all occurrences of the query", () => {
    const result = highlightText("test test test", "test");
    expect(result).toBe("<mark>test</mark> <mark>test</mark> <mark>test</mark>");
  });

  it("should be case insensitive", () => {
    const result = highlightText("Hello WORLD", "world");
    expect(result).toBe("Hello <mark>WORLD</mark>");
  });

  it("should escape special regex characters in query", () => {
    const result = highlightText("price is $100.00", "$100.00");
    expect(result).toBe("price is <mark>$100.00</mark>");
  });

  it("should return unchanged text when query not found", () => {
    const result = highlightText("Hello world", "xyz");
    expect(result).toBe("Hello world");
  });

  it("should handle empty query (matches everywhere due to regex)", () => {
    // NOTE: Empty query creates empty matches - this is current behavior
    // A production fix would add an early return for empty query
    const result = highlightText("Hello world", "");
    expect(result).toContain("<mark></mark>");
  });
});

describe("splitText", () => {
  it("should split text by character and join with br tags", () => {
    const result = splitText("word1;word2;word3", ";");
    expect(result).toBe("word1;<br />word2;<br />word3");
  });

  it("should return original text if separator not found", () => {
    const result = splitText("hello world", ";");
    expect(result).toBe("hello world");
  });

  it("should handle single segment", () => {
    const result = splitText("onlyword", ",");
    expect(result).toBe("onlyword");
  });
});

describe("linkifyJf", () => {
  it("should convert jf. references to links", () => {
    const result = linkifyJf("See jf. word for more");
    expect(result).toBe('See jf. <a href="?q=word" class="jf-link">word</a> for more');
  });

  it("should handle Norwegian special characters", () => {
    const result = linkifyJf("See jf. ærlig for more");
    expect(result).toBe('See jf. <a href="?q=ærlig" class="jf-link">ærlig</a> for more');
  });

  it("should handle multiple jf. references", () => {
    const result = linkifyJf("See jf. word1 and jf. word2");
    expect(result).toBe(
      'See jf. <a href="?q=word1" class="jf-link">word1</a> and jf. <a href="?q=word2" class="jf-link">word2</a>'
    );
  });

  it("should not modify text without jf. references", () => {
    const result = linkifyJf("Hello world");
    expect(result).toBe("Hello world");
  });

  it("should handle Sami characters in word", () => {
    const result = linkifyJf("See jf. áŋgis");
    expect(result).toBe('See jf. <a href="?q=áŋgis" class="jf-link">áŋgis</a>');
  });
});