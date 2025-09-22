"use client";
import TextTranslate from "@/components/translate/TextTranslate";
import React from "react";
import LanguageSelect from "@/components/translate/LanguageSelect";
import { SupportedTTSLanguages } from "@/types/divvun";

const Translate = () => {
  const [langFrom, setLangFrom] = React.useState<SupportedTTSLanguages>(
    SupportedTTSLanguages.SME
  );
  const [langTo, setLangTo] = React.useState<SupportedTTSLanguages | null>(
    null
  );

  return (
    <div className="h-full flex flex-col items-center px-2 md:px-0 py-6 md:py-20">
      <div className="flex justify-between w-full md:w-2/3 mb-4">
        <LanguageSelect setLangFrom={setLangFrom} setLangTo={setLangTo} />
      </div>
      <div className="w-full md:w-2/3">
        <TextTranslate langFrom={langFrom} langTo={langTo} />
      </div>
    </div>
  );
};
export default Translate;
