"use client";
import { LangPair, TranslationRequest } from "@/types/requests";
import { IconButton, TextField } from "@mui/material";
import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface Props {
  langFrom?: string;
  langTo?: string;
}

const TextTranslate = (props: Props) => {
  const [textInput, setTextInput] = React.useState<string>("");
  const [translatedText, setTranslatedText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    if (props.langFrom && props.langTo) {
      setErrorMessage("");
    }
  }, [props.langFrom, props.langTo]);

  const validate = () => {
    if (!props.langTo) {
      setErrorMessage("Velg hvilket språk du ønsker å oversette til");
      return false;
    }
    // Fetch API call to translate the text
    if (!textInput.trim()) {
      setErrorMessage("Tekstfeltet kan ikke være tomt");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const langPair = `${props.langFrom || "nob"}|${props.langTo}`;
      const body: TranslationRequest = {
        langpair: langPair as LangPair,
        q: textInput,
        markUnknown: "yes",
        callBack: "text",
      };

      const data = await fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      if (response.responseData) {
        setTranslatedText(response.responseData.translatedText);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error during translation:", error);
      setErrorMessage(
        "Noe gikk galt under oversettelsen. Vennligst prøv igjen."
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setTextInput(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line in TextField
      submit();
    }
  };

  const fetchTextToSpeech = async (text: string, lang: string) => {
    try {
      const response = await fetch(`/api/speech?text=${text}&lang=${lang}`, {});
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error("Error fetching text-to-speech:", error);
      setErrorMessage("Kunne ikke hente tale for teksten.");
    }
  };

  return (
    <>
      <div className="flex space-x-2 items-center justify-center">
        <TextField
          rows={8}
          className="w-full"
          multiline
          placeholder="Skriv inn teksten du vil oversette..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <TextField
          disabled
          rows={8}
          className="w-full"
          multiline
          value={translatedText}
        />
      </div>
      {errorMessage && (
        <p className="mt-2 text-red-700 italic text-sm">{errorMessage}</p>
      )}
      <div className="flex w-full justify-between">
        {props.langFrom && (
          <IconButton
            onClick={() =>
              fetchTextToSpeech(textInput, props.langFrom as string)
            }
          >
            <VolumeUpIcon />
          </IconButton>
        )}
        {props.langTo && (
          <IconButton
            onClick={() =>
              fetchTextToSpeech(translatedText, props.langTo as string)
            }
          >
            <VolumeUpIcon />
          </IconButton>
        )}
      </div>
    </>
  );
};
export default TextTranslate;
