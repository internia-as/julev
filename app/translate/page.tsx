"use client";
import FileTranslate from "@/components/translate/FileTranslate";
import TextTranslate from "@/components/translate/TextTranslate";
import { Tab, Tabs } from "@mui/material";
import React from "react";
import LanguageSelect from "@/components/translate/LanguageSelect";
import { SupportedTTSLanguages } from "@/types/divvun";

const Translate = () => {
  const [tab, setTab] = React.useState(0);
  const [langFrom, setLangFrom] = React.useState<SupportedTTSLanguages>(
    SupportedTTSLanguages.SME
  );
  const [langTo, setLangTo] = React.useState<SupportedTTSLanguages | null>(
    null
  );

  return (
    <div className="h-full bg-gray-100 shadow-md flex flex-col items-center py-20">
      <Tabs
        value={tab}
        onChange={(_event, newValue) => setTab(newValue)}
        aria-label="Select translation type"
        className="mb-10"
      >
        <Tab label="Oversett tekst" />
        <Tab label="Oversett fil" disabled />
      </Tabs>

      <div className="flex justify-between w-2/3 mb-4">
        <LanguageSelect setLangFrom={setLangFrom} setLangTo={setLangTo} />
      </div>
      <div className="w-2/3">
        {tab === 0 && <TextTranslate langFrom={langFrom} langTo={langTo} />}
        {tab === 1 && <FileTranslate langFrom={langFrom} langTo={langTo} />}
      </div>
    </div>
  );
};
export default Translate;
