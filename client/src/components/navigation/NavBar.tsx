import React, { ReactChild } from "react";
import { NavLink, Outlet } from "react-router-dom";

type navObj = {
  link: string;
  title: string;
};

const navArr: navObj[] = [
  { link: "", title: "home" },
  { link: "lol", title: "stock" },
  { link: "reports", title: "reports" },
  { link: "master list", title: "master list" },
  { link: "Settings", title: "Settings" },
];

const NavBarComponent = function ({ children }: { children: ReactChild[] }) {
  return (
    <>
      <div className="py-6 h-screen fixed w-32 flex flex-wrap content-between bg-primary">
        <div className="w-full text-center">logo</div>
        <nav className="flex flex-wrap items-center content-center text-center">
          {children}
        </nav>
        <Outlet />
        <div className="w-full text-center">@pintio</div>
      </div>
    </>
  );
};

const NavBar = function () {
  return (
    <NavBarComponent>
      {navArr.map((navItem) => {
        return (
          <NavLink
            to={`/${navItem.link}`}
            className={({ isActive }) => {
              return `${
                isActive
                  ? "text-lg font-semibold text-secondary "
                  : "text-md text-themeWhite hover:bg-pink-500"
              } py-2 w-full`;
            }}
          >
            {navItem.title}
          </NavLink>
        );
      })}
    </NavBarComponent>
  );
};

export default NavBar;
