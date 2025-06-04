import React from 'react';

interface OrdersKPIProps {
    // Define any props you need for the OrdersKPI component
    // For example, you might want to pass in total orders, average order value, etc.
    totalOrders?: number;
    totalOrdersByStatus?: Record<string, number>; // Optional, can be used to display orders by status
    orderCompletionRate?: number; // Percentage of completed orders
    period?: string; // Optional, can be used to display the period of the KPI
}

const OrdersKPI: React.FC<OrdersKPIProps> = ({
    totalOrders,
    totalOrdersByStatus,
    orderCompletionRate,
    period, // Optional, can be used to display the period of the KPI
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
      <h3 className="text-lg font-semibold">Commandes</h3>
      <div className="text-2xl font-bold">
        {totalOrders ? totalOrders.toLocaleString() : "0"} commandes
      </div>
        {totalOrdersByStatus && (
            <div className="text-sm">
                <strong>Statut des commandes:</strong>
                <ul className="list-disc pl-5">
                    {Object.entries(totalOrdersByStatus).map(([status, count]) => (
                        <li key={status}>
                            {status}: {count.toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        )}
        {period && (
            <div className="text-sm">
            Période: {period}
            </div>
        )}
      {orderCompletionRate !== undefined && (
        <div className={`text-sm ${orderCompletionRate >= 80 ? 'text-green-600' : 'text-red-600'}`}>
          Taux de complétion des commandes: {orderCompletionRate.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default OrdersKPI;