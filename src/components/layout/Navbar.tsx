import React from "react";
import { menuData } from "@/dataSources/menu";

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 w-full bg-[#003A78] text-white shadow-md">
    <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-1 py-2 text-sm font-semibold uppercase">
      {menuData.map((item) => (
        <li
          key={item}
          className="cursor-pointer rounded-md px-3 py-1 transition-all hover:bg-blue-500 hover:text-yellow-200"
        >
          {item}
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
