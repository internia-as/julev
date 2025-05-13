import React from "react";
import { Select, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Language } from "@/types/language";

interface Props {
  languages: Language[];
  selectLanguage: (language: Language) => void;
}

const LanguageSelect = (props: Props) => (
  <Select
    value={props.languages.find((l) => l.selected)?.name}
    className="w-48"
  >
    {props.languages.map((language) => (
      <MenuItem
        key={language.short}
        onClick={() => props.selectLanguage(language)}
        className="flex justify-between items-center space-x-8"
        value={language.name}
      >
        <div className="flex">
          <img
            src={language.flag}
            alt={language.name}
            className="w-6 h-6 mr-2"
          />
          <span>{language.name}</span>
        </div>
      </MenuItem>
    ))}
  </Select>
);

export default LanguageSelect;
