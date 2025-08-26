"use client";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DivvunTermArticle from "./DivvunTermArticle";
import DivvunDictArticle from "./DivvunDictArticle";

interface Props {
  item: string;
  name: string;
  expanded: string | false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}

const DivvunResultItem = (props: Props) => {
  const handleChange = () => {
    props.setExpanded(props.expanded === props.name ? false : props.name);
  };

  return (
    <Accordion
      expanded={props.expanded === props.name}
      onChange={handleChange}
      className="w-full border border-gray-300 overflow-x-hidden"
      sx={{ backgroundColor: "#f0f0f0" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <p className="font-bold text-gray-700">{props.item}</p>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col space-y-4">
        <DivvunTermArticle
          expanded={props.expanded}
          name={props.name}
          item={props.item}
        />
        <DivvunDictArticle
          expanded={props.expanded}
          name={props.name}
          item={props.item}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default DivvunResultItem;
