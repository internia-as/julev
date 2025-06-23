import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const SupportedLanguages = [
  {
    lang: "sme",
    voices: [
      {
        id: "biret",
        name: "Biret",
      },
      {
        id: "mahtte",
        name: "Máhtte",
      },
      {
        id: "sunna",
        name: "Sunná",
      },
    ],
  },
  {
    lang: "sma",
    voices: [
      {
        id: "aanna",
        name: "Aanna",
      },
    ],
  },
  {
    lang: "smj",
    voices: [
      {
        id: "abmut",
        name: "Abmut",
      },
      {
        id: "nihkol",
        name: "Nihkol",
      },
      {
        id: "sigga",
        name: "Siggá",
      },
    ],
  },
];

interface Props {
  text: string;
  lang: string; // TODO: Fix enum
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const TextToSpeech = (props: Props) => {
  const fetchTextToSpeech = async (text: string, lang: string) => {
    try {
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
  };

  return (
    <IconButton
      onClick={() => fetchTextToSpeech(props.text, props.lang as string)}
    >
      <VolumeUpIcon />
    </IconButton>
  );
};

export default TextToSpeech;
