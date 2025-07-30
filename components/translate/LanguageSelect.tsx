import React, { useEffect } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Language } from "@/types/language";
import { SupportedTTSLanguages } from "@/types/divvun";

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
    name: "Norsk",
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
    Languages.filter((l) => l.short !== "nob")
  );
  const [langTo, setLangTo] = React.useState<Language[]>(Languages);
  const [selectedFrom, setSelectedFrom] = React.useState<Language | null>(null);
  const [selectedTo, setSelectedTo] = React.useState<Language | null>(null);

  useEffect(() => {
    setSelectedFrom(Languages[0]);
  }, []);

  useEffect(() => {
    if (selectedFrom) {
      props.setLangFrom(selectedFrom.short as SupportedTTSLanguages);
    }
    // Current logic is that north sami is translatable to all languages,
    // and all other languages are translatable to ONLY north sami.
    switch (selectedFrom?.short) {
      case "sme":
        setLangTo(
          Languages.map((lang) =>
            lang.short === "sme" ? { ...lang, translated: false } : lang
          )
        );
        break;
      default:
        setLangTo(
          Languages.map((lang) =>
            lang.short !== "sme" ? { ...lang, translated: false } : lang
          )
        );
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
    <>
      <Select
        value={selectedFrom?.short || ""}
        className="w-48"
        onChange={(e) => handleChange(e, setSelectedFrom)}
      >
        {langFrom.map((language) => (
          <MenuItem value={language.short} key={language.short}>
            <div className="flex">
              <img
                src={language.flag}
                alt="Nordsamisk"
                className="w-6 h-6 mr-2"
              />
              <span>{language.name}</span>
            </div>
          </MenuItem>
        ))}
      </Select>

      <Select
        value={selectedTo?.short || ""}
        className="w-48"
        onChange={(e) => handleChange(e, setSelectedTo)}
        displayEmpty
      >
        <MenuItem value="" disabled hidden>
          Velg språk
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
                alt="Nordsamisk"
                className="w-6 h-6 mr-2"
              />
              <span>{language.name}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default LanguageSelect;
