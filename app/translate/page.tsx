"use client";
import FileTranslate from "@/components/translate/FileTranslate";
import TextTranslate from "@/components/translate/TextTranslate";
import TranslateSelect from "@/components/translate/TranslateSelect";
import { Language } from "@/types/language";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
    short: "no",
    selected: false,
    translated: true,
    flag: "/images/flags/nob.png",
  },
];
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="w-2/3"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

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

  const handleToggle = (language: Language) => {};

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

      <div className="flex justify-between">
        <TranslateSelect
          languages={languagesFrom}
          toggleLanguage={handleToggle}
        />

        <TranslateSelect
          languages={languagesTo}
          toggleLanguage={handleToggle}
        />
      </div>

      <CustomTabPanel value={tab} index={0}>
        <TextTranslate />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <FileTranslate />
      </CustomTabPanel>
    </div>
  );
};
export default Translate;
