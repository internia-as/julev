"use client";
import React from "react";
import { IconButton, Menu, Tooltip, Paper } from "@mui/material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useTranslations } from "next-intl";

interface Props {
  onCharacterSelect?: (character: string) => void;
}

const SamiKeyboard: React.FC<Props> = ({ onCharacterSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const t = useTranslations("search");
  const open = Boolean(anchorEl);

  // Sámi special characters
  const samiCharacters = [
    "á",
    "â",
    "å",
    "æ",
    "ä",
    "č",
    "đ",
    "ǧ",
    "ï",
    "ǩ",
    "ŋ",
    "õ",
    "ø",
    "ö",
    "š",
    "ŧ",
    "ž",
    "ʒ",
    "ǯ",
    "ʹ",
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCharacterClick = (character: string) => {
    if (onCharacterSelect) {
      onCharacterSelect(character);
    }
    handleClose();
  };

  return (
    <div>
      <Tooltip title={t("keyboard")}>
        <IconButton color="primary" onClick={handleClick}>
          <KeyboardIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: "280px",
            padding: "8px",
          },
        }}
      >
        <Paper elevation={0} className="p-2">
          <div className="grid grid-cols-5 gap-1">
            {samiCharacters.map((character) => (
              <IconButton
                key={character}
                onClick={() => handleCharacterClick(character)}
                className="min-w-[40px] h-[40px] border border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                }}
              >
                {character}
              </IconButton>
            ))}
          </div>
        </Paper>
      </Menu>
    </div>
  );
};

export default SamiKeyboard;
