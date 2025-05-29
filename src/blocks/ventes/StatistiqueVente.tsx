"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import React from "react";
import BarChartArea from "@/src/components/custom/charts/BarChartArea";
import MultiLineChart from "@/src/components/custom/charts/Multi-Line-Chart";
import { PieChartComponent } from "@/src/components/custom/charts/pie-chart";
import { useChartsDatas } from "@/src/components/custom/charts/useChartsDatas";
import OrderList from "../order/OrderList";
import { getComputeSells } from "@/src/mock/sells/computeSells";
import { getBestSellingProducts } from "@/src/mock/sells/computeTopSells";
import TopSellsList from "./TopSellsList";
import { DatePickerWithRange } from "@/src/components/custom/range-date-picker";
import { Order } from "@/generated/prisma";

interface StatistiqueVenteProps {
  data: any;
}

const StatistiqueVente: React.FC<StatistiqueVenteProps> = ({ data }) => {
  const [dateRange, setDateRange] = React.useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });


  const parsedData = JSON.parse(data.value);
  const orders = parsedData?.Order;

  const { chartData, chartConfig, pieChartData, tickFormatter, sellsbycategorybydate, totalSell, totalOrders, uniqueCustomers } = useChartsDatas({
    orders: orders,
    dateRange,
  });

  const bestSeller = getBestSellingProducts(orders, 10);
  return (
    <div className="w-full">
      <DatePickerWithRange
        className="ml-auto mb-4"
        date={dateRange}
        onChange={(r) => {
          if (r.from && r.to) setDateRange({ from: r.from, to: r.to });
        }}
      />
      {/* Statistiques et évolutions de chiffre d'affaire */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chiffre d'affaires</CardTitle>
              <CardDescription>Statistiques de ventes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalSell.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
              <CardDescription>Nombre de commandes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalOrders.toLocaleString("fr-FR")}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>Nombre de clients uniques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {uniqueCustomers.toLocaleString("fr-FR")}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Graphiques Chiffre d'affaires par categories*/}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chiffre d'affaires par jour</CardTitle>
              <CardDescription>Graphique des ventes par jour</CardDescription>
            </CardHeader>
            <CardContent>
              <MultiLineChart id="multi-line-chart" chartData={chartData} chartConfig={chartConfig} tickFormatter={tickFormatter} />
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chiffre d'affaires par catégorie</CardTitle>
              <CardDescription>Graphique des ventes par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartArea id="bar-chart" chartData={chartData} chartConfig={chartConfig} tickFormatter={tickFormatter} />
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Répartition des ventes</CardTitle>
              <CardDescription>Ventes par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChartComponent id="pie-chart" chartData={pieChartData} chartConfig={chartConfig} total={totalSell} />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Top vente et liste des dernières commandes */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle> Top Ventes</CardTitle>
            <CardDescription>Produits les plus vendus</CardDescription>
          </CardHeader>
          <CardContent>
            <TopSellsList bestSeller={bestSeller} />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Suivi des commandes</CardTitle>
            <CardDescription>Liste des commandes récentes</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderList orders={orders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatistiqueVente;
