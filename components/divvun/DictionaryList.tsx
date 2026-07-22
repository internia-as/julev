import React from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Dictionary } from "@/types/dictionary";

const DictionaryList = () => {
  const state = useGlobalState();

  const handleToggle = (dict: Dictionary) => {
    dict.selected = !dict.selected;
    const newItems = state.dictionaries.map((item) => {
      return item.short === dict.short ? dict : item;
    });
    state.setDictionaries(newItems);
  };

  return (
    <List dense className="overflow-y-auto" role="list" aria-label="Dictionary options">
      {state.dictionaries.map((dict) => (
        <ListItem
          key={dict.short}
          secondaryAction={<Checkbox edge="end" checked={dict.selected} />}
          disablePadding
          className="text-black"
        >
          <ListItemButton
            onClick={() => handleToggle(dict)}
            role="checkbox"
            aria-checked={dict.selected}
            aria-label={`${dict.title} ${dict.selected ? 'selected' : 'not selected'}`}
          >
            <ListItemText primary={dict.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DictionaryList;
