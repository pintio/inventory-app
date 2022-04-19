import React, { ReactChild } from "react";

const NavBar = function ({ children }: { children: ReactChild[] }) {
  return (
    <>
      <div className="px-6 py-6 w-min h-screen flex flex-wrap content-between bg-primary">
        <div className="w-full text-center">logo</div>
        <div className="flex flex-wrap items-center content-center">
          {children}
        </div>
        <div className="w-full text-center">@pintio</div>
      </div>
    </>
  );
};

export default NavBar;
