import { Nav } from "@/components/Nav";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { adminNavItems } from "@/navigation/routes";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav navItems={adminNavItems} />
      <PageBreadcrumb />
      <div className="container my-6">{children}</div>
    </>
  );
}
