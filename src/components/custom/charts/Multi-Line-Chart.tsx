"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

interface ChartData {
  [key: string]: string | number | Date;
}

interface MultiLineChartProps {
  title: string;
  description: string;
  chartData: ChartData[];
  chartConfig: {
    [key: string]: {
      label: string;
      color: string;
    };
  };
}
// Helper: get last value of a key in data array
function getLastValue(data: ChartData[], key: keyof ChartData): number {
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
      console.log("isMobile");
    }
  }, [isMobile]);
  // Filtrer les données selon la période sélectionnée
  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return chartData.filter((item) => new Date(item.date) >= startDate);
  }, [timeRange]);

  // Trier dynamiquement les clés pour que la série avec la plus grande valeur apparaisse au-dessus
  const sortedKeys = React.useMemo<(keyof typeof chartConfig)[]>(() => {
    const keys = Object.keys(chartConfig) as (keyof typeof chartConfig)[];
    return keys.sort(
      (a, b) => getLastValue(filteredData, a) - getLastValue(filteredData, b)
    );
  }, [filteredData]);
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            {description}
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup
            type="single"
            value={String(selectedKey)}
            onValueChange={(val) =>
              setSelectedKey(val as keyof typeof chartConfig | "all")
            }
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="all">Toutes</ToggleGroupItem>
            {(Object.keys(chartConfig) as (keyof typeof chartConfig)[]).map(
              (key) => (
                <ToggleGroupItem key={key} value={String(key)}>
                  {chartConfig[key].label}
                </ToggleGroupItem>
              )
            )}
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
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
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={filteredData}
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
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
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
      </CardContent>
    </Card>
  );
};

export default MultiLineChart;
