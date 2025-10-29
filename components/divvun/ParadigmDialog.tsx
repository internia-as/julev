import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutline";
import React, { useEffect } from "react";
import { getColumn } from "@/lib/getColumn";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/umamiTrackEvents";

interface Body {
  lang: string;
  term: string;
  pos: string;
  type?: string;
}

interface Props {
  lang: string;
  word: string;
  pos: string;
  label?: string;
}

const ParadigmDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [paradigms, setParadigms] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const t = useTranslations("divvun");

  let body: Body = {
    lang: props.lang,
    term: props.word,
    pos: props.pos,
  };

  useEffect(() => {
    body.type = "init";
    fetchData(true);
  }, []);

  const fetchData = async (init: boolean) => {
    const res = await fetch(`/api/divvun/paradigms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.data?.generated) {
      if (init && data.data.generated.length > 0) {
        setDisabled(false);
      }
      return data.data.generated;
    }
  };

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    const generated = await fetchData(false);
    setParadigms(generated.map((item: any) => item.analyses));
    setLoading(false);
    trackEvent("Open paradigm dialog", {
      language: props.lang,
    });
  };

  const getTableHead = () => {
    if (props.pos === "N") {
      return ["Sg", "Pl"];
    }
    if (props.pos === "V") {
      return ["Present", "Perfectum"];
    }
    if (props.pos === "A") {
      return ["Positive", "Comparative", "Superlative"];
    }
    return [];
  };
  const getTableBody = () => {
    // Split paradigms into chunks of size 2
    const chunks = [];
    for (let i = 0; i < paradigms.length; i += 2) {
      chunks.push(paradigms.slice(i, i + 2));
    }
    // Map through chunks and render rows
    return chunks.map((chunk: any, index: number) => (
      <TableRow key={index}>
        {/* Column 1: Index or other content */}
        <TableCell className="underline">
          {" "}
          {getColumn(index, props.pos, props.lang)}
        </TableCell>

        {/* Column 2: Analyses for first paradigm in the chunk */}
        <TableCell>
          {chunk[0].map((analysis: any, i: number) => (
            <p key={i}>{analysis.wordform}</p>
          ))}
        </TableCell>

        {/* Column 3: Analyses for second paradigm in the chunk (if it exists) */}
        <TableCell>
          {chunk[1]?.map((analysis: any, i: number) => (
            <p key={i}>{analysis.wordform}</p>
          ))}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <Tooltip
        title={disabled ? t("paradigm_not_available") : t("show_paradigms")}
      >
        <span>
          {props.label ? (
            <MenuItem onClick={handleOpen} disabled={disabled} dense>
              <InfoIcon fontSize="small" />
              <Typography variant="subtitle2" className="px-4">
                {props.label}
              </Typography>
            </MenuItem>
          ) : (
            <IconButton
              onClick={handleOpen}
              disabled={disabled}
              color="primary"
              size="small"
            >
              <InfoIcon />
            </IconButton>
          )}
        </span>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle className="bg-blue-700 text-center text-white font-medium">
          {t("paradigm")}
        </DialogTitle>
        <DialogContent>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <CircularProgress size={24} />
            </div>
          )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold"></TableCell>
                {getTableHead()?.map((head) => (
                  <TableCell key={head}>
                    <p className="text-black font-bold">{head}</p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{getTableBody()}</TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParadigmDialog;
