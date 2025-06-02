"use client";

import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { useAuth } from "@/src/hooks/useAuth";
import { Skeleton } from "@/src/components/ui/skeleton";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
import { DatePickerWithRange } from "@/src/components/custom/range-date-picker";
import { getTestGenerator } from "@/src/stores/actions/getTestGenerator";
import { useMetricsData } from "@/src/hooks/useMetricsData";
import RevenueKPI from "@/src/components/custom/kpi/RevenueKPI";
import OrdersKPI from "@/src/components/custom/kpi/OrdersKPI";
import CartsKPI from "@/src/components/custom/kpi/AverageOrderValueKPI";
import AverageOrderValueKPI from "@/src/components/custom/kpi/AverageOrderValueKPI";

export default function Home() {
  const { session, loading } = useAuth();
  const [orders, setOrders] = React.useState([]);
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });
  useEffect(() => {
    getTestGenerator()
      .then((data) => {
        console.log("Fetched data:", data);
        const orders = data?.Order || [];
        setOrders(orders);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const {
    totalRevenue,
    revenueByCategory,
    uniqueCustomers,
    totalOrders,
    totalOrdersByStatus,
    orderCompletionRate,
    averageOrderValue,
    globalTrend,
    trendByCategory,
    period,
  } = useMetricsData({ orders, dateRange });
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-foreground" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!session || !session.user) {
    return null;
  }

  return (
    <DashboardShell>
      <section className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full overflow-y-auto">
        <DatePickerWithRange
          className=""
          date={dateRange}
          onChange={(r) => {
            if (r.from && r.to) setDateRange({ from: r.from, to: r.to });
          }}
        />
        {/* Section 1: KPIs */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Indicateurs Clés (KPIs)</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Chiffre d’affaires */}
            <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
              <RevenueKPI totalRevenue={totalRevenue} variation={globalTrend[period]} period={period} />
            </div>
            {/* Nombre de commandes */}
            <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
              <OrdersKPI totalOrders={totalOrders} averageOrderValue={averageOrderValue} orderCompletionRate={orderCompletionRate} totalOrdersByStatus={totalOrdersByStatus}/>
            </div>
            {/* Panier moyen */}
            <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
              <AverageOrderValueKPI value={averageOrderValue} countOrders={totalOrders} periodLabel={period} />
            </div>
            {/* Taux de conversion */}
            <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
              <h3 className="text-sm font-medium text-secondary">Taux de conversion</h3>
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
            {/* Trafic global */}
            <div className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4">
              <h3 className="text-sm font-medium text-secondary">Trafic global</h3>
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 2: Graphiques de tendance */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Graphiques de tendance</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Évolution CA & Commandes */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Évolution CA & Commandes</h3>
              <Skeleton className="h-full w-full rounded-md" />
            </div>
            {/* Trafic par canal */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Trafic par canal</h3>
              <Skeleton className="h-full w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 3: Top-produits et catégories */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Top-produits & Catégories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Top-produits */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Top 10 produits vendus</h3>
              <Skeleton className="h-48 w-full rounded-md" />
            </div>
            {/* CA par catégorie */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">CA par catégorie</h3>
              <Skeleton className="h-48 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 4: Comportement clients */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Comportement Clients</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Taux d’abandon de panier */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Taux d’abandon de panier</h3>
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
            {/* Nouveaux vs Récurrents */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Nouveaux clients vs récurrents</h3>
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 5: Sources d’acquisition */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Sources d’acquisition</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Répartition par canaux */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Répartition par canaux</h3>
              <Skeleton className="h-36 w-full rounded-md" />
            </div>
            {/* Coût d’acquisition client */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Coût d’acquisition client (CAC)</h3>
              <Skeleton className="h-36 w-full rounded-md" />
            </div>
            {/* Autre indicateur (ex: ROI campagnes) */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">ROI campagnes</h3>
              <Skeleton className="h-36 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 6: Logistique & Stock */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Logistique & Stock</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Retours */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Nombre de retours & taux</h3>
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
            {/* Produits en rupture bientôt */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Produits à stock faible</h3>
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Section 7: Répartition géographique */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Répartition Géographique</h2>
          <div className="aspect-video rounded-xl bg-muted/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-secondary">Carte des ventes par région</h3>
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </div>

        {/* Section 8: Alertes & Résumé */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Alertes & Résumé</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Alertes */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Alertes importantes</h3>
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
            {/* Résumé texte */}
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-secondary">Résumé & recommandations</h3>
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
