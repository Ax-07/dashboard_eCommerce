"use client";

import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";
import React from "react";
import { FaSpinner } from "react-icons/fa6";


export default function Home() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-foreground" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!session || !session.user) {
    return null;
  }

  return (
    <DashboardShell>
      <section className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <span className="flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </section>
    </DashboardShell>
  );
}
