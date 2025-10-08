import React, { useEffect } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Language } from "@/types/language";
import { SupportedTTSLanguages } from "@/types/divvun";
import { useTranslations } from "next-intl";

const Languages: Language[] = [
  {
    name: "Nordsamisk",
    short: "sme",
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Sørsamisk (Kortformer)",
    short: "sma_Mid",
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Sørsamisk (Langformer)",
    short: "sma_North",
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Sørsamisk",
    short: "sma",
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },

  {
    name: "Lulesamisk",
    short: "smj",
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Enaresamisk",
    short: "smn",
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Norsk Bokmål",
    short: "nob",
    translated: true,
    flag: "/images/flags/nob.png",
  },
];

interface Props {
  setLangFrom: React.Dispatch<React.SetStateAction<SupportedTTSLanguages>>;
  setLangTo: React.Dispatch<React.SetStateAction<SupportedTTSLanguages | null>>;
}

const LanguageSelect = (props: Props) => {
  const [langFrom] = React.useState<Language[]>(
    Languages.filter(
      (l) =>
        l.short !== "nob" && l.short !== "sma_Mid" && l.short !== "sma_North"
    )
  );
  const [langTo, setLangTo] = React.useState<Language[]>([]);
  const [selectedFrom, setSelectedFrom] = React.useState<Language | null>(null);
  const [selectedTo, setSelectedTo] = React.useState<Language | null>(null);
  const t = useTranslations();

  useEffect(() => {
    setSelectedFrom(Languages[0]);
  }, []);

  useEffect(() => {
    if (selectedFrom) {
      props.setLangFrom(selectedFrom.short as SupportedTTSLanguages);
    }
    // Current logic is that north sami is translatable to all languages,
    // and all other languages are translatable to ONLY north sami.
    const langs = Languages.filter((l) => l.short !== "sma");
    switch (selectedFrom?.short) {
      case "sme":
        setLangTo(
          langs.map((lang) =>
            lang.short === "sme" ? { ...lang, translated: false } : lang
          )
        );
        break;
      default:
        setLangTo(
          langs.map((lang) =>
            lang.short !== "sme" ? { ...lang, translated: false } : lang
          )
        );
    }

    if (selectedFrom?.short === "sme" && selectedTo?.short === "sme") {
      setSelectedTo(null);
      props.setLangTo(null);
    }
  }, [selectedFrom]);

  useEffect(() => {
    if (selectedTo !== null) {
      props.setLangTo(selectedTo.short as SupportedTTSLanguages);
    }
  }, [selectedTo]);

  const handleChange = (e: SelectChangeEvent<string>, setFunc: Function) => {
    const selectedLanguage = Languages.find(
      (lang) => lang.short === e.target.value
    );
    setFunc(selectedLanguage || null);
  };

  return (
    <div className="flex justify-between w-full space-x-4">
      <Select
        value={selectedFrom?.short || ""}
        className="w-44 md:w-48"
        onChange={(e) => handleChange(e, setSelectedFrom)}
      >
        {langFrom.map((language) => (
          <MenuItem value={language.short} key={language.short}>
            <div className="flex">
              <img
                src={language.flag}
                alt={language.name}
                className="w-6 h-6 mr-2"
              />
              <span>{t(`languages.${language.short}`)}</span>
            </div>
          </MenuItem>
        ))}
      </Select>

      <Select
        value={selectedTo?.short || ""}
        className="w-44 md:w-48"
        onChange={(e) => handleChange(e, setSelectedTo)}
        displayEmpty
      >
        <MenuItem value="" disabled hidden>
          {t("translate.choose_language")}
        </MenuItem>
        {langTo.map((language) => (
          <MenuItem
            disabled={!language.translated}
            value={language.short}
            key={language.short}
          >
            <div className="flex">
              <img
                src={language.flag}
                alt={language.name}
                className="w-6 h-6 mr-2"
              />
              <span>{t(`languages.${language.short}`)}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSelect;
