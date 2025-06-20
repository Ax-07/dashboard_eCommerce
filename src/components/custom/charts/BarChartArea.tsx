import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  CustomLegend,
  type ChartConfig,
} from "@/src/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartData } from "./useChartsDatas";
import { useChartStore } from "@/src/stores/useChartStore";

interface BarChartAreaProps {
  id: string;
  chartData: ChartData[];
  chartConfig: ChartConfig;
    tickFormatter: (value: string) => string;
}

const BarChartArea: React.FC<BarChartAreaProps> = ({ id, chartData, chartConfig, tickFormatter }) => {
  const entries = Object.entries(chartConfig) as Array<[string, { label: string; color: string }]>;
  const stored = useChartStore((s) => s.hiddenKeysByChart[id]);
  const hiddenKeys = stored ?? []; // fallback en local, hors selector
  const toggleKey = useChartStore((s) => s.toggleKey);

  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
  tickFormatter={tickFormatter}
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

        {entries.map(([key, { label, color }]) => (
          <Bar
            key={key}
            dataKey={key} // ← on passe la clé de la propriété dans chartData
            name={label}
            fill={color}
            stackId="a"
            hide={hiddenKeys.includes(key)} // ← on cache la barre si la clé est dans hiddenKeys
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartArea;
