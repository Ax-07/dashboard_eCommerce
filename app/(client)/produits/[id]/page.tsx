import React from "react";

interface ProductByIdPageProps {
  params: { id: string };
}

const ProductByIdPage: React.FC<ProductByIdPageProps> = ({ params }) => {
  const productId = params.id; // Utiliser l'ID du produit pour récupérer les détails du produit
  return (
    <section>
      <h1>Détails du produit</h1>
      <p>Cette page affiche les détails d'un produit spécifique.</p>
    </section>
  );
};

export default ProductByIdPage;
