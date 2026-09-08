import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslations } from "next-intl";

const InfoDialog = () => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("translate.info");
  return (
    <div>
      <Tooltip title="Info">
        <IconButton onClick={() => setOpen(true)} color="primary" aria-label={t("title")}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)} aria-describedby="info-dialog-description">
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          {t("title")}
        </DialogTitle>
        <DialogContent id="info-dialog-description" className="my-4 flex flex-col space-y-4 text-sm">
          <p>{t("p1")}</p>
          <b>{t("about_translator")}</b>
          <p>{t("p2")}</p>
          <p>
            {t("p3")}{" "}
            <a
              className="text-blue-500 underline"
              href="http://sanit.oahpa.no/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neahttadigisánit.
            </a>
          </p>
          <p>
            {t("more_info")}{" "}
            <a
              className="text-blue-500 underline"
              href="https://giellatekno.uit.no/smilang.nob.html#:~:text=fra%20nordsamisk%20til%20norsk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Giellatekno
            </a>{" "}
            {t("pages")}.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InfoDialog;
