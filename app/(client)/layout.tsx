import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/src/utils/tailwind_cn";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/src/components/themes/theme-provider";
import { ViewportLayout } from "next/dist/lib/metadata/types/extra-types";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/blocks/dashboardBlocks/app-sidebar";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Digital 07",
  description: "Digital 07 Portfolio",
  icons: "images/Frame 1668.png",
};

export const viewport: ViewportLayout = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased mx-auto relative"
        )}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
              <SidebarProvider>
                <AppSidebar />
                <Toaster
                  position="top-center"
                  toastOptions={{ duration: 2000 }}
                />
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
                  {children}
                </main>
              </SidebarProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
