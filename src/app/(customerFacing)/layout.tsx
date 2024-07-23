import { Nav } from "@/components/Nav";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { userNavItems } from "@/navigation/routes";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav navItems={userNavItems} />
      <PageBreadcrumb />
      <div className="container my-6">{children}</div>
    </>
  );
}
