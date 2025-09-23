"use client";
import { useTranslations } from "next-intl";
import LanguageSelect from "../../components/grammar/LanguageSelect";
import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import Results from "@/components/grammar/Results";
import { Language } from "@/types/language";
import { GrammarResult } from "@/types/grammarResult";

const GrammarCheckerPage = () => {
  const t = useTranslations("grammar_checker");
  const [inputText, setInputText] = React.useState("");
  const [lang, setLang] = React.useState<Language | null>(null);
  const [results, setResults] = React.useState<GrammarResult | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    const res = await fetch("/api/grammar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: lang?.short,
        text: inputText,
        encoding: "utf-16",
      }),
    });
    const data = await res.json();
    setResults(data || []);
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-2 space-y-2 mt-2 md:mt-12">
      <div className="flex justify-between w-full md:w-1/2">
        <LanguageSelect lang={lang} setLang={setLang} />
      </div>
      <FormControl
        fullWidth={true}
        className="flex justify-center items-center space-y-2"
      >
        <TextField
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          multiline
          minRows={10}
          className="w-full md:w-1/2"
          placeholder={t("placeholder")}
          aria-label="Grammar input text"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="w-full md:w-1/2"
          loading={submitted}
        >
          {t("check_grammar")}
        </Button>
      </FormControl>

      <Results results={results} lang={lang?.short || null} />
    </div>
  );
};

export default GrammarCheckerPage;
