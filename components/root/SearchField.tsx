"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input, InputAdornment } from "@mui/material";
import DictionaryMenu from "./DictionaryMenu";
import LanguageMenu from "./LanguageMenu";
import { useGlobalState } from "../GlobalContext";
import { useTranslations } from "next-intl";

const SearchField = () => {
  const state = useGlobalState();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const t = useTranslations("search");

  const getAdornment = () => {
    return (
      <InputAdornment position="end">
        <DictionaryMenu />
        <LanguageMenu />
      </InputAdornment>
    );
  };

  useEffect(() => {
    state.setQuery("");
  }, []);

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
        <div className="flex text-black flex-col space-y-5 py-5 px-2 sm:px-0">
          <h1 className="text-5xl text-center font-bold uppercase">
            {t("header")}
          </h1>
          <h2 className="text-md  text-center font-semibold">
            {t("header_subtitle")}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex px-4 sm:px-0  justify-center w-full"
        >
          <div className="w-full flex justify-center relative">
            <Input
              id="input-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Søk i julevbágo..."
              className="  bg-white h-12 text-md px-4 w-full md:w-2/3 2xl:w-1/2 py-2.5 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-slate-600"
              endAdornment={getAdornment()}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query === "") return;
    state.setQuery(query);
    setIsSearching(true);
  }
};

export default SearchField;
