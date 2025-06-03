import React, { useEffect } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Language } from "@/types/language";

const Languages: Language[] = [
  {
    name: "Nordsamisk",
    short: "sme",
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
    name: "Norsk",
    short: "nob",
    translated: true,
    flag: "/images/flags/nob.png",
  },
];

interface Props {
  setLangPair: (pair: string) => void;
}

const LanguageSelect = (props: Props) => {
  const [langFrom] = React.useState<Language[]>(
    Languages.filter((l) => l.short !== "nob")
  );
  const [langTo, setLangTo] = React.useState<Language[]>(Languages);
  const [selectedFrom, setSelectedFrom] = React.useState<Language | null>(
    Languages[0]
  );
  const [selectedTo, setSelectedTo] = React.useState<Language | null>(null);

  useEffect(() => {
    switch (selectedFrom?.short) {
      case "sme":
        setLangTo(
          Languages.map((lang) =>
            lang.short === "sme" ? { ...lang, translated: false } : lang
          )
        );
        break;
      case "sma":
        // Disable any but nordsamisk
        setLangTo(
          Languages.map((lang) =>
            lang.short !== "sme" ? { ...lang, translated: false } : lang
          )
        );
        break;
      case "smj":
        // Disable any but nordsamisk
        setLangTo(
          Languages.map((lang) =>
            lang.short !== "sme" ? { ...lang, translated: false } : lang
          )
        );
        break;
      case "smn":
        // Disable any but nordsamisk
        setLangTo(
          Languages.map((lang) =>
            lang.short !== "sme" ? { ...lang, translated: false } : lang
          )
        );
        break;
      default:
        setLangTo(Languages);
    }
  }, [selectedFrom]);

  useEffect(() => {
    if (selectedTo) {
      props.setLangPair(selectedFrom?.short + "|" + selectedTo.short);
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
