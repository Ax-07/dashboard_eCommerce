import { PRODUCTS } from "@/src/mock";
import { BestSeller } from "@/src/mock/sells/computeTopSells";
import { cn } from "@/src/utils/tailwind_cn";
import React from "react";

interface TopSellsListProps {
  bestSeller: BestSeller[];
  className?: string;
  title?: string;
  description?: string;
}
const TopSellsList: React.FC<TopSellsListProps> = ({ bestSeller, className }) => {
  const products = PRODUCTS.find((p) => p.id === bestSeller[0]?.productId);
  return (
    <div className={cn("", className)}>
      {bestSeller.length > 0 && (
        <div className="flex flex-col gap-4">
          <ul className="space-y-2">
            {bestSeller.map((item) => (
              <li key={item.productId} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-2">
                  <img
                    src={products?.media?.[0]?.url}
                    alt={item.productName}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{item.productName}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">Quantité: {item.totalQuantity}</span>
                  <span className="text-lg font-bold">{item.totalSales.toFixed(2)} €</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopSellsList;
