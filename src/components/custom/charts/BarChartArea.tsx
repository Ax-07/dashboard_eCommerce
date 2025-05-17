import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface VenteTotalMensuel {
  month: string;
  fleurs: number;
  resines: number;
  total: number;
  maxValue: number;
}

interface BarChartAreaProps {
  venteTotalMenuel: VenteTotalMensuel[];
  chartConfig: ChartConfig;
}

const BarChartArea: React.FC<BarChartAreaProps> = ({
  venteTotalMenuel,
  chartConfig,
}) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] min-h-[200px] w-full"
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
          dataKey={"maxValue"}
          hide={false}
          axisLine={false}
          tickLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="fleurs" fill="var(--color-fleurs)" radius={4} />
        <Bar dataKey="resines" fill="var(--color-resines)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartArea;
