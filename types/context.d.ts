import { Language } from "./language";
import { SupportedLanguages } from "./supportedLanguages";

export interface GlobalState {
  query: string;
  direction: "sm" | "nob";
  dictionaries: Dictionary[];
  languages: Language[];
}

export interface GlobalStateContextType {
  query: string;
  direction: "sm" | "nob";
  dictionaries: Dictionary[];
  languages: Language[];
  setQuery: (query: string) => void;
  setDirection: (direction: "sm" | "nob") => void;
  setDictionaries: (dictionaries: Dictionary[]) => void;
  setLanguages: (languages: Language[]) => void;
}
