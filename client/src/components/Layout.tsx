import React, { ReactChild } from "react";

import NavBar from "../components/navigation/NavBar";

function Layout({
  children,
}: {
  children: ReactChild | ReactChild[];
}): JSX.Element {
  return (
    <main className=" w-full bg-themeWhite  flex">
      <NavBar />
      <div className="w-full h-full  container ml-32 px-4 md:px-16 py-8 lg:px-36 flex flex-col justify-evenly">
        {children}
      </div>
    </main>
  );
}

export default Layout;
