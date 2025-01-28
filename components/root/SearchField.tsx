"use client";
import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const SearchField = () => {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?q=${query}`);
  };

  return (
    <div className="hero flex flex-col space-y-10 shadow-md justify-center w-full items-center h-1/5 xl:h-1/4">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        className="flex flex-col space-y-5 text-center"
      >
        <h1 className="text-6xl font-bold uppercase">Julevbágo</h1>
        <h2 className="text-md  font-semibold">Julevbágo samler digitale samiske språkressurser på en plass</h2>
      </motion.div>
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="name"
          id="name"
          className="block w-1/4 rounded-full bg-white font-bold bg-white px-4 py-3.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="Søk i julevbágo..."
        />
      </form>
    </div>
  );
};

export default SearchField;
