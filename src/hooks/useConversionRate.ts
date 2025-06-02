// @/src/hooks/useConversionRate.ts
import { useMemo } from "react";
import { OrderOutput } from "../lib/validators/order.zod";

interface UseConversionProps {
  orders: OrderOutput[];              // toutes commandes  
  visitors: number;                   // nombre de visiteurs sur la même plage  
}

export function useConversionRate({ orders, visitors }: UseConversionProps) {
  const completedOrders = useMemo(() => {
    return orders.filter(o => o.status === "delivered").length;
  }, [orders]);

  const rate = useMemo(() => {
    return visitors > 0 ? (completedOrders / visitors) * 100 : 0;
  }, [completedOrders, visitors]);

  return rate;
}
