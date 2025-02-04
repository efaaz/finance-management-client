import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "../../lib/utils/utils";
import { Link } from "react-router";

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 shadow-xl border-slate-100 rounded-full",
        className
      )}
    >
      <Menu setActive={setActive}>
        <Link href="/web-dev">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <Link href="/Features">
          <MenuItem
            setActive={setActive}
            active={active}
            item="Features"
          ></MenuItem>
        </Link>
        <Link href="/Features">
          <MenuItem
            setActive={setActive}
            active={active}
            item="About Us"
          ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
