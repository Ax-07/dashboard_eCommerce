import React from 'react';
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";

const ProductPage: React.FC = () => {
    return (
        <DashboardShell>
            <section>
                <div className="relative flex-1 justify-between flex flex-col p-4">
                    <h1 className="text-2xl font-bold">Gestion des Produits</h1>
                    <p className="text-gray-500">Ajoutez, modifiez ou supprimez des produits.</p>
                </div>
                {/* Ajoutez ici le contenu de votre page produit */}
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Liste des Produits</h2>
                    {/* Vous pouvez ajouter un tableau ou une liste de produits ici */}
                    <p className="text-gray-500">Aucun produit trouvé.</p>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Ajouter un Produit</h2>
                    {/* Vous pouvez ajouter un formulaire pour ajouter un produit ici */}
                    <p className="text-gray-500">Formulaire d'ajout de produit à venir.</p>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Modifier un Produit</h2>
                    {/* Vous pouvez ajouter un formulaire pour modifier un produit ici */}
                    <p className="text-gray-500">Formulaire de modification de produit à venir.</p>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Supprimer un Produit</h2>
                    {/* Vous pouvez ajouter un formulaire pour supprimer un produit ici */}
                    <p className="text-gray-500">Formulaire de suppression de produit à venir.</p>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold">Statistiques des Produits</h2>
                    {/* Vous pouvez ajouter des graphiques ou des statistiques ici */}
                    <p className="text-gray-500">Statistiques à venir.</p>
                </div>
            </section>
        </DashboardShell>
    );
};

export default ProductPage;