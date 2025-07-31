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
    <div className="h-full bg-gray-100 shadow-md flex flex-col items-center py-20">
      <div className="flex justify-between w-2/3 mb-4">
        <LanguageSelect setLangFrom={setLangFrom} setLangTo={setLangTo} />
      </div>
      <div className="w-2/3">
        <TextTranslate langFrom={langFrom} langTo={langTo} />
      </div>
    </div>
  );
};
export default Translate;
