// @/src/components/custom/charts/pie-chart.tsx
"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  CustomLegend,
} from "@/src/components/ui/chart";
import { PieChartData } from "./useChartsDatas";
import { useChartStore } from "@/src/stores/useChartStore";

interface PieChartProps {
  id: string;
  chartData: PieChartData[];
  chartConfig: ChartConfig;
  total?: number;
}

export const PieChartComponent: React.FC<PieChartProps> = ({ id, chartData, chartConfig, total = 0 }) => {

  if (!chartData || chartData.length === 0) {
    return <div>Pas de données disponibles</div>;
  }

  return (
    <ChartContainer config={chartConfig}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={70} strokeWidth={6}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-base font-bold">
                      {total} €
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                      Total
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
            <ChartTooltip
    cursor={false}
    content={<ChartTooltipContent hideLabel />}
  />
        <ChartLegend
          verticalAlign="bottom"
          content={(props) => (
            <CustomLegend
              {...props}
              config={chartConfig}
            />
          )}
        />
      </PieChart>
    </ChartContainer>
  );
};