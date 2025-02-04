"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const SearchField = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [isSearching, setIsSearching] = useState(!!queryParam);
  const router = useRouter();

  useEffect(() => {
    setIsSearching(!!queryParam);
  }, [queryParam]);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: 1,
        position: "absolute",
        top: isSearching ? "10rem" : "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col items-center space-y-5 w-full px-2"
    >
      <h1 className="text-5xl text-center font-bold uppercase">Julevbágo</h1>
      <h2 className="text-md  text-center font-semibold">
        Julevbágo samler digitale samiske språkressurser på en plass
      </h2>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="block w-3/4 md:w-1/2 2xl:w-1/3 rounded-full bg-white font-bold px-4 py-3.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
          placeholder="Søk i julevbágo..."
        />
      </form>
    </motion.div>
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`?q=${query}`);
  }
};

export default SearchField;
