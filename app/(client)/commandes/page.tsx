import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import OrderList from "@/src/blocks/order/OrderList";
import React from "react";

const CommandePage = () => {
  return (
    <DashboardShell>
      <section id="commandes" className="relative flex-1 justify-between flex flex-col p-4">
        <OrderList />
      </section>
    </DashboardShell>
  );
}

export default CommandePage;
