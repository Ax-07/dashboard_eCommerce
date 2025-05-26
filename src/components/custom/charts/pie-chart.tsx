// @/src/components/custom/charts/pie-chart.tsx
"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"
import { PieChartData, useChartsDatas } from "./useChartsDatas"
import { ALLSELLS } from "@/src/mock/sells/monthly_sales"

interface PieChartProps {
    title: string;
    description: string;
    chartData: PieChartData[]
    chartConfig: ChartConfig;
    total?: number;
}

export const PieChartComponent: React.FC<PieChartProps> = ({
    title,
    description,
    chartData,
    chartConfig,
    total = 0,
}) => {
  const isDataAvailable = chartData.some((item) => item.value > 0);
  
  
  console.log("PieChartComponent", chartData)
  return (
    <Card className="flex flex-col h-full justify-between">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isDataAvailable ?
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[150px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                strokeWidth={6}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-base font-bold"
                          >
                            {/* {totalVisitors.toLocaleString()} */}
                            {total} €
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                              Total
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          : (
            <div className="flex items-center justify-center text-muted-foreground">
              Pas de données disponibles
            </div>
          )
        }
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
