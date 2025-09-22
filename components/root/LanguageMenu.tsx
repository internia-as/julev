"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  Tooltip,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { TransitionProps } from "@mui/material/transitions";
import LanguageList from "./LanguageList";
import { useTranslations } from "next-intl";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LanguageMenu = () => {
  const t = useTranslations("search");
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Tooltip title={t("select_langs")} placement="top">
        <IconButton onClick={() => setOpen(true)}>
          <TranslateIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="language-list"
        TransitionComponent={Transition}
      >
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          {t("available_langs")}
        </DialogTitle>
        <LanguageList />
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

export default LanguageMenu;
