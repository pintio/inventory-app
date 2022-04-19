import React from "react";

function NavItem({ itemName }: { itemName: string }) {
  return (
    <>
      <div className="py-2 w-full">
        <span className="text-md text-themeWhite ">{itemName}</span>
      </div>
    </>
  );
}

export default NavItem;
