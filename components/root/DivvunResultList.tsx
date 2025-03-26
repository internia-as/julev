"use client";
import { motion } from "framer-motion";
import { DivvunSearch } from "@/types/divvun";
import React from "react";
import DivvunResultItem from "./DivvunResultItem";

interface Props {
  results: DivvunSearch | undefined;
  query: string;
}

const DivvunResultList = (props: Props) => {
  if (!props.results) return <></>;
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
      style={{ marginTop: "15.5rem" }}
      className="flex flex-col items-center w-full md:w-2/3 2xl:w-1/2"
    >
      {props.results.stems.map((result) => (
        <DivvunResultItem item={result} />
      ))}
    </motion.ul>
  );
};

export default DivvunResultList;
