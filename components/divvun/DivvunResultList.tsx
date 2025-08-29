"use client";
import { motion } from "framer-motion";
import { DivvunSearch } from "@/types/divvun";
import React, { useEffect } from "react";
import DivvunResultItem from "./DivvunResultItem";
import { CircularProgress } from "@mui/material";

interface Props {
  results: DivvunSearch | undefined;
  query: string;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const DivvunResultList = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    if (props.results?.stems.length === 0) {
      props.setIsSearching(false);
      setExpanded(false);
    } else {
      props.setIsSearching(false);
      setExpanded("panel0");
    }
  }, [props.results]);

  if (props.results && props.results.totalItems === 0)
    return (
      <div
        className="flex flex-col items-center w-full md:w-3/4 2xl:w-1/2"
        style={{ marginTop: "20.5rem" }}
      >
        Ingen resultat
      </div>
    );
  if (props.isSearching) {
    return <CircularProgress style={{ marginTop: "20.5rem" }} />;
  }

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
      style={{ marginTop: "16.75rem" }}
      className="flex flex-col items-center px-1 w-full md:w-3/4 2xl:w-1/2"
    >
      {props.results?.stems.map((result, index) => (
        <DivvunResultItem
          key={index}
          name={"panel" + index}
          item={result}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </motion.ul>
  );
};
export default DivvunResultList;
