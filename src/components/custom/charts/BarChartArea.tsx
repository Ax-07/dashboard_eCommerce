import React from "react"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartData } from "./useChartsDatas"

interface BarChartAreaProps {
  chartData: ChartData[]
  chartConfig: ChartConfig
}

const BarChartArea: React.FC<BarChartAreaProps> = ({
  chartData,
  chartConfig,
}) => {
  const entries = Object.entries(chartConfig) as Array<
    [string, { label: string; color: string }]
  >

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        accessibilityLayer
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => String(value).slice(0, 10)}
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
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />

        {entries.map(([key, { label, color }]) => (
          <Bar
            key={key}
            dataKey={key}    // ← on passe la clé de la propriété dans chartData
            name={label}
            fill={color}
            stackId="a"
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export default BarChartArea
