import { Nav } from "@/components/Nav";
import { userNavItems } from "@/utils/navigation";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav navItems={userNavItems} />
      <div className="container my-6">{children}</div>
    </>
  );
}
