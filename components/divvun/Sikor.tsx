import { IconButton, Tooltip } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

interface Props {
  language: string;
  lemma: string;
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
    fetchData();
  }, [props.language, props.lemma]);

  const redirectToSikor = () => {
    const cqp = `[lemma = "${props.lemma}"]`;
    let query = new URLSearchParams({
      cqp: cqp, // Will be URL-encoded automatically
      search_tab: "1",
      within: "sentence",
      search: "cqp",
    });
    const url = `${BASE_URL}${props.language}/#?${query.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
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
        <IconButton disabled={hits === 0} onClick={() => redirectToSikor()}>
          <FormatAlignJustifyIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default Sikor;
