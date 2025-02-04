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

       

        <button className="inline-flex h-8 justify-end text-sm animate-shimmer items-center  rounded-xl ml-auto border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Sign Up
        </button>
      </Menu>
    </div>
  );
}

export default Navbar;
