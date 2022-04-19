import React from "react";

function Greetings({ name }: { name: string }) {
  return (
    <>
      <h1 className="text-3xl text-themeBlack font-medium">
        Welcome!{" "}
        <span className="text-5xl text-themeBlackLight font-light">{name}</span>
      </h1>
    </>
  );
}

export default Greetings;
