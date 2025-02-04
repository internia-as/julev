"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Tabs from "./Tabs";
import { Tab } from "@/types/components";

const SearchField = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q") || "";
  const [tabs, setTabs] = useState<Tab[]>([
    { name: "Julev", active: true },
    { name: "Divvun", active: false },
    { name: "Kartverket", active: false },
  ]);
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
        position: "absolute",
        top: isSearching ? "10rem" : "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col items-center space-y-5 w-full"
    >
      <h1 className="text-5xl text-center font-bold uppercase">Julevbágo</h1>
      <h2 className="text-md  text-center font-semibold">
        Julevbágo samler digitale samiske språkressurser på en plass
      </h2>

      <Tabs
        tabs={tabs}
        updateTabs={(newTab) => setTabs((prevTabs) => [...prevTabs, newTab])}
      />
      <form onSubmit={handleSubmit} className="flex justify-center w-full">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="rounded-b-xl  bg-white w-full md:w-2/3 2xl:w-1/2 px-4 py-3.5 text-base outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
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
