"use client";
import FileTranslate from "@/components/translate/FileTranslate";
import TextTranslate from "@/components/translate/TextTranslate";
import { Language } from "@/types/language";
import { Tab, Tabs } from "@mui/material";
import React from "react";
import LanguageSelect from "@/components/translate/LanguageSelect";

const LanguagesFrom: Language[] = [
  {
    name: "Nordsamisk",
    short: "sme",
    selected: true,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Sørsamisk",
    short: "sma",
    selected: false,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Lulesamisk",
    short: "smj",
    selected: false,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Enaresamisk",
    short: "smn",
    selected: false,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
];

const LanguagesTo: Language[] = [
  {
    name: "Nordsamisk",
    short: "sme",
    selected: true,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Sørsamisk",
    short: "sma",
    selected: false,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Lulesamisk",
    short: "smj",
    selected: false,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Enaresamisk",
    short: "smn",
    selected: false,
    translated: true,
    flag: "/images/flags/sm.jpeg",
  },
  {
    name: "Norsk",
    short: "nob",
    selected: false,
    translated: true,
    flag: "/images/flags/nob.png",
  },
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Translate = () => {
  const [tab, setTab] = React.useState(0);
  const [languagesFrom, setLanguagesFrom] = React.useState(LanguagesFrom);
  const [languagesTo, setLanguagesTo] = React.useState(LanguagesTo);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleLanguageChange = async (
    language: Language,
    setState: React.Dispatch<React.SetStateAction<Language[]>>,
    languages: Language[]
  ) => {
    setState(
      languages.map((l) =>
        l.short === language.short
          ? { ...language, selected: true }
          : { ...l, selected: false }
      )
    );
  };

  return (
    <div className="h-screen flex flex-col items-center mt-20">
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Select translation type"
        className="mb-10"
      >
        <Tab label="Oversett tekst" {...a11yProps(0)} />
        <Tab label="Oversett fil" {...a11yProps(1)} />
        <Tab label="Oversett nettside" disabled {...a11yProps(2)} />
      </Tabs>

      <div className="flex justify-between w-2/3 mb-4">
        <LanguageSelect
          languages={languagesFrom}
          selectLanguage={(language) =>
            handleLanguageChange(language, setLanguagesFrom, languagesFrom)
          }
        />
        <LanguageSelect
          languages={languagesTo}
          selectLanguage={(language) =>
            handleLanguageChange(language, setLanguagesTo, languagesTo)
          }
        />
      </div>
      <div className="w-2/3">
        {tab === 0 && <TextTranslate />}
        {tab === 1 && <FileTranslate />}
      </div>
    </div>
  );
};
export default Translate;
