import React from "react";
import Catalogue from "@/src/blocks/produits/catalogue/Catalogue";
import { Skeleton } from "@/src/components/ui/skeleton";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";

const CataloguePage: React.FC = () => {
  return (
    <DashboardShell>
      <div className="flex flex-col flex-1 p-4">
        {/* <div className="grid grid-cols-3 gap-4 w-full h-40 mb-4">
          <div className="bg-muted rounded-md"></div>
          <div className="bg-muted rounded-md"></div>
          <div className="bg-muted rounded-md"></div>
        </div> */}
        <Catalogue />
      </div>
    </DashboardShell>
  );
};

export default CataloguePage;
