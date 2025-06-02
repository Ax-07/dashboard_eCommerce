import React from "react";

interface AverageOrderValueKPIProps {
  /** Valeur moyenne de la commande (en euros) */
  value: number;
  /** Nombre de commandes prises en compte dans le calcul (par défaut, livrées) */
  countOrders?: number;
  /** Étiquette de période, par ex. "30 derniers jours" ou "Aujourd'hui" */
  periodLabel?: string;
}
const AverageOrderValueKPI: React.FC<AverageOrderValueKPIProps> = ({
  value,
  countOrders = 0,
  periodLabel = "Période",
}) => {
  const averageCartValue = value / countOrders || 0;
  const totalCarts = countOrders;

  // Calcul du taux de complétion des paniers
  const cartCompletionRate = countOrders > 0 ? (value / countOrders) * 100 : 0;

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
      <h3 className="text-lg font-semibold">Valeur moyenne du panier</h3>
      <div className="text-2xl font-bold">
        {averageCartValue.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
      </div>
      <div className="text-sm">
        {periodLabel}: {totalCarts.toLocaleString()} paniers
      </div>
      {cartCompletionRate !== undefined && (
        <div className={`text-sm ${cartCompletionRate >= 80 ? "text-green-600" : "text-red-600"}`}>
          Taux de complétion des paniers: {cartCompletionRate.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default AverageOrderValueKPI;
