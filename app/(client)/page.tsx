"use client";

import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";
import React from "react";


export default function Home() {
  const { session } = useAuth();

  if (!session || !session.user) return (
    <DashboardShell>
      <section className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
        <Button variant={"outline"} className="w-full" asChild>
          <Link href="/auth">Se connecter</Link>
        </Button>
      </section>
    </DashboardShell>
  );
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
