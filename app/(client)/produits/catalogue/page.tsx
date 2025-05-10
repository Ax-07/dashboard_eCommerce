import React from "react";
import Catalogue from "@/src/blocks/produits/catalogue/Catalogue";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";

const CataloguePage: React.FC = () => {
  return (
    <DashboardShell>
      <section id="catalogue" className="relative flex-1 justify-between flex flex-col p-4">
        <Catalogue />
      </section>
    </DashboardShell>
  );
};

export default CataloguePage;
