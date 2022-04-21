import React from "react";

import NavBar from "../components/navigation/NavBar";
import Greetings from "../components/homeComponents/Greetings";
import QuickLinks from "../components/homeComponents/QuickLinks";
import NavigationTileCoponents from "../components/homeComponents/NavigationTileComponent";

const HomePage = function () {
  return (
    <>
      <main className=" w-full bg-themeWhite  flex">
        <NavBar />
        <div className="w-full h-full  container ml-32 px-16 py-8 lg:px-36 flex flex-col justify-evenly">
          <Greetings name="pintio" />
          <QuickLinks />
          <NavigationTileCoponents />
        </div>
      </main>
    </>
  );
};

export default HomePage;
