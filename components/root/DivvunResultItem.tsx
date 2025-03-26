"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  item: string;
}

const DivvunResultItem = (props: Props) => {
  const [item, setItem] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    console.log("Item changed", props.item);
  }, [props.item]);

  return (
    <Accordion
      sx={{
        background: "linear-gradient(to right, #ebf8ff, #ffffff, #ebf8ff)",
      }}
      expanded={expanded}
      onClick={() => setExpanded(true)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.item}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.item}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default DivvunResultItem;
