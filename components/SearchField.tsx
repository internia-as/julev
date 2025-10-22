"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconButton, Input, InputAdornment, Tooltip } from "@mui/material";
import DictionaryMenu from "./divvun/DictionaryMenu";
import LanguageMenu from "./root/LanguageMenu";
import { useGlobalState } from "../hooks/useGlobalState";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SwapVertIcon from "@mui/icons-material/SwapVert";

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
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer to trigger search after 1000ms of no changes
    debounceTimer.current = setTimeout(() => {
      if (newValue.trim() !== "") {
        handleSubmitDebounced(newValue);
      }
    }, 1000);
  };

  const handleSubmitDebounced = (searchQuery: string) => {
    if (searchQuery === "" || searchQuery.length < 2) return;
    state.setQuery(searchQuery);
    setIsSearching(true);
  };

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
        <Tooltip title={state.direction}>
          <IconButton onClick={swapDirection}>
            <SwapVertIcon />
          </IconButton>
        </Tooltip>
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

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const getStyle = (tab: string) => {
    // current path
    const path = pathname === "/divvun" ? "divvun" : "julev";
    return tab === path
      ? "bg-slate-900 text-white py-2 flex-1 text-center underline"
      : "text-gray-300 hover:bg-slate-600 hover:text-gray-100 py-2 flex-1 text-center";
  };

  const swapDirection = () => {
    const newDirection = state.direction === "sm" ? "nob" : "sm";
    state.setDirection(newDirection);
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query === "") return;
    state.setQuery(query);
    setIsSearching(true);
  }

  return (
    <div>
      <motion.div
        initial={false}
        animate={{
          position: "absolute",
          top: isSearching ? "13rem" : "50%",
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
          <h2 className="text-md  italic text-center font-semibold">
            {t(props.subtitle)}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center w-full">
          <div className="w-full flex flex-col justify-center items-center px-1 relative">
            <div className="flex justify-between w-full md:w-3/4 2xl:w-1/2 bg-slate-600 text-white font-bold h-11 items-center">
              <Link className={getStyle("julev")} href={"/"}>
                Lulesamisk søk
              </Link>
              <Link className={getStyle("divvun")} href={"/divvun"}>
                Samisk søk
              </Link>
            </div>
            <Input
              id="searchfield"
              value={query}
              onChange={handleChange}
              placeholder={getPlaceholder()}
              className="bg-white h-12 text-md px-4 w-full md:w-3/4 2xl:w-1/2 p-2.5 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-slate-600"
              endAdornment={getAdornment()}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SearchField;
