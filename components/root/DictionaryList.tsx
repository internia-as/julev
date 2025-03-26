import dictionaries from "@/lib/dictionaries";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../GlobalContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Dictionary } from "@/types/dictionaries";

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
    <List dense className="max-h-96 overflow-y-auto">
      {state.dictionaries.map(
        (dict) =>
          dict.type === state.mode && (
            <ListItem
              onClick={() => handleToggle(dict)}
              key={dict.short}
              secondaryAction={<Checkbox edge="end" checked={dict.selected} />}
              disablePadding
            >
              <ListItemButton>
                <ListItemText primary={dict.title} />
              </ListItemButton>
            </ListItem>
          )
      )}
    </List>
  );
};

export default DictionaryList;
