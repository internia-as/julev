"use client";
import { GlobalState, GlobalStateContextType } from "@/types/context";
import { Dictionary } from "@/types/dictionary";
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
    dictionaries: [],
    languages: [],
  });

  useEffect(() => {
    // get lang from local storage
    const lang = localStorage.getItem("lang");
    if (lang) {
      setState((prevState) => ({ ...prevState, lang }));
    }

    // get dictionaries from local storage or use default
    const dicts = localStorage.getItem("dictionaries");
    if (dicts && dicts.length > 0) {
      setState((prevState) => ({
        ...prevState,
        dictionaries: JSON.parse(dicts),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        dictionaries: dictionaries,
      }));
    }

    const langs = localStorage.getItem("languages");
    if (langs) {
      setState((prevState) => ({
        ...prevState,
        languages: JSON.parse(langs),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        languages: languages,
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
    // Cache dictionaries in local storage
    localStorage.setItem("dictionaries", JSON.stringify(state.dictionaries));
  }, [state.dictionaries]);

  useEffect(() => {
    // Cache languages in local storage
    localStorage.setItem("languages", JSON.stringify(state.languages));
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
