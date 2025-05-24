"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import React from "react";
import BarChartArea from "@/src/components/custom/charts/BarChartArea";
import { ChartAreaInteractive } from "@/src/components/custom/charts/chart-area-interactive";
import { chartData, chartConfig } from "@/src/components/custom/charts/chart-area-interactive";
import MultiLineChart from "@/src/components/custom/charts/Multi-Line-Chart";
import { PieChartComponent } from "@/src/components/custom/charts/pie-chart";
import { ALLSELLS } from "@/src/mock/sells/monthly_sales";
import { useChartsDatas } from "@/src/components/custom/charts/useChartsDatas";
import OrderList from "../order/OrderList";
import { ORDERS } from "@/src/mock";
import { getComputeSells } from "@/src/mock/sells/computeSells";
import { getBestSellingProducts } from "@/src/mock/sells/computeTopSells";
import TopSellsList from "./TopSellsList";

interface StatistiqueVenteProps {
  data: any;
}

const StatistiqueVente: React.FC<StatistiqueVenteProps> = ({data}) => {
  const parsedData = JSON.parse(data.value);
  const orders2 = parsedData.Order; console.log("orders2", orders2);
  const sellsbycategorybydate = getComputeSells({ Order: orders2 });
  const { chartData, chartConfig, total, pieChartData } = useChartsDatas({
    data: sellsbycategorybydate,
    startDate: sellsbycategorybydate[0].date,
    endDate: sellsbycategorybydate[sellsbycategorybydate.length - 1].date,
  });
  const bestSeller = getBestSellingProducts(orders2, 5);
  return (
    <div className="w-full">
      <div className="flex gap-4">
        {/* Graphiques Chiffre d'affaires */}
        <div className="flex-1">
            {/* <BarChartArea venteTotalMenuel={venteTotalMenuel} chartConfig={chartConfig} /> */}
            {/* <ChartAreaInteractive /> */}
            <MultiLineChart 
              title="Volumes quotidiens par catégorie" 
              description="Évolution quotidienne des ventes sur les 3 derniers mois"
              chartData={chartData} 
              chartConfig={chartConfig} 
            />
        </div>
        <div className="flex flex-col flex-1 gap-4 h-full">
            <PieChartComponent
              title="Répartition des ventes par catégorie"
              description="Répartition des ventes sur les 3 derniers mois"
              chartData={pieChartData}
              chartConfig={chartConfig}
              total={total}
              />
          {/* <div className="flex flex-1 gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>CA total</CardTitle>
                <CardDescription>Sur les 12 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <p>1000 €</p>

              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardTitle>Total</CardTitle>
            </Card>
          </div>
          <div className="flex gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>CA total</CardTitle>
              </CardHeader>
            </Card>
            <Card className="flex-1"></Card>
          </div> */}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle> Top Ventes</CardTitle>
            <CardDescription>Produits les plus vendus</CardDescription>
            <TopSellsList bestSeller={bestSeller} />
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Suivi des commandes</CardTitle>
            <OrderList orders={orders2}/>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default StatistiqueVente;
