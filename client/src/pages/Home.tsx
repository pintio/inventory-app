import React from "react";
import NavItem from "../components/navigation/NavItem";
import NavBar from "../components/navigation/NavBar";
import Greetings from "../components/homeComponents/Greetings";

const HomePage = function () {
  return (
    <>
      <main className=" w-auto h-16 flex">
        <NavBar>
          <NavItem itemName="lolol" />
          <NavItem itemName="lolololol" />
        </NavBar>
        <div className="w-full h-screen bg-themeWhite container px-16 lg:px-36 flex flex-col justify-evenly">
          <Greetings name="pintio" />
          <div className="flex flex-row gap-4 flex-wrap">
            <div className=" w-56 h-40 border rounded"></div>
            <div className=" w-56 h-40 border rounded"></div>
            <div className=" w-56 h-40 border rounded"></div>
            <div className=" w-56 h-40 border rounded"></div>
            <div className=" w-56 h-40 border rounded"></div>
            <div className=" w-56 h-40 border rounded"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
