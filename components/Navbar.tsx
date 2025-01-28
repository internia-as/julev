import React from "react";

const Navbar = () => {
  return (
    <>
      <ul className="flex h-14 fixed justify-center items-center space-x-10 p-4 bg-gray-800 text-white w-full">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </>
  );
};

export default Navbar;
