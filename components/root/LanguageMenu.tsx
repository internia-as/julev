"use client";
import React from "react";
import { Button, Dialog, DialogTitle, IconButton, Slide } from "@mui/material";
import { useGlobalState } from "../../hooks/useGlobalState";
import TranslateIcon from "@mui/icons-material/Translate";
import { TransitionProps } from "@mui/material/transitions";
import LanguageList from "./LanguageList";

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
      >
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          Tilgjengelige Språk
        </DialogTitle>
        <LanguageList />
        <Button
          className="justify-center w-full"
          onClick={() => setOpen(false)}
        >
          Begynn å søk!
        </Button>
      </Dialog>
    </React.Fragment>
  );
};

export default LanguageMenu;
