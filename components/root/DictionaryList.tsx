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
  const [items, setItems] = useState<Dictionary[]>([]);

  useEffect(() => {
    setItems(dictionaries.filter((dict) => dict.type === state.mode));
  }, [state.mode]);

  const handleToggle = (dict: Dictionary) => {
    console.log(dict);
  };

  return (
    <List dense className="max-h-96 overflow-y-auto">
      {items.map((dict) => {
        return (
          <ListItem
            key={dict.short}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => handleToggle(dict)}
                checked={dict.selected}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={dict.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DictionaryList;
