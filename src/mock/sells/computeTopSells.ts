// @/src/mock/sells/computeTopSells.ts
"use client";

// types
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
}

interface OrderInput {
  items: OrderItem[];
  // … autres champs ignorés
}

export interface BestSeller {
  productId: string;
  productName: string;
  totalQuantity: number;
  totalSales: number;
}

/**
 * Calcule les meilleurs ventes.
 * @param orders – tableau de commandes
 * @param topN    – nombre de produits à retourner (défaut : 10)
 * @param by      – critère de classement : "sales" (CA) ou "quantity" (quantité)
 */
export function getBestSellingProducts(
  orders: OrderInput[],
  topN: number = 10,
  by: "sales" | "quantity" = "sales"
): BestSeller[] {
  // 1️⃣ On agrège les données par produit
  const agg: Record<string, BestSeller> = {};

  for (const order of orders) {
    for (const item of order.items) {
      const { productId, productName, quantity, totalPrice } = item;
      if (!agg[productId]) {
        agg[productId] = {
          productId,
          productName,
          totalQuantity: 0,
          totalSales: 0,
        };
      }
      agg[productId].totalQuantity += quantity;
      agg[productId].totalSales   += totalPrice;
    }
  }

  // 2️⃣ On convertit en tableau et on trie selon le critère
  const sorted = Object.values(agg).sort((a, b) => {
    if (by === "sales") {
      return b.totalSales - a.totalSales;
    } else {
      return b.totalQuantity - a.totalQuantity;
    }
  });

  // 3️⃣ On retourne les top N
  return sorted.slice(0, topN);
}
