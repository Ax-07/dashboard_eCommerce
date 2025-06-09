import { useMemo } from 'react';
import { ProductOutput } from '../lib/validators/product.zod';

interface StockProps {
    products: ProductOutput[];
}

export const useStocks = ({products}: StockProps) => {
    if (!products || !Array.isArray(products)) {
        throw new Error("Invalid products array");
    }
    /**
     * Filtre les produits pour ne garder que ceux qui sont en stock.
     * Un produit est considéré en stock s'il a une quantité supérieure à 0.
     * @param products - Tableau de produits à filtrer
     *  @return Tableau de produits en stock
     */
    const inStock = useMemo(() => {
        return products.filter(product => product.stock && product.stock.quantity > 0);
    }, [products]);

    /**
     * Filtre les produits pour ne garder que ceux qui sont en rupture de stock.
     * Un produit est considéré en rupture de stock s'il n'a pas de stock ou si la quantité est égale à 0.
     * @param products - Tableau de produits à filtrer
     * @return Tableau de produits en rupture de stock
     */
    const outOfStock = useMemo(() => {
        return products.filter(product => !product.stock || product.stock.quantity === 0);
    }, [products]);

    /**
     * Filtre les produits pour ne garder que ceux qui sont en stock faible.
     * Un produit est considéré en stock faible s'il a une quantité inférieure ou égale à 10.
     * @param products - Tableau de produits à filtrer
     * @return Tableau de produits en stock faible
     */
    const lowStock = useMemo(() => {
        return products.filter(product => product.stock && product.stock.quantity <= 10);
    }, [products]);

    /**
     * Filtre les produits pour ne garder que ceux qui sont en stock élevé.
     * Un produit est considéré en stock élevé s'il a une quantité supérieure à 10.
     * @param products - Tableau de produits à filtrer
     * @return Tableau de produits en stock élevé
     */
    const highStock = useMemo(() => {
        return products.filter(product => product.stock && product.stock.quantity > 10);
    }, [products]);
    
    return {
        inStock,
        outOfStock,
        lowStock,
        highStock
    };
}