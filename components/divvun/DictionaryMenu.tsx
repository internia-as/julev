"use client";
import React from "react";
import DictionaryList from "./DictionaryList";
import {
  Button,
  DialogTitle,
  Dialog,
  Slide,
  IconButton,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useTranslations } from "next-intl";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DictionaryMenu = () => {
  const t = useTranslations("search");
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Tooltip title={t("select_dicts")} placement="top">
        <IconButton onClick={() => setOpen(true)}>
          <MenuBookIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="dictionary-list"
        TransitionComponent={Transition}
      >
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          {t("available_dicts")}
        </DialogTitle>
        <DictionaryList />
        <Button
          className="justify-center w-full"
          onClick={() => setOpen(false)}
        >
          {t("start_search")}!
        </Button>
      </Dialog>
    </React.Fragment>
  );
};

export default DictionaryMenu;
