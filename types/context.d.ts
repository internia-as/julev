import { Language } from "./language";
import { SupportedLanguages } from "./supportedLanguages";

export interface GlobalState {
  query: string;
  dictionaries: Dictionary[];
  languages: Language[];
}

export interface GlobalStateContextType {
  query: string;
  dictionaries: Dictionary[];
  languages: Language[];
  setQuery: (query: string) => void;
  setDictionaries: (dictionaries: Dictionary[]) => void;
  setLanguages: (languages: Language[]) => void;
}
