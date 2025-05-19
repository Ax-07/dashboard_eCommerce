// @/src/components/custom/charts/useChatsDatas.ts
import { useMemo } from "react"

export interface ChartData {
  date: string;
  [key: string]: number | string;
}

export type PieChartData = {
  name: string;
  value: number;
  fill: string;
}

interface UseChartProps {
  data: ChartData[];
  startDate?: string;
  endDate?: string;
}

export const useChartsDatas = ({
  data,
  startDate,
  endDate,
}: UseChartProps) => {
  // const chartConfig = {
  const sample: ChartData = data[0] || {};
  const categoryKeys = Object.keys(sample).filter(key => key !== "date");
 
  const chartConfig = categoryKeys.reduce<Record<string, { label: string; color: string }>>((acc, key) => {
    acc[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: `hsl(${(categoryKeys.indexOf(key) + 1) * (360 / categoryKeys.length) + 100}, 70%, 50%)`,
    }
    return acc
  }, {})

  const totalByCategory = (data).reduce(
    (acc, curr) => {
      categoryKeys.forEach(key => {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += typeof curr[key] === "number" ? (curr[key] as number) : 0
      })
      return acc
    },
    {} as Record<string, number>
  )

  const total = Object.values(totalByCategory).reduce((acc, curr) => {
    return acc + curr
  }, 0)

  const pieChartData: PieChartData[] = categoryKeys.map(key => ({
    name: chartConfig[key].label,
    value: totalByCategory[key],
    fill: `var(--color-${key})`,
  }))


  const filteredData = useMemo(() => {
    return data.filter(d =>
      (!startDate || d.date >= startDate) &&
      (!endDate || d.date <= endDate)
    )
  }, [startDate, endDate])

const chartData = useMemo<ChartData[]>(() => {
  return filteredData.map(d => {
    const newData = { date: d.date } as ChartData;
    categoryKeys.forEach(key => {
      // on sait que d[key] est number ou string
      newData[key] = d[key] as number;
    });
    return newData;
  });
}, [filteredData, categoryKeys]);

  return {
    chartData,
    pieChartData,
    chartConfig,
    totalByCategory,
    total,
  }
}