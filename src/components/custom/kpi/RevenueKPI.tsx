import React from "react";

interface RevenueKPIProps {
  totalRevenue?: number;
  variation?: number;
  period?: string; // Optional, can be used to display the period of the KPI
  // e.g., "daily", "weekly", "monthly", etc.
}
const RevenueKPI: React.FC<RevenueKPIProps> = ({ totalRevenue, variation, period }) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
      <h3 className="text-lg font-semibold">Chiffre d'affaires</h3>
      <div className="text-2xl font-bold">
        {totalRevenue ? totalRevenue.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }) : "0,00 €"}
      </div>
      {variation !== undefined && (
        <div className={`text-sm ${variation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          Variation: {variation >= 0 ? '+' : ''}{variation.toFixed(2)}% {period ? `(${period})` : ''}
        </div>
      )}
    </div>
  );
};

export default RevenueKPI;
