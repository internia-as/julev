"use client";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { RefObject } from "react";
import LocalResultItem from "./LocalResultItem";
import { LocalTranslations } from "@/types/localTranslations";

interface Props {
  results: LocalTranslations[];
  query: string;
  loading?: boolean;
  hasMore?: boolean;
  totalCount?: number;
  loadingRef?: RefObject<HTMLDivElement | null>;
}

const LocalResultList = ({
  results,
  query,
  loading = false,
  hasMore = false,
  totalCount = 0,
  loadingRef,
}: Props) => {
  if (results.length === 0 && !loading) {
    return (
      <div
        className="flex flex-col items-center w-full md:w-3/4 2xl:w-1/2"
        style={{ marginTop: "20.5rem" }}
      >
        Ingen resultat
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
      style={{ marginTop: "16.75rem" }}
      className="flex flex-col items-center w-full md:w-3/4 2xl:w-1/2"
    >
      {/* Results count */}
      {totalCount > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          Viser {results.length} av {totalCount} resultat
        </div>
      )}

      {/* Results list */}
      <ul className="w-full">
        {results.map((result) => (
          <LocalResultItem
            key={result.id as number}
            result={result}
            query={query}
          />
        ))}
      </ul>

      {/* Loading indicator and intersection observer target */}
      {hasMore && (
        <div
          ref={loadingRef}
          className="flex justify-center items-center w-full py-8"
        >
          {loading && <CircularProgress size={24} />}
        </div>
      )}

      {/* End of results message */}
      {!hasMore && results.length > 0 && (
        <div className="text-center text-gray-500 py-4">
          Ingen flere resultat
        </div>
      )}
    </motion.div>
  );
};

export default LocalResultList;
