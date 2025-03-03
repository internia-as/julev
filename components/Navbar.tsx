"use client";
import Link from "next/link";
import React from "react";
import { useGlobalState } from "./GlobalContext";

const Navbar = () => {
  const state = useGlobalState();
  return (
    <>
      <div className="flex h-14 fixed justify-between items-center p-4 bg-slate-800 text-white w-full z-20">
        <div className="w-32"></div>
        <ul className="font-semibold space-x-10">
          <Link href="/">Search</Link>
          <Link href="/statistics">Statistics</Link>
          <Link href="/translate">Translate</Link>
          <Link href="/app">App</Link>
          <Link href="/about">About</Link>
        </ul>
        <div>Språk</div>
      </div>
    </>
  );
};

export default Navbar;
