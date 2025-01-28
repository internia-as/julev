import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <ul className="flex h-14 fixed justify-center items-center font-semibold space-x-10 p-4 bg-slate-800 text-white w-full">
        <Link href="/">Search</Link>
        <Link href="/statistics">Statistics</Link>
        <Link href="/translate">Translate</Link>
        <Link href="/app">App</Link>
        <Link href="/about">About</Link>
      </ul>
    </>
  );
};

export default Navbar;
