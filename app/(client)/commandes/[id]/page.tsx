// @/app/%28client%29/commandes/%5Bid%5D/page.tsx
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import OrderDetail from "@/src/blocks/order/OrderDetails";
import { ORDERS } from "@/src/mock";
import React from "react";

interface OrderDetailPageProps {
  params: { id: string };
}
const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ params }) => {
  const orderId = params.id; // Utiliser l'ID de la commande pour récupérer les détails de la commande
  const order = ORDERS.find((order) => order.id === orderId);
  if (!order) {
    return <div>Commande non trouvée</div>;
  }

  return (
    <DashboardShell>
      <section
        id="commande-details"
        className="relative flex-1 justify-between flex flex-col gap-4 p-4 w-full max-w-[1280px] mx-auto"
      >
        <OrderDetail order={order} />
      </section>
    </DashboardShell>
  );
};

export default OrderDetailPage;
