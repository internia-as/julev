import { Language } from "@/types/language";
import { Avatar, Chip } from "@mui/material";

interface Props {
  languages: Language[];
  toggleLanguage: (language: Language) => void;
}

const TranslateSelect = (props: Props) => {
  return (
    <div className="flex">
      {...props.languages.map((language) => (
        <Chip
          key={language.short}
          variant={language.selected ? "filled" : "outlined"}
          color="primary"
          avatar={<Avatar alt="Natacha" src={language.flag} />}
          label={language.name}
          className="w-32 mx-1 "
        />
      ))}
    </div>
  );
};

export default TranslateSelect;
