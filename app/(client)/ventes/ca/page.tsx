import React from "react";
import StatistiqueVente from "@/src/blocks/ventes/StatistiqueVente";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";

const CAPage = () => {
  return (
    <DashboardShell>
      <section
        id="catalogue"
        className="relative flex-1 flex flex-col w-full p-4 items-center"
      >
        <StatistiqueVente />
      </section>
    </DashboardShell>
  );
};

export default CAPage;
