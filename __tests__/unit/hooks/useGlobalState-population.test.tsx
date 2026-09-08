import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { GlobalStateProvider, useGlobalState } from "@/hooks/useGlobalState";

const Probe = () => {
  const state = useGlobalState();
  return (
    <div>
      <span data-testid="dicts">{state.dictionaries.length}</span>
      <span data-testid="langs">{state.languages.length}</span>
    </div>
  );
};

const renderProvider = () =>
  render(
    <GlobalStateProvider>
      <Probe />
    </GlobalStateProvider>
  );

describe("GlobalStateProvider population", () => {
  it("populates dictionaries/languages from defaults when localStorage is empty", async () => {
    renderProvider();
    await waitFor(() => {
      expect(screen.getByTestId("dicts").textContent).not.toBe("0");
      expect(screen.getByTestId("langs").textContent).not.toBe("0");
    });
    expect(screen.getByTestId("dicts").textContent).not.toBe("0");
    expect(screen.getByTestId("langs").textContent).not.toBe("0");
  });

  it("falls back to defaults when localStorage holds a polluted '[]'", async () => {
    localStorage.setItem("dictionaries", "[]");
    localStorage.setItem("languages", "[]");
    renderProvider();
    await waitFor(() => {
      expect(screen.getByTestId("dicts").textContent).not.toBe("0");
    });
    expect(screen.getByTestId("dicts").textContent).not.toBe("0");
    expect(screen.getByTestId("langs").textContent).not.toBe("0");
  });

  it("respects a valid persisted list", async () => {
    const savedDicts = [
      {
        title: "Saved",
        lang: "sme",
        value: "sme-nob",
        short: "saved",
        selected: true,
        type: "divvun",
      },
    ];
    const savedLangs = [
      { name: "Nord Samisk", short: "sme", selected: true, translated: false, flag: "" },
    ];
    localStorage.setItem("dictionaries", JSON.stringify(savedDicts));
    localStorage.setItem("languages", JSON.stringify(savedLangs));
    renderProvider();
    await waitFor(() => {
      expect(screen.getByTestId("dicts").textContent).toBe("1");
      expect(screen.getByTestId("langs").textContent).toBe("1");
    });
  });
});