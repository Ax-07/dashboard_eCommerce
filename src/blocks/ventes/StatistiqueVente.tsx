"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const venteTotalMenuel = [
  { month: "Jan", total: 1000 },
  { month: "Feb", total: 2000 },
  { month: "Mar", total: 3000 },
  { month: "Apr", total: 4000 },
  { month: "May", total: 5000 },
  { month: "Jun", total: 6000 },
  { month: "Jul", total: 7000 },
  { month: "Aug", total: 8000 },
  { month: "Sep", total: 9000 },
  { month: "Oct", total: 10000 },
  { month: "Nov", total: 11000 },
  { month: "Dec", total: 12000 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const StatistiqueVente = () => {
  return (
    <div className="w-full">
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Chiffre d'affaire</CardTitle>
            <CardDescription>Sur les 12 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={venteTotalMenuel}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  dataKey={"total"}
                  hide={false}
                  axisLine={false}
                  tickLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
                {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="flex flex-col flex-1 gap-4 h-full">
          <div className="flex flex-1 gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>CA total</CardTitle>
              </CardHeader>
            </Card>
            <Card className="flex-1"></Card>
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
