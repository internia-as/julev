"use client";
import { GlobalState, GlobalStateContextType } from "@/types/context";
import { Dictionary } from "@/types/dictionaries";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import dictionaries from "@/lib/dictionaries";

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
    mode: "julev",
  });

  useEffect(() => {
    // get lang from local storage
    const lang = localStorage.getItem("lang");
    if (lang) {
      setState((prevState) => ({ ...prevState, lang }));
    }

    // get dictionaries from local storage
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
  }, []);

  useEffect(() => {
    console.log("HELLO WORLD");
    // Cache lang in local storage
    localStorage.setItem("lang", state.lang);
  }, [state.lang]);

  useEffect(() => {
    // Cache dictionaries in local storage
    console.log("HELLO WORLD");
    localStorage.setItem("dictionaries", JSON.stringify(state.dictionaries));
  }, [state.dictionaries]);

  const setLang = (lang: string) =>
    setState((prevState) => ({ ...prevState, lang }));
  const setDictionaries = (dictionaries: Dictionary[]) =>
    setState((prevState) => ({ ...prevState, dictionaries }));
  const setDictMenuOpen = (isOpen: boolean) =>
    setState((prevState) => ({ ...prevState, dictMenuOpen: isOpen }));
  const setMode = (newMode: string) =>
    setState((prevState) => ({ ...prevState, mode: newMode }));

  return (
    <GlobalStateContext.Provider
      value={{ ...state, setLang, setDictionaries, setMode }}
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
