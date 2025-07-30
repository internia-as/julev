"use client";
import { LangPair, TranslationRequest } from "@/types/requests";
import { Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import TextToSpeech from "./TextToSpeech";
import { SupportedTTSLanguages } from "@/types/divvun";

interface Props {
  langFrom: SupportedTTSLanguages;
  langTo: SupportedTTSLanguages | null;
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
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  sx={{ position: "absolute", top: 5, right: 0 }}
                  position="start"
                >
                  <TextToSpeech
                    lang={props.langFrom}
                    text={textInput}
                    setErrorMessage={setErrorMessage}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          disabled
          rows={8}
          className="w-full"
          multiline
          value={translatedText}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  sx={{ position: "absolute", top: 5, right: 0 }}
                  position="start"
                >
                  <TextToSpeech
                    lang={props.langTo as SupportedTTSLanguages}
                    text={translatedText}
                    setErrorMessage={setErrorMessage}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
      {errorMessage && (
        <p className="mt-2 text-red-700 italic text-sm">{errorMessage}</p>
      )}
      <div className="flex w-full justify-center mt-4">
        <Button
          className="bg-blue-500  text-white px-4 py-2 w-1/3 rounded hover:bg-blue-600"
          onClick={submit}
          variant="contained"
        >
          {loading ? "Oversetter..." : "Oversett"}
        </Button>
      </div>
    </>
  );
};
export default TextTranslate;
