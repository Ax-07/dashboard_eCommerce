// @/src/components/custom/charts/Multi-Line-Chart.tsx
"use client";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  CustomLegend,
} from "@/src/components/ui/chart";
import { useIsMobile } from "@/src/hooks/use-mobile";
import { ChartData } from "./useChartsDatas";
import { useChartStore } from "@/src/stores/useChartStore";
interface MultiLineChartProps {
  id: string;
  chartData: ChartData[];
  chartConfig: ChartConfig;
}
// Helper: get last value of a key in data array
export function getLastValue(data: ChartData[], key: keyof ChartData): number {
  for (let i = data.length - 1; i >= 0; i--) {
    const val = data[i][key];
    if (typeof val === "number") {
      return val;
    }
  }
  return 0;
}
const MultiLineChart: React.FC<MultiLineChartProps> = ({ id, chartData, chartConfig }) => {
  const isMobile = useIsMobile();
  const stored = useChartStore((s) => s.hiddenKeysByChart[id]);
  const hiddenKeys = stored ?? []; // fallback en local, hors selector
  const toggleKey = useChartStore((s) => s.toggleKey);

  // Trier dynamiquement les clés pour que la série avec la plus grande valeur apparaisse au-dessus
  const sortedKeys = React.useMemo<(keyof typeof chartConfig)[]>(() => {
    const keys = Object.keys(chartConfig) as (keyof typeof chartConfig)[];
    return keys.sort((a, b) => getLastValue(chartData, a) - getLastValue(chartData, b));
  }, [chartData, chartConfig]);

  return (
    <ChartContainer config={chartConfig}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => new Date(value).toLocaleDateString("fr-FR", { month: "short" })}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            value.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })
          }
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => new Date(value).toLocaleDateString("fr-FR")}
              indicator="dot"
            />
          }
        />

        <ChartLegend
          verticalAlign="bottom"
          content={(props) => (
            <CustomLegend
              {...props}
              config={chartConfig}
              hiddenKeys={hiddenKeys}
              onToggleKey={(key) => toggleKey(id, key)}
            />
          )}
        />

        {sortedKeys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={String(key)}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              stroke: `var(--color-${key})`,
              strokeWidth: 2,
              fill: "white",
            }}
            hide={hiddenKeys.includes(String(key))}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default MultiLineChart;
