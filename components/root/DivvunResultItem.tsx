"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGlobalState } from "../GlobalContext";

interface Props {
  item: string;
}

const DivvunResultItem = (props: Props) => {
  const state = useGlobalState();
  const [data, setData] = React.useState(undefined);
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setExpanded(!expanded);
    if (expanded) return;

    setLoading(true);
    const res = await fetch("/api/divvun/lookup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lemma: props.item,
        langs: [
          "sma",
          "sme",
          "smj",
          "smn",
          "sms",
          "fin",
          "nob",
          "swe",
          "lat",
          "eng",
          "nno",
          "rus",
        ],
        operationName: "termArticles",
      }),
    });
    const data = await res.json();
    setData(data);
    setLoading(false);
    console.log(data);
    console.log(props.item);
  };

  return (
    <Accordion expanded={expanded} className="w-full" onClick={handleClick}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <p className="font-bold">{props.item}</p>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <Box className="flex justify-center">
            <CircularProgress size="1rem" />
          </Box>
        ) : (
          <div>
            Lorum ipsum dolor sit amet, consectetur adipiscing elit. Donec
            vehicula, enim nec fringilla faucibus, nunc ligula bibendum
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default DivvunResultItem;
