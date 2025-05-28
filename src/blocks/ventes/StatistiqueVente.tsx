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
  const orders2 = parsedData?.Order;

  const sellsbycategorybydate = getComputeSells({ Order: orders2 });
  const { chartData, chartConfig, total, pieChartData } = useChartsDatas({
    data: sellsbycategorybydate,
    dateRange,
  });

  const bestSeller = getBestSellingProducts(orders2, 10);
  return (
    <div className="w-full">
      <DatePickerWithRange
        className="ml-auto mb-2"
        date={dateRange}
        onChange={(r) => {
          if (r.from && r.to) setDateRange({ from: r.from, to: r.to });
        }}
      />
      <div className="flex gap-4">
        {/* Graphiques Chiffre d'affaires par categories*/}
        <div className="flex-1">
          <MultiLineChart id="multi-line-chart" chartData={chartData} chartConfig={chartConfig} />
        </div>
        <div className="flex-1">
          <BarChartArea id="bar-chart" chartData={chartData} chartConfig={chartConfig} />
        </div>
        <div className="flex-1">
          <PieChartComponent id="pie-chart" chartData={pieChartData} chartConfig={chartConfig} total={total} />
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
            <OrderList orders={orders2} />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default StatistiqueVente;
