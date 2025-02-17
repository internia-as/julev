"use client";
import { motion } from "framer-motion";
import ResultItem from "./ResultItem";

interface Props {
  results: any[];
  query: string;
}

const ResultList = (props: Props) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
      style={{ marginTop: "16.5rem" }}
      className="flex flex-col items-center w-full md:w-2/3 2xl:w-1/2"
    >
      {props.results.map((result) => (
        <ResultItem key={result.id} result={result} query={props.query} />
      ))}
    </motion.ul>
  );
};

export default ResultList;
