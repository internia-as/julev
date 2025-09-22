"use client";
import { Language } from "@/types/language";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

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

const LanguageSelect = () => {
  const t = useTranslations();
  const [selectedTo, setSelectedTo] = useState<Language | null>(null);

  const handleChange = (
    event: SelectChangeEvent,
    setState: React.Dispatch<React.SetStateAction<Language | null>>
  ) => {
    const lang = Languages.find((l) => l.short === event.target.value);
    setState(lang || null);
  };

  return (
    <Select
      value={selectedTo?.short || ""}
      className="w-full"
      onChange={(e) => handleChange(e, setSelectedTo)}
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
