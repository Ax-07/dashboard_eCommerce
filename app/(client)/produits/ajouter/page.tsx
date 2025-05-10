import { ProductForm } from "@/src/blocks/produits/addProduct/ProductForm";
import React from "react";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";

const AjouterPage: React.FC = () => {
  return (
    <DashboardShell>
      <ProductForm className="w-full"/>
    </DashboardShell>
  );
};

export default AjouterPage;
