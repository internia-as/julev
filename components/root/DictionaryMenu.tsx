"use client";
import React from "react";
import { useGlobalState } from "../GlobalContext";

const DictionaryMenu = () => {
  const state = useGlobalState();

  if (!state.dictMenuOpen) return <></>;
  return <div>DictionaryMenu</div>;
};

export default DictionaryMenu;
