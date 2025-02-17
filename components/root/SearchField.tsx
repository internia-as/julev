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
  ]);
  const [query, setQuery] = useState(queryParam);
  const [isSearching, setIsSearching] = useState(!!queryParam);
  const router = useRouter();

  useEffect(() => {
    setIsSearching(!!queryParam);
  }, [queryParam]);

  const updateTabs = (newTab: Tab) => {
    const newTabs = tabs.map((tab) => {
      if (tab.name === newTab.name) {
        return { ...tab, active: true };
      }
      return { ...tab, active: false };
    });
    setTabs(newTabs);
  };

  return (
    <div>
      <motion.div
        initial={false}
        animate={{
          position: "absolute",
          top: isSearching ? "12rem" : "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col space-y-5 py-5 px-2 sm:px-0">
          <h1 className="text-5xl text-center font-bold uppercase">Julevbágo</h1>
          <h2 className="text-md  text-center font-semibold">
            Julevbágo samler digitale samiske språkressurser på en plass
          </h2>
        </div>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Tabs tabs={tabs} updateTabs={updateTabs} />
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="flex px-4 sm:px-0  justify-center w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="rounded-xl  bg-white h-16 text-lg px-4 w-full md:w-2/3 2xl:w-1/2 py-3.5 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
            placeholder="Søk i julevbágo..."
          />
        </form>
      </motion.div>
    </div>
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`?q=${query}`);
  }
};

export default SearchField;
