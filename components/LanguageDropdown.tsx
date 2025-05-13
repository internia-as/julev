"use client";
import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import { Language } from "@/types/language";
import { useTranslations } from "next-intl";

interface Props {
  languages: Language[];
  toggleLanguage: (language: Language) => void;
}

const LanguageDropdown = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const t = useTranslations("navbar.languages");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <LanguageIcon className="text-white" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ minWidth: 360 }}
      >
        {props.languages
          .filter((l: Language) => l.translated)
          .map((language) => (
            <MenuItem
              key={language.short}
              onClick={() => props.toggleLanguage(language)}
              className="flex justify-between items-center space-x-8"
            >
              <div className="flex">
                <Avatar
                  src={`/images/flags/${language.short}.png`}
                  alt={language.name}
                  sx={{ width: 24, height: 24, marginRight: 2 }}
                />
                <ListItemText>{t(language.short)}</ListItemText>
              </div>
              {language.selected && (
                <CheckIcon sx={{ marginLeft: "auto", color: "green" }} />
              )}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default LanguageDropdown;
