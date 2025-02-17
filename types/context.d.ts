export interface GlobalState {
  lang: string;
  dictionaries: Dictionary[];
  dictMenuOpen: boolean;
}

export interface GlobalStateContextType {
  lang: string;
  dictionaries: Dictionary[];
  dictMenuOpen: boolean;
  setLang: (lang: string) => void;
  setDictionaries: (dictionaries: Dictionary[]) => void;
  setDictMenuOpen: (isOpen: boolean) => void;
}
