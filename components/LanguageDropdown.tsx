"use client";
import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Avatar,
  Tooltip,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import { Language } from "@/types/language";
import languages from "@/lib/languages";
import { useTranslations } from "next-intl";

const LanguageDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("nob");
  const t = useTranslations("navbar.languages");

  React.useEffect(() => {
    // Get language from cookie
    const lang = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="))
      ?.split("=")[1];
    if (lang) {
      setSelectedLanguage(lang);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = async (language: string) => {
    // Set language in cookie
    document.cookie = `lang=${language}; path=/; max-age=31536000`; // 1 year
    window.location.reload();
  };

  return (
    <div>
      <Tooltip title={t("select")} placement="bottom">
        <IconButton onClick={handleClick}>
          <LanguageIcon className="text-white" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {languages
          .filter((l: Language) => l.translated)
          .map((language) => (
            <MenuItem
              disabled={language.short === "sme" || language.short === "sma"}
              key={language.short}
              onClick={() => handleLanguageChange(language.short)}
              className="flex justify-between items-center space-x-8"
            >
              <div className="flex">
                <Avatar
                  src={language.flag}
                  alt={language.name}
                  sx={{ width: 24, height: 24, marginRight: 2 }}
                />
                <ListItemText>{t(language.short)}</ListItemText>
              </div>
              {selectedLanguage === language.short && (
                <CheckIcon sx={{ marginLeft: "auto", color: "green" }} />
              )}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default LanguageDropdown;
