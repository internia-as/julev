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

        <div onClick={() => state.setDictMenuOpen(true)} className="flex space-x-2 w-32">
          <div className="rounded-full p-2 hover:bg-slate-700 cursor-pointer transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <div className="rounded-full p-2 hover:bg-slate-700 cursor-pointer transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
