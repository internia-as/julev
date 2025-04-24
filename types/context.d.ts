import { Language } from "./language";
import { SupportedLanguages } from "./supportedLanguages";

export interface GlobalState {
  query: string;
  dictionaries: Dictionary[];
  languages: Language[];
  mode: string;
}

export interface GlobalStateContextType {
  query: string;
  dictionaries: Dictionary[];
  languages: Language[];
  mode: string;
  setQuery: (query: string) => void;
  setDictionaries: (dictionaries: Dictionary[]) => void;
  setLanguages: (languages: Language[]) => void;
  setMode: (newMode: string) => void;
}
