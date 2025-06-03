"use client";
import { TextField } from "@mui/material";
import React from "react";

interface Props {
  langPair: string;
}

const TextTranslate = (props: Props) => {
  const [textInput, setTextInput] = React.useState<string>("");
  const [translatedText, setTranslatedText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const submit = () => {
    console.log(props.langPair);
    // Fetch API call to translate the text

    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setTranslatedText("Oversatt tekst: " + textInput);
      setLoading(false);
    }, 2000);
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
    <div className="flex space-x-2 items-center justify-center">
      <TextField
        rows={8}
        className="w-full"
        multiline
        placeholder="Skriv inn teksten du vil oversette..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <TextField rows={8} className="w-full" multiline value={translatedText} />
    </div>
  );
};
export default TextTranslate;
