"use client";
import { useTranslations } from "next-intl";
import LanguageSelect from "../../components/grammar/LanguageSelect";
import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import Results from "@/components/grammar/Results";
import { Language } from "@/types/language";
import { GrammarResult } from "@/types/grammarResult";
import SamiKeyboard from "@/components/SamiKeyboard";

const GrammarCheckerPage = () => {
  const t = useTranslations("grammar_checker");
  const [inputText, setInputText] = React.useState("");
  const [lang, setLang] = React.useState<Language | null>(null);
  const [results, setResults] = React.useState<GrammarResult | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleCharacterSelect = (character: string) => {
    const textarea = textAreaRef.current;
    if (textarea) {
      const selectionStart = textarea.selectionStart || inputText.length;
      const selectionEnd = textarea.selectionEnd || inputText.length;

      const newText =
        inputText.substring(0, selectionStart) +
        character +
        inputText.substring(selectionEnd);

      setInputText(newText);

      // Focus back to the textarea and position cursor after the inserted character
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
      }, 0);
    } else {
      // Fallback: append to end
      setInputText((prev) => prev + character);
    }
  };

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
        <div className="w-full md:w-1/2 relative">
          <TextField
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            multiline
            minRows={10}
            className="w-full"
            placeholder={t("placeholder")}
            aria-label="Grammar input text"
            inputRef={textAreaRef}
          />
          <div className="absolute bottom-2 right-2">
            <SamiKeyboard
              onCharacterSelect={handleCharacterSelect}
              size="small"
              placement="top"
            />
          </div>
        </div>
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
