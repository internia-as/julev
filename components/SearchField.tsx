"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input, InputAdornment } from "@mui/material";
import DictionaryMenu from "./divvun/DictionaryMenu";
import LanguageMenu from "./root/LanguageMenu";
import { useGlobalState } from "../hooks/useGlobalState";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  subtitle: string;
}

const SearchField = (props: Props) => {
  const pathname = usePathname();
  const state = useGlobalState();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const t = useTranslations("search");

  const getAdornment = () => {
    if (pathname === "/divvun") {
      return (
        <InputAdornment position="end">
          <DictionaryMenu />
          <LanguageMenu />
        </InputAdornment>
      );
    }
    return (
      <InputAdornment position="end">
        <button
          type="button"
          onClick={() => appendSpecialChars("á")}
          className="hidden px-4 py-2 mx-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-full md:block hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          á
        </button>
        <button
          type="button"
          onClick={() => appendSpecialChars("ŋ")}
          className="px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          ŋ
        </button>
      </InputAdornment>
    );
  };

  const appendSpecialChars = (char: string) => {
    const position =
      (document.getElementById("searchfield") as HTMLInputElement | null)
        ?.selectionStart ?? 0;
    const textBeforeCursorPosition = query.substring(0, position);
    const textAfterCursorPosition = query.substring(position, query.length);
    setQuery(textBeforeCursorPosition + char + textAfterCursorPosition);
  };

  const getPlaceholder = () => {
    if (pathname === "/divvun") {
      return t("search_field_placeholder") + "Divvun";
    }
    return t("search_field_placeholder") + "Julev";
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
            {t(props.title)}
          </h1>
          <h2 className="text-md  text-center font-semibold">
            {t(props.subtitle)}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center w-full">
          <div className="w-full flex justify-center px-1 relative">
            <Input
              id="searchfield"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={getPlaceholder()}
              className="bg-white h-12 text-md px-4 w-full md:w-3/4 2xl:w-1/2 py-2.5 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-slate-600"
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
