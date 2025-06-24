import React from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Language } from "@/types/language";

const LanguageList = () => {
  const state = useGlobalState();

  const handleToggle = (lang: Language) => {
    lang.selected = !lang.selected;
    const newItems = state.languages.map((item) => {
      return item.short === lang.short ? lang : item;
    });
    state.setLanguages(newItems);
  };

  return (
    <List dense className="overflow-y-auto">
      {state.languages.map((lang) => (
        <ListItem
          onClick={() => handleToggle(lang)}
          key={lang.short}
          secondaryAction={<Checkbox edge="end" checked={lang.selected} />}
          disablePadding
          className="text-black"
        >
          <ListItemButton>
            <ListItemText primary={lang.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default LanguageList;
