// app/(client)/dashboard/layout.tsx
import { AppSidebar } from "@/src/blocks/dashboardBlocks/app-sidebar";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import StoreProvider from "@/src/stores/storesProvider";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <StoreProvider>
        <SidebarProvider>
          <AppSidebar />
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          {children}
        </SidebarProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
