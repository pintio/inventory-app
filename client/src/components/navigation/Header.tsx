import React from "react";

import UserIcon from "../svg/UserIcon";
import SettingIcon from "../svg/SettingIcon";

function Header({ className }: { className: string }): JSX.Element {
  return (
    <header className={`z-50 fixed flex gap-2 justify-end ${className}`}>
      <SettingIcon />
      <UserIcon />
    </header>
  );
}

export default Header;
