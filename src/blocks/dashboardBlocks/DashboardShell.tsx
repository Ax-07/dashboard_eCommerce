// ✅ src/components/dashboard/DashboardShell.tsx
"use client"

import {
  SidebarInset,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/src/components/ui/breadcrumb";
import { Separator } from "@/src/components/ui/separator";
import { usePathname } from "next/navigation";
import React from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) ?? [];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;
                const label = decodeURIComponent(segment)
                  // .replace(/-/g, " ") // remplace les tirets par des espaces
                  // .replace(/_/g, " ") // remplace les underscores par des espaces
                  .replace(/\b\w/g, (l) => l.toUpperCase()); // met la première lettre de chaque mot en majuscule

                return (
                  <React.Fragment key={href}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {children}
    </SidebarInset>
  );
}
