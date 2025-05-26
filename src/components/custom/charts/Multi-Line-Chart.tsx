// @/src/components/custom/charts/Multi-Line-Chart.tsx
"use client";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
import { ChartData } from "./useChartsDatas";
interface MultiLineChartProps {
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
  title,
  description,
  chartData,
  chartConfig,
}) => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");
  const [selectedKey, setSelectedKey] = React.useState<
    keyof typeof chartConfig | "all"
  >("all");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  // Trier dynamiquement les clés pour que la série avec la plus grande valeur apparaisse au-dessus
  const sortedKeys = React.useMemo<(keyof typeof chartConfig)[]>(() => {
    const keys = Object.keys(chartConfig) as (keyof typeof chartConfig)[];
    return keys.sort(
      (a, b) => getLastValue(chartData, a) - getLastValue(chartData, b)
    );
  }, [chartData]);
  return (
    <Card className="@container/card h-full">
      <CardHeader className="relative">
        {/* <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            {description}
          </span>
          <span className="@[540px]/card:hidden">Last {timeRange}</span>
        </CardDescription> */}
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={String(selectedKey)}
            onValueChange={(val) =>
              setSelectedKey(val as keyof typeof chartConfig | "all")
            }
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="all" className="h-8 px-2.5 border cursor-pointer rounded-md">Toutes</ToggleGroupItem>
            {(Object.keys(chartConfig) as (keyof typeof chartConfig)[]).map(
              (key) => (
                <ToggleGroupItem key={key} value={String(key)} className="h-8 px-2.5 border cursor-pointer rounded-md">
                  {chartConfig[key].label}
                </ToggleGroupItem>
              )
            )}
          </ToggleGroup>
          <Select
            value={String(selectedKey)}
            onValueChange={(val) =>
              setSelectedKey(val as keyof typeof chartConfig | "all")
            }
            >
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all" className="rounded-lg">
                All
              </SelectItem>
              {(Object.keys(chartConfig) as (keyof typeof chartConfig)[]).map(
                (key) => (
                  <SelectItem key={key} value={String(key)}>
                    {chartConfig[key].label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData.length > 0 ?
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[150px] w-full"
          >
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
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("fr-FR", {
                    month: "short",
                    // day: "numeric",
                    // year: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  return value.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("fr-FR");
                    }}
                    indicator="dot"
                  />
                }
              />
                      <ChartLegend content={<ChartLegendContent />} />

              {sortedKeys
                .filter((key) => selectedKey === "all" || key === selectedKey)
                .map((key) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={`var(--color-${key})`}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 6,
                      stroke: `var(--color-${key})`,
                      strokeWidth: 2,
                      fill: "white",
                    }}
                  />
                ))}
            </LineChart>
          </ChartContainer>
          : (
            <div className="flex items-center justify-center text-muted-foreground">
              Pas de données disponibles
            </div>
          )
        }
      </CardContent>
    </Card>
  );
};

export default MultiLineChart;
