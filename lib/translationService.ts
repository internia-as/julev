import { useGlobalState } from "@/components/GlobalContext";
import enLocale from "@/public/locales/en.json";
import nobLocale from "@/public/locales/nob.json";
import { SupportedLanguages } from "@/types/supportedLanguages";

const locales = {
  en: enLocale,
  nob: nobLocale,
};

type TranslationKeys = keyof typeof enLocale;

export const translationService = (langaugeCode: SupportedLanguages) => {
  return {
    t(key: TranslationKeys) {
      return locales[langaugeCode][key];
    },
  };
};
