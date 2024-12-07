'use client';

// import { NavbarProps } from "@/types";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import NavigationItems from "./NavigationItems";
import { menuItems } from "./menuItems";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
      <nav
        className="flex flex-row z-0 items-center justify-between border-white w-full"
      >
        <div>
          <Logo setMobileMenuOpen={setMobileMenuOpen} />
        </div>
        <NavigationItems menuItems={menuItems}/>
      </nav>
  );
}
