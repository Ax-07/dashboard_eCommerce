// @/src/mock/sells/computeSells.ts
"use client";

import { ChartData } from "@/src/components/custom/charts/useChartsDatas";
import { OrderInput } from "@/src/lib/validators/order.zod";
import { PRODUCTS } from "..";

// 1️⃣ Déclarations des types

export interface SalesByDate extends ChartData {}

// 2️⃣ Mapping des préfixes aux champs du résultat (sans “date”)
const categoryMap = {
  fleur:    "fleurs",
  resine:   "resines",
  huile:    "huiles",
  eliquide: "eliquides",
} as const;

// 3️⃣ Fonction principale, avec typage de l’entrée et de la sortie
/**
 * Calcule les ventes par date à partir des données d'ordres.
 * @param data 
 * @returns 
 * Renvoie un tableau de ventes par date, trié par date.
 * Chaque entrée contient la date et les totaux par catégorie.
 * Exemple de sortie :
 * ```json
 * [
 *   { "date": "01/01/2025", "fleurs": 632, "resines": 0, "huiles": 0, "eliquides": 0 },
 *   { "date": "02/01/2025", "fleurs": 0, "resines": 100, "huiles": 50, "eliquides": 200 },
 *  ... * ]
 */
export const getComputeSells = (
  data: { Order: OrderInput[] }
): SalesByDate[] => {

  if (!data || !data.Order || !Array.isArray(data.Order)) {
    console.warn("Données invalides pour le calcul des ventes :", data);
    return [];
  }
  const intermediate = data.Order.reduce<Record<string, SalesByDate>>(
    (acc, order) => {
      // 1) Formatage de la date
      const date = new Date(order.updatedAt).toISOString().split("T")[0];

      // 2) Initialisation
      if (!acc[date]) {
        acc[date] = {
          date: date,
          fleurs: 0,
          resines: 0,
          huiles: 0,
          eliquides: 0,
        };
      }

      // 3) Agrégation
      for (const item of order.items) {
        const prod = PRODUCTS.find(p => p.id === item.productId);
        if (!prod) {
          console.warn("Produit inconnu :", item.productId);
          continue;
        }
        const catKey = prod.category?.id?.toLowerCase() as keyof typeof categoryMap;
        if (!catKey ) {
          console.warn("Catégorie inconnue :", prod.category?.id);
          continue;
        }
        acc[date][catKey] = (acc[date][catKey] as number) + item.totalPrice;
      }

      return acc;
    },
    {} as Record<string, SalesByDate>
  );

  return Object.values(intermediate).sort((a, b) =>
    // Sur "DD-MM-YYYY", un simple localeCompare tient lieu de tri chrono
    a.date.localeCompare(b.date)
  );
};

// [0 … 99]
// 0
// : 
// date: "01/01/2025"
// eliquides: 0
// fleurs: 632
// huiles: 0
// resines: 0