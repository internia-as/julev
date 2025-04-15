"use client";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DivvunTermArticle from "./DivvunTermArticle";

interface Props {
  item: string;
}

const DivvunResultItem = (props: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [item, setItem] = React.useState("");

  const handleClick = async () => {
    setExpanded(!expanded);
    if (!expanded && !item) {
      setItem(props.item);
    }
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
        <DivvunTermArticle item={item} />
      </AccordionDetails>
    </Accordion>
  );
};

export default DivvunResultItem;
