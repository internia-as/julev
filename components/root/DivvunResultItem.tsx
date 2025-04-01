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
  const [data, setData] = React.useState("");

  const handleClick = async (e) => {
    const res = await fetch("/api/divvunLookup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: props.item,
      }),
    });
    const data = await res.json();
    setData(data);
    console.log(data);
    console.log(props.item);
  };

  return (
    <Accordion onChange={handleClick}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">{props.item}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
};

export default DivvunResultItem;
