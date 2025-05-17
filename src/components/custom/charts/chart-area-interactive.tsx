"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/src/components/ui/toggle-group"
import { useIsMobile } from "@/src/hooks/use-mobile"

export const chartData = [
  { date: "2024-04-01", fleurs: 222, resines: 150, huiles: 100, eliquides: 50 },
  { date: "2024-04-02", fleurs: 97, resines: 180, huiles: 120, eliquides: 60 },
  { date: "2024-04-03", fleurs: 167, resines: 120, huiles: 80, eliquides: 40 },
  { date: "2024-04-04", fleurs: 242, resines: 260, huiles: 140, eliquides: 70 },
  { date: "2024-04-05", fleurs: 373, resines: 290, huiles: 160, eliquides: 80 },
  { date: "2024-04-06", fleurs: 301, resines: 340, huiles: 200, eliquides: 90 },
  { date: "2024-04-07", fleurs: 245, resines: 180, huiles: 120, eliquides: 60 },
  { date: "2024-04-08", fleurs: 409, resines: 320, huiles: 180, eliquides: 100 },
  { date: "2024-04-09", fleurs: 59, resines: 110, huiles: 90, eliquides: 50 },
  { date: "2024-04-10", fleurs: 261, resines: 190, huiles: 130, eliquides: 70 },
  { date: "2024-04-11", fleurs: 327, resines: 350, huiles: 220, eliquides: 120 },
  { date: "2024-04-12", fleurs: 292, resines: 210, huiles: 140, eliquides: 90 },
  { date: "2024-04-13", fleurs: 342, resines: 380, huiles: 200, eliquides: 110 },
  { date: "2024-04-14", fleurs: 137, resines: 220, huiles: 160, eliquides: 80 },
  { date: "2024-04-15", fleurs: 120, resines: 170, huiles: 110, eliquides: 60 },
  { date: "2024-04-16", fleurs: 138, resines: 190, huiles: 130, eliquides: 70 },
  { date: "2024-04-17", fleurs: 446, resines: 360, huiles: 240, eliquides: 130 },
  { date: "2024-04-18", fleurs: 364, resines: 410, huiles: 280, eliquides: 150 },
  { date: "2024-04-19", fleurs: 243, resines: 180, huiles: 150, eliquides: 80 },
  { date: "2024-04-20", fleurs: 89, resines: 150, huiles: 120, eliquides: 70 },
  { date: "2024-04-21", fleurs: 137, resines: 200, huiles: 130, eliquides: 80 },
  { date: "2024-04-22", fleurs: 224, resines: 170, huiles: 110, eliquides: 60 },
  { date: "2024-04-23", fleurs: 138, resines: 230, huiles: 160, eliquides: 90 },
  { date: "2024-04-24", fleurs: 387, resines: 290, huiles: 200, eliquides: 120 },
  { date: "2024-04-25", fleurs: 215, resines: 250, huiles: 180, eliquides: 100 },
  { date: "2024-04-26", fleurs: 75, resines: 130, huiles: 100, eliquides: 50 },
  { date: "2024-04-27", fleurs: 383, resines: 420, huiles: 300, eliquides: 150 },
  { date: "2024-04-28", fleurs: 122, resines: 180, huiles: 120, eliquides: 70 },
  { date: "2024-04-29", fleurs: 315, resines: 240, huiles: 160, eliquides: 80 },
  { date: "2024-04-30", fleurs: 454, resines: 380, huiles: 220, eliquides: 120 },
  { date: "2024-05-01", fleurs: 165, resines: 220, huiles: 140, eliquides: 90 },
  { date: "2024-05-02", fleurs: 293, resines: 310, huiles: 200, eliquides: 110 },
  { date: "2024-05-03", fleurs: 247, resines: 190, huiles: 130, eliquides: 70 },
  { date: "2024-05-04", fleurs: 385, resines: 420, huiles: 300, eliquides: 150 },
  { date: "2024-05-05", fleurs: 481, resines: 390, huiles: 250, eliquides: 130 },
  { date: "2024-05-06", fleurs: 498, resines: 520, huiles: 400, eliquides: 200 },
  { date: "2024-05-07", fleurs: 388, resines: 300, huiles: 200, eliquides: 100 },
  { date: "2024-05-08", fleurs: 149, resines: 210, huiles: 140, eliquides: 80 },
  { date: "2024-05-09", fleurs: 227, resines: 180, huiles: 120, eliquides: 70 },
  { date: "2024-05-10", fleurs: 293, resines: 330, huiles: 240, eliquides: 130 },
  { date: "2024-05-11", fleurs: 335, resines: 270, huiles: 180, eliquides: 90 },
  { date: "2024-05-12", fleurs: 197, resines: 240, huiles: 160, eliquides: 80 },
  { date: "2024-05-13", fleurs: 197, resines: 160, huiles: 100, eliquides: 50 },
  { date: "2024-05-14", fleurs: 448, resines: 490, huiles: 350, eliquides: 180 },
  { date: "2024-05-15", fleurs: 473, resines: 380, huiles: 250, eliquides: 130 },
  { date: "2024-05-16", fleurs: 338, resines: 400, huiles: 280, eliquides: 140 },
  { date: "2024-05-17", fleurs: 499, resines: 420, huiles: 300, eliquides: 150 },
  { date: "2024-05-18", fleurs: 315, resines: 350, huiles: 240, eliquides: 120 },
  { date: "2024-05-19", fleurs: 235, resines: 180, huiles: 130, eliquides: 70 },
  { date: "2024-05-20", fleurs: 177, resines: 230, huiles: 160, eliquides: 80 },
  { date: "2024-05-21", fleurs: 82, resines: 140, huiles: 100, eliquides: 50 },
  { date: "2024-05-22", fleurs: 81, resines: 120, huiles: 90, eliquides: 40 },
  { date: "2024-05-23", fleurs: 252, resines: 290, huiles: 200, eliquides: 100 },
  { date: "2024-05-24", fleurs: 294, resines: 220, huiles: 150, eliquides: 80 },
  { date: "2024-05-25", fleurs: 201, resines: 250, huiles: 170, eliquides: 90 },
  { date: "2024-05-26", fleurs: 213, resines: 170, huiles: 120, eliquides: 60 },
  { date: "2024-05-27", fleurs: 420, resines: 460, huiles: 350, eliquides: 180 },
  { date: "2024-05-28", fleurs: 233, resines: 190, huiles: 130, eliquides: 70 },
  { date: "2024-05-29", fleurs: 78, resines: 130, huiles: 100, eliquides: 50 },
  { date: "2024-05-30", fleurs: 340, resines: 280, huiles: 200, eliquides: 100 },
  { date: "2024-05-31", fleurs: 178, resines: 230, huiles: 160, eliquides: 80 },
  { date: "2024-06-01", fleurs: 178, resines: 200, huiles: 140, eliquides: 70 },
  { date: "2024-06-02", fleurs: 470, resines: 410, huiles: 300, eliquides: 150 },
  { date: "2024-06-03", fleurs: 103, resines: 160, huiles: 120, eliquides: 60 },
  { date: "2024-06-04", fleurs: 439, resines: 380, huiles: 250, eliquides: 130 },
  { date: "2024-06-05", fleurs: 88, resines: 140, huiles: 100, eliquides: 50 },
  { date: "2024-06-06", fleurs: 294, resines: 250, huiles: 180, eliquides: 90 },
  { date: "2024-06-07", fleurs: 323, resines: 370, huiles: 270, eliquides: 140 },
  { date: "2024-06-08", fleurs: 385, resines: 320, huiles: 220, eliquides: 110 },
  { date: "2024-06-09", fleurs: 438, resines: 480, huiles: 350, eliquides: 180 },
  { date: "2024-06-10", fleurs: 155, resines: 200, huiles: 140, eliquides: 70 },
  { date: "2024-06-11", fleurs: 92, resines: 150, huiles: 110, eliquides: 60 },
  { date: "2024-06-12", fleurs: 492, resines: 420, huiles: 310, eliquides: 160 },
  { date: "2024-06-13", fleurs: 81, resines: 130, huiles: 100, eliquides: 50 },
  { date: "2024-06-14", fleurs: 426, resines: 380, huiles: 280, eliquides: 140 },
  { date: "2024-06-15", fleurs: 307, resines: 350, huiles: 240, eliquides: 120 },
  { date: "2024-06-16", fleurs: 371, resines: 310, huiles: 220, eliquides: 110 },
  { date: "2024-06-17", fleurs: 475, resines: 520, huiles: 400, eliquides: 200 },
  { date: "2024-06-18", fleurs: 107, resines: 170, huiles: 120, eliquides: 60 },
  { date: "2024-06-19", fleurs: 341, resines: 290, huiles: 200, eliquides: 100 },
  { date: "2024-06-20", fleurs: 408, resines: 450, huiles: 330, eliquides: 170 },
  { date: "2024-06-21", fleurs: 169, resines: 210, huiles: 150, eliquides: 80 },
  { date: "2024-06-22", fleurs: 317, resines: 270, huiles: 190, eliquides: 90 },
  { date: "2024-06-23", fleurs: 480, resines: 530, huiles: 410, eliquides: 200 },
  { date: "2024-06-24", fleurs: 132, resines: 180, huiles: 130, eliquides: 70 },
  { date: "2024-06-25", fleurs: 141, resines: 190, huiles: 140, eliquides: 80 },
  { date: "2024-06-26", fleurs: 434, resines: 380, huiles: 280, eliquides: 140 },
  { date: "2024-06-27", fleurs: 448, resines: 490, huiles: 350, eliquides: 180 },
  { date: "2024-06-28", fleurs: 149, resines: 200, huiles: 140, eliquides: 70 },
  { date: "2024-06-29", fleurs: 103, resines: 160, huiles: 120, eliquides: 60 },
  { date: "2024-06-30", fleurs: 446, resines: 400, huiles: 300, eliquides: 150 },
]
export const chartConfig = {
  fleurs: { label: "Fleurs", color: "hsl(var(--chart-1))" },
  resines: { label: "Résines", color: "hsl(var(--chart-2))" },
  huiles: { label: "Huiles", color: "hsl(var(--chart-3))" },
  eliquides: { label: "E-liquides", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

// Helper: get last value of a key in data array
function getLastValue(data: typeof chartData, key: keyof typeof chartData[0]): number {
  for (let i = data.length - 1; i >= 0; i--) {
    const val = data[i][key]
    if (typeof val === 'number') {
      return val
    }
  }
  return 0
}
export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])
  // Filtrer les données selon la période sélectionnée
  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return chartData.filter((item) => new Date(item.date) >= startDate)
  }, [timeRange])

  // Trier dynamiquement les clés pour que la série avec la plus grande valeur apparaisse au-dessus
  const sortedKeys = React.useMemo<(keyof typeof chartConfig)[]>(() => {
    const keys = Object.keys(chartConfig) as (keyof typeof chartConfig)[]
    return keys.sort(
      (a, b) => getLastValue(filteredData, a) - getLastValue(filteredData, b)
    )
  }, [filteredData])
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last 3 months
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
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              {sortedKeys.map((key) => (
                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
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
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            {sortedKeys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                stackId="a"
                fill={`url(#fill${key})`}
                stroke={`var(--color-${key})`}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
