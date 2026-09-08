"use client";
import { GlobalState, GlobalStateContextType } from "@/types/context";
import { Dictionary } from "@/types/dictionary";
import { Language } from "@/types/language";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import dictionaries from "@/lib/dictionaries";
import languages from "@/lib/languages";

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [state, setState] = useState<GlobalState>({
    query: "",
    direction: "relevance",
    dictionaries: dictionaries,
    languages: languages,
  });

  useEffect(() => {
    // get lang from local storage
    const lang = localStorage.getItem("lang");
    if (lang) {
      setState((prevState) => ({ ...prevState, lang }));
    }

    // get dictionaries from local storage or use default
    // Read a persisted list, trusting it only if it parses to a non-empty
    // array. A missing, corrupt, or "[]" value falls back to the defaults
    // already in state, so the UI is never left with an empty set.
    const readList = (key: string): unknown[] | null => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
      } catch {
        return null;
      }
    };

    // get dictionaries from local storage, or keep the defaults in state
    const savedDicts = readList("dictionaries");
    if (savedDicts) {
      setState((prevState) => ({
        ...prevState,
        dictionaries: savedDicts as Dictionary[],
      }));
    }

    const savedLangs = readList("languages");
    if (savedLangs) {
      setState((prevState) => ({
        ...prevState,
        languages: savedLangs as Language[],
      }));
    }

    // get direction from local storage
    const direction = localStorage.getItem("direction");
    if (
      direction === "sm" ||
      direction === "nob" ||
      direction === "relevance"
    ) {
      setState((prevState) => ({ ...prevState, direction }));
    }
  }, []);

  useEffect(() => {
    // Cache direction in local storage
    localStorage.setItem("direction", state.direction);
  }, [state.direction]);

  useEffect(() => {
    // Cache dictionaries in local storage (never persist an empty list,
    // which would poison subsequent loads).
    if (state.dictionaries.length > 0) {
      localStorage.setItem("dictionaries", JSON.stringify(state.dictionaries));
    }
  }, [state.dictionaries]);

  useEffect(() => {
    // Cache languages in local storage (never persist an empty list).
    if (state.languages.length > 0) {
      localStorage.setItem("languages", JSON.stringify(state.languages));
    }
  }, [state.languages]);

  const setQuery = (query: string) =>
    setState((prevState) => ({ ...prevState, query }));
  const setDirection = (direction: "sm" | "nob" | "relevance") =>
    setState((prevState) => ({ ...prevState, direction }));
  const setDictionaries = (dictionaries: Dictionary[]) =>
    setState((prevState) => ({ ...prevState, dictionaries }));
  const setLanguages = (languages: any[]) =>
    setState((prevState) => ({ ...prevState, languages }));

  return (
    <GlobalStateContext.Provider
      value={{
        ...state,
        setQuery,
        setDirection,
        setDictionaries,
        setLanguages,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
