export interface GlobalState {
  lang: string;
  dictionaries: Dictionary[];
  mode: string;
}

export interface GlobalStateContextType {
  lang: string;
  dictionaries: Dictionary[];
  mode: string;
  setLang: (lang: string) => void;
  setDictionaries: (dictionaries: Dictionary[]) => void;
  setMode: (newMode: string) => void;
}
