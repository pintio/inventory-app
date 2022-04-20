import React, { ReactChild } from "react";

import NavItem from "./NavItem";

const navArr: string[] = [
  "home",
  "stock",
  "reports",
  "recieve",
  "order",
  "warehouses",
  "masterList",
  "settings",
];

const NavBarComponent = function ({ children }: { children: ReactChild[] }) {
  return (
    <>
      <div className="py-6 h-screen fixed w-32 flex flex-wrap content-between bg-primary">
        <div className="w-full text-center">logo</div>
        <div className="flex flex-wrap items-center content-center text-center">
          {children}
        </div>
        <div className="w-full text-center">@pintio</div>
      </div>
    </>
  );
};

const NavBar = function () {
  return (
    <NavBarComponent>
      {navArr.map((navItem) => {
        return <NavItem itemName={navItem} />;
      })}
    </NavBarComponent>
  );
};

export default NavBar;
