import React from "react";
import banner from "@/assets/banner.jpg";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center gap-1 bg-white px-4 pt-2 md:flex-row md:items-end md:justify-between">
      <img
        src={banner}
        alt="Faculty of Mechanical Engineering – HCMUTE"
        className="h-[120px]"
      />
    </header>
  );
};

export default Header;
