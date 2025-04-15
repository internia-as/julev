import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import { useGlobalState } from "./GlobalContext";
import { Language } from "@/types/language";

const LanguageDropdown = () => {
  const state = useGlobalState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("nob");

  React.useEffect(() => {
    const language = localStorage.getItem("lang");
    if (language) {
      setSelectedLanguage(language);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem("lang", language);

    handleClose();
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
        sx={{ width: 360 }}
      >
        {state.languages
          .filter((l: Language) => l.translated)
          .map((language) => (
            <MenuItem
              key={language.short}
              onClick={() => handleLanguageChange(language.short)}
              className="flex justify-between items-center space-x-8"
            >
              <div className="flex">
                <Avatar
                  src={`/images/flags/${language.short}.png`}
                  alt={language.name}
                  sx={{ width: 24, height: 24, marginRight: 2 }}
                />
                <ListItemText>{language.name}</ListItemText>
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
