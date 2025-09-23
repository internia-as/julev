"use client";
import { Language } from "@/types/language";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Languages: Language[] = [
  {
    name: "Nordsamisk",
    short: "se",
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
    name: "Skolte samisk",
    short: "sms",
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
  lang: Language | null;
  setLang: (lang: Language | null) => void;
}

const LanguageSelect = (props: Props) => {
  const t = useTranslations();

  useEffect(() => {
    // Check local storage for saved language preference
    const savedLang = localStorage.getItem("grammarCheckerLang");
    if (savedLang) {
      const lang = Languages.find((l) => l.short === savedLang);
      if (lang) {
        props.setLang(lang);
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (props.lang) {
      localStorage.setItem("grammarCheckerLang", props.lang.short);
    }
  }, [props.lang]);

  const handleChange = (event: SelectChangeEvent) => {
    const lang = Languages.find((l) => l.short === event.target.value);
    props.setLang(lang || null);
  };

  return (
    <Select
      value={props.lang ? props.lang.short : ""}
      fullWidth={true}
      onChange={(e) => handleChange(e)}
      displayEmpty
    >
      <MenuItem value="" disabled hidden>
        {t("translate.choose_language")}
      </MenuItem>
      {Languages.map((language) => (
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
  );
};

export default LanguageSelect;
