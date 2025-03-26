"use client";
import { motion } from "framer-motion";
import LocalResultItem from "./LocalResultItem";
import { LocalTranslations } from "@/types/localTranslations";

interface Props {
  results: LocalTranslations[];
  query: string;
}

const LocalResultList = (props: Props) => {
  if (props.results.length === 0) return <></>;
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
      style={{ marginTop: "15.5rem" }}
      className="flex flex-col items-center w-full md:w-2/3 2xl:w-1/2"
    >
      {props.results.map((result) => (
        <LocalResultItem key={result.id} result={result} query={props.query} />
      ))}
    </motion.ul>
  );
};

export default LocalResultList;
