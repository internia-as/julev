import { describe, it, expect } from "vitest";
import { isAuthorized } from "@/lib/basicAuth";

const header = (user: string, password: string) =>
  "Basic " + btoa(`${user}:${password}`);

describe("isAuthorized", () => {
  it("accepts matching credentials", () => {
    expect(isAuthorized(header("julev", "hemmelig"), "julev", "hemmelig")).toBe(true);
  });

  it("accepts passwords containing a colon", () => {
    expect(isAuthorized(header("julev", "a:b"), "julev", "a:b")).toBe(true);
  });

  it("rejects wrong password", () => {
    expect(isAuthorized(header("julev", "feil"), "julev", "hemmelig")).toBe(false);
  });

  it("rejects missing header", () => {
    expect(isAuthorized(null, "julev", "hemmelig")).toBe(false);
  });

  it("rejects everything when credentials are not configured", () => {
    expect(isAuthorized(header("", ""), undefined, undefined)).toBe(false);
  });

  it("rejects malformed headers", () => {
    expect(isAuthorized("Basic !!!", "julev", "hemmelig")).toBe(false);
    expect(isAuthorized("Bearer abc", "julev", "hemmelig")).toBe(false);
  });
});
