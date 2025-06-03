"use client";
import FileTranslate from "@/components/translate/FileTranslate";
import TextTranslate from "@/components/translate/TextTranslate";
import { Tab, Tabs } from "@mui/material";
import React from "react";
import LanguageSelect from "@/components/translate/LanguageSelect";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Translate = () => {
  const [tab, setTab] = React.useState(0);
  const [langPair, setLangPair] = React.useState<string>("");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div className="h-full flex flex-col items-center mt-20">
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
        <LanguageSelect setLangPair={(pair) => setLangPair(pair)} />
      </div>
      <div className="w-2/3">
        {tab === 0 && <TextTranslate langPair={langPair} />}
        {tab === 1 && <FileTranslate langPair={langPair} />}
      </div>
    </div>
  );
};
export default Translate;
