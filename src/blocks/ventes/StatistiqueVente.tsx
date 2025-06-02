"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import React from "react";
import BarChartArea from "@/src/components/custom/charts/BarChartArea";
import MultiLineChart from "@/src/components/custom/charts/Multi-Line-Chart";
import { PieChartComponent } from "@/src/components/custom/charts/pie-chart";
import { useChartsDatas } from "@/src/components/custom/charts/useChartsDatas";
import OrderList from "../order/OrderList";
import { getBestSellingProducts } from "@/src/mock/sells/computeTopSells";
import TopSellsList from "./TopSellsList";
import { DatePickerWithRange } from "@/src/components/custom/range-date-picker";

interface StatistiqueVenteProps {
  data: any;
}

const StatistiqueVente: React.FC<StatistiqueVenteProps> = ({ data }) => {
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1), to: new Date(),
  });

  const parsedData = JSON.parse(data.value);
  const orders = parsedData?.Order;

  const {
    chartData, // les données du graphique
    pieChartData, // les données du graphique en camembert
    chartConfig, // la configuration du graphique
    tickFormatter, // la fonction de formatage des dates pour l'axe X
    sellsbycategorybydate, // les ventes par catégorie et par date
    totalSell, // le chiffre d'affaires total
    totalSellByCategory, // le chiffre d'affaires par catégorie
    totalOrders, // le nombre total de commandes
    totalOrdersByCategories, // le nombre total de commandes par catégorie
    uniqueCustomers, // le nombre de clients uniques
    trendsByCategory, // les tendances par catégorie
    globalTrendPercent, // la tendance globale en pourcentage
    totalTransactionsByStatus, // le nombre total de transactions par statut
    totalOrdersByCategory, // le nombre total de commandes par catégorie
    averageOrderValue, // la valeur moyenne des commandes
    sells, // les ventes totales (daily, weekly, monthly, quarterly, yearly)
  } = useChartsDatas({
    orders: orders,
    dateRange,
  });

  const bestSeller = getBestSellingProducts(orders, 10);
  return (
    <div className="w-full">
      <DatePickerWithRange
        className="ml-auto mb-4"
        date={dateRange}
        onChange={(r) => {if (r.from && r.to) setDateRange({ from: r.from, to: r.to });}}
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
                {totalSell.toLocaleString("fr-FR", {style: "currency", currency: "EUR"})}
              </div>
              <div className="text-sm text-gray-500">
                {globalTrendPercent.yearly >= 0 ? (
                  <span className="text-green-600">+{globalTrendPercent.yearly}%</span>
                ) : (
                  <span className="text-red-600">{globalTrendPercent.yearly}%</span>
                )}{" "}
                par rapport à l'année précédente
              </div>
              <div className="text-sm text-gray-500">
                {globalTrendPercent.quarterly >= 0 ? (
                  <span className="text-green-600">+{globalTrendPercent.quarterly}%</span>
                ) : (
                  <span className="text-red-600">{globalTrendPercent.quarterly}%</span>
                )}{" "}
                par rapport au trimestre précédent
              </div>
              <div className="text-sm text-gray-500">
                {globalTrendPercent.monthly >= 0 ? (
                  <span className="text-green-600">+{globalTrendPercent.monthly}%</span>
                ) : (
                  <span className="text-red-600">{globalTrendPercent.monthly}%</span>
                )}{" "}
                par rapport au mois précédent 
              </div>
              <div className="text-sm text-gray-500">
                {globalTrendPercent.weekly >= 0 ? (
                  <span className="text-green-600">+{globalTrendPercent.weekly}%</span>
                ) : (
                  <span className="text-red-600">{globalTrendPercent.weekly}%</span>
                )}{" "}
                par rapport à la semaine dernière
              </div>
              <div className="text-sm text-gray-500">
                {globalTrendPercent.daily >= 0 ? (
                  <span className="text-green-600">+{globalTrendPercent.daily}%</span>
                ) : (
                  <span className="text-red-600">{globalTrendPercent.daily}%</span>
                )}{" "}
                par rapport à la veille
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
              <div className="text-2xl font-bold">{totalOrders.toLocaleString("fr-FR")}</div>
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
              <div className="text-2xl font-bold">{uniqueCustomers.toLocaleString("fr-FR")}</div>
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
              <MultiLineChart
                id="multi-line-chart"
                chartData={chartData}
                chartConfig={chartConfig}
                tickFormatter={tickFormatter}
              />
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
              <BarChartArea
                id="bar-chart"
                chartData={chartData}
                chartConfig={chartConfig}
                tickFormatter={tickFormatter}
              />
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
