import { Nav } from "@/components/Nav";
import { adminNavItems } from "@/utils/navigation";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav navItems={adminNavItems} />
      <div className="container my-6">{children}</div>
    </>
  );
}
