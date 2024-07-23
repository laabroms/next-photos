"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ReactElement } from "react";
import { titleCase } from "@/utils/format";

export const PageBreadcrumb = (): ReactElement => {
  const paths = usePathname();

  const pathnames = paths.split("/").filter((path) => path);

  return (
    <div className="container mt-4">
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames.length > 0 && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            if (index === pathnames.length - 1) {
              return (
                <BreadcrumbPage key={index}>
                  {titleCase(pathname)}
                </BreadcrumbPage>
              );
            }
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={routeTo}>
                    {titleCase(pathname)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
