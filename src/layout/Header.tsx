import React from "react";
import { FaTrello } from "react-icons/fa";

function Header() {
  return (
    <header className="w-dvw min-h-[48px] bg-background-primary text-white">
      <div className="h-full w-full flex items-center justify-between px-4">
        <div className="flex gap-1 items-center">
          <FaTrello size={22}/>
          <span className="text-lg font-bold">Trello</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
