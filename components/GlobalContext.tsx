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
    lang: "nob",
    dictionaries: [],
    languages: [],
    mode: "divvun",
  });

  useEffect(() => {
    // get lang from local storage
    const lang = localStorage.getItem("lang");
    if (lang) {
      setState((prevState) => ({ ...prevState, lang }));
    }

    // get dictionaries from local storage or use default
    const dicts = localStorage.getItem("dictionaries");
    if (dicts) {
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
  }, []);

  useEffect(() => {
    // Cache lang in local storage
    localStorage.setItem("lang", state.lang);
  }, [state.lang]);

  useEffect(() => {
    // Cache dictionaries in local storage
    localStorage.setItem("dictionaries", JSON.stringify(state.dictionaries));
  }, [state.dictionaries]);

  useEffect(() => {
    // Cache languages in local storage
    localStorage.setItem("languages", JSON.stringify(state.languages));
  }, [state.languages]);

  const setLang = (lang: string) =>
    setState((prevState) => ({ ...prevState, lang }));
  const setDictionaries = (dictionaries: Dictionary[]) =>
    setState((prevState) => ({ ...prevState, dictionaries }));
  const setLanguages = (languages: any[]) =>
    setState((prevState) => ({ ...prevState, languages }));
  const setMode = (newMode: string) =>
    setState((prevState) => ({ ...prevState, mode: newMode }));

  return (
    <GlobalStateContext.Provider
      value={{ ...state, setLang, setDictionaries, setLanguages, setMode }}
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
