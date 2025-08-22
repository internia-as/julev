import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { SupportedTTSLanguages } from "@/types/divvun";
import React from "react";
import { useTranslations } from "next-intl";

interface Props {
  text: string;
  lang: SupportedTTSLanguages;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  size?: "small" | "medium" | "large";
}

const TextToSpeech = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const langDisabled = props.lang === SupportedTTSLanguages.NOB;
  const t = useTranslations("translate");

  const fetchTextToSpeech = async (text: string, lang: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          lang: lang,
        }),
      });
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error("Error fetching text-to-speech:", error);
      props.setErrorMessage("Kunne ikke hente tale for teksten.");
    }
    setLoading(false);
  };

  return (
    <Tooltip title={langDisabled ? t("tts_not_available") : t("play_tts")}>
      <IconButton
        disabled={props.text.length === 0 || loading || langDisabled}
        onClick={() => fetchTextToSpeech(props.text, props.lang as string)}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <VolumeUpIcon fontSize={props.size} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default TextToSpeech;
