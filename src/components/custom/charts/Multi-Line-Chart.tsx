// @/src/components/custom/charts/Multi-Line-Chart.tsx
"use client";
import React, { useCallback, useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  CustomLegend,
  useChart,
} from "@/src/components/ui/chart";
import { useIsMobile } from "@/src/hooks/use-mobile";
import { ToggleGroup } from "../../ui/toggle-group";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ChartData, useChartState } from "./useChartsDatas";
import { useChartStore } from "@/src/stores/useChartStore";
interface MultiLineChartProps {
  id: string;
  title: string;
  description: string;
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
const MultiLineChart: React.FC<MultiLineChartProps> = ({
  id,
  title,
  description,
  chartData,
  chartConfig,
}) => {
  const isMobile = useIsMobile();
  const [selectedKey, setSelectedKey] = React.useState<
    keyof typeof chartConfig | "all"
  >("all");
  const stored = useChartStore(s => s.hiddenKeysByChart[id]);
  const hiddenKeys = stored ?? [];  // fallback en local, hors selector
  const toggleKey = useChartStore((s) => s.toggleKey);
  
  // Trier dynamiquement les clés pour que la série avec la plus grande valeur apparaisse au-dessus
  const sortedKeys = React.useMemo<(keyof typeof chartConfig)[]>(() => {
  const keys = Object.keys(chartConfig) as (keyof typeof chartConfig)[];
  return keys.sort(
    (a, b) => getLastValue(chartData, a) - getLastValue(chartData, b)
  )
}, [chartData, chartConfig]);

  return (
    <Card className="@container/card h-full">
      
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center text-muted-foreground">
            Pas de données disponibles
          </div>
        ) : (
          // 1) On ouvre le contexte
<ChartContainer config={chartConfig} className="aspect-auto h-[150px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("fr-FR", { month: "short" })
              }
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
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("fr-FR")
                  }
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

            {sortedKeys
              .filter((key) => selectedKey === "all" || key === selectedKey)
              .map((key) => (
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
        )}
      </CardContent>
    </Card>
  );
};

export default MultiLineChart;
