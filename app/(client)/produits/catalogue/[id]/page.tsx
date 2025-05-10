import React from "react";
import { PRODUCTS } from "@/src/mock";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { ProductForm } from "@/src/blocks/produits/addProduct/ProductForm";
interface ProductByIdPageProps {
  params: { id: string };
}

const ProductByIdPage: React.FC<ProductByIdPageProps> = ({ params }) => {
  const productId = params.id; // Utiliser l'ID du produit pour récupérer les détails du produit
  const product = PRODUCTS.find((product) => product.id === productId);
  if (!product) {
    return <p>Produit non trouvé</p>;
  }
  return (
    <DashboardShell>
      <section>
        <ProductForm productByID={product} />
      </section>
    </DashboardShell>
  );
};

export default ProductByIdPage;
