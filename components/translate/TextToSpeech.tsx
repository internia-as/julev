import {
  CircularProgress,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { SupportedTTSLanguages } from "@/types/divvun";
import React from "react";
import { useTranslations } from "next-intl";
import fetchTextToSpeech from "@/lib/fetchTextToSpeech";
import { trackEvent } from "@/lib/umamiTrackEvents";

interface Props {
  text: string;
  lang: SupportedTTSLanguages;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  size?: "small" | "medium" | "large";
  label?: string;
}

const TextToSpeech = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const langDisabled = props.lang === SupportedTTSLanguages.NOB;
  const t = useTranslations("translate");

  const handleClick = async () => {
    props.setErrorMessage("");
    setLoading(true);
    const res = await fetchTextToSpeech(props.text, props.lang);
    if (!res) {
      props.setErrorMessage("Kunne ikke hente tale for teksten.");
    }
    setLoading(false);
    trackEvent(`Play TTS`, { language: props.lang });
  };

  const getIcons = () => {
    return (
      <>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <VolumeUpIcon fontSize={props.size} />
        )}
      </>
    );
  };

  return (
    <Tooltip title={langDisabled ? t("tts_not_available") : t("play_tts")}>
      <span>
        {props.label ? (
          <MenuItem disabled={langDisabled} dense onClick={handleClick}>
            {getIcons()}
            <Typography variant="subtitle2" className="px-4">
              {props.label}
            </Typography>
          </MenuItem>
        ) : (
          <IconButton
            disabled={props.text.length === 0 || loading || langDisabled}
            onClick={handleClick}
          >
            {getIcons()}
          </IconButton>
        )}
      </span>
    </Tooltip>
  );
};

export default TextToSpeech;
