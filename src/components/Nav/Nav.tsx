import { ROUTES } from "@/navigation/routes";
import Image from "next/image";
import Link from "next/link";
import { NavSheet } from "./NavSheet";
import { NavItem } from "./types";
import NavLink from "./NavLink";

export type NavProps = {
  navItems: NavItem[];
};

const Nav = ({ navItems }: NavProps) => {
  return (
    <header className="py-2">
      <div className="container flex justify-between items-center">
        <Link href={ROUTES.HOME.PATH}>
          <Image
            src="/assets/logo-dark.png"
            alt="Lucas Abroms Photography"
            width={50}
            height={50}
          />
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavSheet navItems={navItems} />
      </div>
    </header>
  );
};

export default Nav;
