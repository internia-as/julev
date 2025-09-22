import { useTranslations } from "next-intl";
import LanguageSelect from "./LanguageSelect";
import { TextField } from "@mui/material";

const GrammarCheckerPage = () => {
  const t = useTranslations("grammar_checker");
  return (
    <div className="flex flex-col items-center justify-center px-2 space-y-2 mt-2 md:mt-12">
      <div className="flex justify-between w-full md:w-1/2">
        <LanguageSelect />
      </div>
      <TextField
        multiline
        minRows={10}
        className="w-full md:w-1/2"
        placeholder={t("placeholder")}
      />
    </div>
  );
};

export default GrammarCheckerPage;
