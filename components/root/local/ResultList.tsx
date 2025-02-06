"use client";
import { motion } from "framer-motion";
import ResultItem from "./ResultItem";
interface Props {
  results: any[];
}

const ResultList = (props: Props) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
      className="flex flex-col items-center mt-64"
    >
      {props.results.map((result) => (
        <ResultItem key={result.id} result={result} />
      ))}
    </motion.ul>
  );
};

export default ResultList;
