import fetchTextToSpeech from "@/lib/fetchTextToSpeech";
import { GrammarError } from "@/types/grammarResult";
import { Chip, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";

interface Props {
  error: GrammarError;
  lang: string | null;
}
const ErrorCard = (props: Props) => {
  const t = useTranslations("grammar_checker");
  const handleClick = (text: string) => {
    fetchTextToSpeech(text, props.lang as any);
  };
  return (
    <div className="bg-white border border-gray-300 rounded-sm p-4 shadow-sm">
      <h3 className="font-bold mb-2 text-gray-500">{props.error.error_text}</h3>
      <h4>{props.error.title}</h4>
      <p className="text-gray-500 text-sm">{props.error.description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {props.error.suggestions.map((suggestion, index) => (
          <Tooltip key={index} title={t("play_audio")}>
            <Chip
              key={index}
              color="primary"
              label={suggestion}
              variant="outlined"
              className="cursor-pointer"
              onClick={() => handleClick(suggestion)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ErrorCard;
