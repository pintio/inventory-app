import React from "react";

const PopUp = function ({
  visibility,
  children,
}: {
  visibility: boolean;
  children: JSX.Element;
}): JSX.Element {
  return (
    <div
      className={`w-screen h-screen absolute left-0 top-0 flex items-center justify-center backdrop-blur-sm backdrop-opacity-80 backdrop-saturate-150 ${
        visibility ? "" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export default PopUp;
