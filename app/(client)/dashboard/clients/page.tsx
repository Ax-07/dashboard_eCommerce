// app/client/dashboard/clients/page.tsx
"use client";

import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Separator } from "@/src/components/ui/separator";
import React from "react";

const ClientsPage = () => {
  return (
    <DashboardShell>
      <section className="w-full px-8">
        <div className="flex justify-between items-center mb-4">
          <h1>Clients page</h1>
        </div>
        <Separator className="mb-4 bg-gradient" />
      </section>
      <div className="grid gap-4 p-4">
        <p>Aucun client pour le moment.</p>
      </div>
    </DashboardShell>
  );
};

export default ClientsPage;
