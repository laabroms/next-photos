"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded transition",
        pathname === props.href &&
          "text-active hover:text-active focus-visible:text-active"
      )}
    />
  );
};

export default NavLink;
