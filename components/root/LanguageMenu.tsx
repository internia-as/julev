"use client";
import React from "react";
import { Dialog, IconButton, Slide } from "@mui/material";
import { useGlobalState } from "../GlobalContext";
import TranslateIcon from "@mui/icons-material/Translate";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LanguageMenu = () => {
  const state = useGlobalState();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <TranslateIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="language-list"
        TransitionComponent={Transition}
      ></Dialog>
    </React.Fragment>
  );
};

export default LanguageMenu;
