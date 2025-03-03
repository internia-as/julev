"use client";
import { GlobalState, GlobalStateContextType } from "@/types/context";
import { Dictionary } from "@/types/dictionaries";
import { createContext, useContext, useState, ReactNode } from "react";

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
