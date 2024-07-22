import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import NavLink from "./NavLink";
import { NavProps } from "./Nav";

export const NavSheet = ({ navItems }: NavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] max-w-full">
        <nav className="grid gap-4 mt-6">
          {navItems.map((item) => (
            <SheetClose asChild key={item.label}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
