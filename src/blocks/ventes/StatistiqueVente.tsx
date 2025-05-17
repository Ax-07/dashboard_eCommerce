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

const StatistiqueVente = () => {
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
          <div className="flex flex-1 gap-4">
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
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle> Top Ventes</CardTitle>
          </CardHeader>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Suivi des commandes</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default StatistiqueVente;
