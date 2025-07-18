"use client";
import React from "react";
import DictionaryList from "./DictionaryList";
import { Button, DialogTitle, Dialog, Slide, IconButton } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DictionaryMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <MenuBookIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="dictionary-list"
        TransitionComponent={Transition}
      >
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          Tilgjengelige ordbøker
        </DialogTitle>
        <DictionaryList />
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

export default DictionaryMenu;
