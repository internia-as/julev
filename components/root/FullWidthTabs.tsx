import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useGlobalState } from "../GlobalContext";

const FullWidthTabs = () => {
  const state = useGlobalState();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    state.setMode(newValue === 0 ? "julev" : "divvun");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-2/3 2xl:w-1/2">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            className="bg-slate-700"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Julev" />
            <Tab label="Divvun" />
          </Tabs>
        </AppBar>
      </div>
    </div>
  );
};

export default FullWidthTabs;
