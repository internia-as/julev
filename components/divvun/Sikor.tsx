import { IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/umamiTrackEvents";

interface Props {
  language: string;
  lemma: string;
  enable?: () => void;
  redirect?: boolean;
  label?: string;
  hits?: number;
}

const SUPPORTED_LANGUAGES = ["sme", "sma", "smj", "smn", "sms"];
const BASE_URL = process.env.NEXT_PUBLIC_SIKOR_URL;

const Sikor = (props: Props) => {
  if (!SUPPORTED_LANGUAGES.includes(props.language)) {
    return <div className="w-10"></div>; // Return null if the language is not supported
  }
  const [hits, setHits] = React.useState(0);
  const t = useTranslations("search");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/sikor?language=${props.language}&lemma=${props.lemma}`
      );
      if (response.ok) {
        const data = await response.json();
        setHits(data.hits);
      }
    };
    if (props.hits === undefined) {
      fetchData();
    } else {
      setHits(Number(props.hits) || 0);
    }
  }, [props.language, props.lemma]);

  const redirectToSikor = () => {
    let lemma = props.lemma;
    lemma = lemma.split(" ")[0];
    lemma = lemma.split(",")[0];
    const cqp = `[lemma = "${lemma}"]`;
    let query = new URLSearchParams({
      cqp: cqp, // Will be URL-encoded automatically
      search_tab: "1",
      within: "sentence",
      search: "cqp",
    });
    const url = `${BASE_URL}${props.language}/#?${query.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
    trackEvent("Open sikor link");
  };

  const getTooltipText = () => {
    if (hits > 0) {
      return t("found") + " " + hits + " " + t("hits_in_sikor");
    }
    return t("no_results", { lemma: props.lemma });
  };

  return (
    <Tooltip title={getTooltipText()}>
      <span>
        {props.label ? (
          <MenuItem
            disabled={hits === 0}
            dense
            onClick={() => redirectToSikor()}
          >
            <FormatAlignJustifyIcon fontSize="small" />
            <Typography variant="subtitle2" className="px-4">
              {props.label}
            </Typography>
          </MenuItem>
        ) : (
          <IconButton disabled={hits === 0} onClick={() => redirectToSikor()}>
            <FormatAlignJustifyIcon />
          </IconButton>
        )}
      </span>
    </Tooltip>
  );
};

export default Sikor;
