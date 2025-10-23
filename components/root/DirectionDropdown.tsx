import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckIcon from "@mui/icons-material/Check";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useTranslations } from "next-intl";

const DirectionDropdown: React.FC = () => {
  const state = useGlobalState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const t = useTranslations("search");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDirectionChange = (direction: "sm" | "nob" | "relevance") => {
    state.setDirection(direction);
    handleClose();
  };

  const getDirectionLabel = (direction: "sm" | "nob" | "relevance") => {
    switch (direction) {
      case "relevance":
        return t("direction_relevance");
      case "sm":
        return t("direction_samisk_first");
      case "nob":
        return t("direction_norwegian_first");
      default:
        return "";
    }
  };

  const directions: Array<"relevance" | "sm" | "nob"> = [
    "relevance",
    "sm",
    "nob",
  ];

  return (
    <div>
      <Tooltip title={getDirectionLabel(state.direction)} placement="bottom">
        <IconButton onClick={handleClick}>
          <MenuBookIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {directions.map((direction) => (
          <MenuItem
            key={direction}
            onClick={() => handleDirectionChange(direction)}
            className="flex justify-between items-center space-x-8"
          >
            <ListItemText>{getDirectionLabel(direction)}</ListItemText>
            {state.direction === direction && (
              <CheckIcon sx={{ marginLeft: "auto", color: "green" }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DirectionDropdown;
