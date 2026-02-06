"use client";

import React, { useState } from "react";
import { Menu, MenuItem, HoveredLink } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils/cn";

const NavBar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 flex justify-center",
      )}
    >
      <Menu setActive={setActive}>
        <div className="fixed top-10 inset-x-0 z-50 flex justify-center ">
          <div className="flex gap-6 rounded-full bg-blue-500 px-50 py-5 text-white ">
            <HoveredLink href="/">Home</HoveredLink>
            <HoveredLink href="/login">Login</HoveredLink>
            <HoveredLink href="/register">Sign Up</HoveredLink>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default NavBar;
