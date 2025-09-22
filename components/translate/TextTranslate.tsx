"use client";
import { LangPair, TranslationRequest } from "@/types/requests";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import TextToSpeech from "./TextToSpeech";
import { SupportedTTSLanguages } from "@/types/divvun";
import speechAvailable from "@/lib/speechAvailable";
import InfoDialog from "./InfoDialog";
import { useTranslations } from "next-intl";

interface Props {
  langFrom: SupportedTTSLanguages;
  langTo: SupportedTTSLanguages | null;
}

const TextTranslate = (props: Props) => {
  const [textInput, setTextInput] = React.useState<string>("");
  const [translatedText, setTranslatedText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const t = useTranslations();

  React.useEffect(() => {
    if (props.langFrom && props.langTo) {
      setErrorMessage("");
      setTranslatedText("");
    }
  }, [props.langFrom, props.langTo]);

  const validate = () => {
    if (!props.langTo) {
      setErrorMessage(t("translate.choose_language_error"));
      return false;
    }
    // Fetch API call to translate the text
    if (!textInput.trim()) {
      setErrorMessage(t("translate.textfield_error"));
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
      setErrorMessage(t("translate.error"));
    }
    setLoading(false);
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
      <div className="flex flex-col space-y-1 md:flex-row md:space-x-2 items-center justify-center">
        <TextField
          rows={8}
          className="w-full"
          multiline
          placeholder={t("translate.placeholder")}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          slotProps={
            speechAvailable(props.langFrom)
              ? {
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
                }
              : undefined
          }
        />
        <TextField
          rows={8}
          className="w-full"
          multiline
          placeholder={t("translate.placeholder_2")}
          value={translatedText}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#f5f5f5", // Light gray, similar to a disabled field
              "&:hover fieldset": {
                borderColor: "#e5e7eb", // Disable blue border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e5e7eb", // Disable blue border on focus
              },
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)", // Optional: Customize the default border for readability
              },
            },
            "& .MuiInputBase-input": {
              color: "rgba(0, 0, 0, 1.0)", // Normal text appearance
            },
          }}
          slotProps={
            speechAvailable(props.langTo)
              ? {
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
                }
              : undefined
          }
        />
      </div>
      {errorMessage && (
        <p className="mt-2 text-red-700 italic text-sm">{errorMessage}</p>
      )}
      <div className="flex w-full justify-between mt-4">
        <div className="w-1/3"></div>
        <Button
          className="w-1/3"
          onClick={submit}
          variant="contained"
          loading={loading}
        >
          {t("translate.translate")}
        </Button>
        <div className="flex w-1/3 justify-end space-x-2 items-center">
          <p className="text-xs text-gray-500">
            Oversettelser leveres av{" "}
            <a
              href="https://giellatekno.uit.no/"
              target="_blank"
              className="font-semibold underline"
            >
              Giellatekno
            </a>
          </p>
          <InfoDialog />
        </div>
      </div>
    </>
  );
};
export default TextTranslate;
