import React from "react";
import StatistiqueVente from "@/src/blocks/ventes/StatistiqueVente";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { getTestGenerator } from "@/src/stores/actions/getTestGenerator";

const CAPage = () => {
 const data = getTestGenerator().then((data) => {
   return data;
  }).catch((error) => {
   console.error("Error fetching data:", error);
   return { value: '{"Order": []}' }; // Fallback to empty data if error occurs
  }
 );
  return (
    <DashboardShell>
      <section
        id="catalogue"
        className="relative flex-1 flex flex-col w-full p-4 items-center"
      >
        <StatistiqueVente data={data}/>
      </section>
    </DashboardShell>
  );
};

export default CAPage;
