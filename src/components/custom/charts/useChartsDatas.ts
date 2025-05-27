// @/src/components/custom/charts/useChatsDatas.ts
import { useEffect, useMemo, useState } from "react"
import {
  differenceInDays,
  startOfWeek,
  startOfMonth,
  format,
} from "date-fns"
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
  data?: ChartData[];
  dateRange?: { from?: Date; to?: Date }
}

export const useChartsDatas = ({
  data = [],
  dateRange,
}: UseChartProps) => {

  const from = dateRange?.from
  const to   = dateRange?.to
  const spanDays = useMemo(() => {
    if (!from || !to) return 0
    return differenceInDays(to, from)
  }, [from, to])

  const sample: ChartData = data[0] || {};
  const categoryKeys = Object.keys(sample).filter(key => key !== "date");
  const chartConfig = categoryKeys.reduce<Record<string, { label: string; color: string }>>((acc, key) => {
    acc[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: `hsl(${(categoryKeys.indexOf(key) + 1) * (360 / categoryKeys.length) + 100}, 70%, 50%)`,
    }
    return acc
  }, {})

  // Filtrer les données selon la période sélectionnée
  const filteredData = useMemo(() => {
    if (!from || !to) return data
    const fromTs = from.getTime()
    const toTs   = to.getTime()
    return data
      .filter((d) => {
        const ts = new Date(d.date).getTime()
        return ts >= fromTs && ts <= toTs
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [data, from, to])

// 4) Choix du « bucket » en fonction de la durée
  const bucketedData = useMemo<ChartData[]>(() => {
    // Cas journalier : on garde tel quel
    if (spanDays <= 30) {
      return filteredData.map((d) => ({ ...d }))
    }

    // Fonction genMap pour éviter duplication
    const makeMap = () => new Map<string, ChartData>()

    // Bucketing hebdo
    if (spanDays <= 90) {
      const m = makeMap()
      filteredData.forEach((d) => {
        const w0 = startOfWeek(new Date(d.date), { weekStartsOn: 1 })
        const key = format(w0, "yyyy-MM-dd")
        if (!m.has(key)) m.set(key, { date: key } as ChartData)
        const row = m.get(key)!
        categoryKeys.forEach((k) => {
          row[k] = (row[k] as number || 0) + (typeof d[k] === "number" ? d[k] : 0)
        })
      })
      return Array.from(m.values())
    }

    // Bucketing mensuel
    const m = makeMap()
    filteredData.forEach((d) => {
      const m0 = startOfMonth(new Date(d.date))
      const key = format(m0, "yyyy-MM")
      if (!m.has(key)) m.set(key, { date: key } as ChartData)
      const row = m.get(key)!
      categoryKeys.forEach((k) => {
        row[k] = (row[k] as number || 0) + (typeof d[k] === "number" ? d[k] : 0)
      })
    })
    return Array.from(m.values())
  }, [filteredData, spanDays, categoryKeys])

  const chartData = useMemo<ChartData[]>(() => {
    return bucketedData.map((d) => {
      const newData: ChartData = { date: d.date };
      
      categoryKeys.forEach((key) => {

        newData[key] = d[key] as number;
      });
      return newData;
    });
  }, [bucketedData, categoryKeys]);

  // Calculer le total par catégorie
  const totalByCategory = chartData.reduce<Record<string, number>>((acc, curr) => {
    categoryKeys.forEach((k) => {
      acc[k] = (acc[k] || 0) + (typeof curr[k] === "number" ? (curr[k] as number) : 0)
    })
    return acc
  }, {})

  // Calculer le total global
  const total = Object.values(totalByCategory).reduce((a, b) => a + b, 0)

  // Préparer les données pour le graphique en camembert
  const pieChartData: PieChartData[] = categoryKeys.map(key => ({
    name: chartConfig[key].label,
    value: totalByCategory[key],
    fill: `var(--color-${key})`,
  }));

  // calculs de tendance
  const calcTrend = (first: number, last: number) => {
    if (first === 0) return 0
    return parseFloat((((last - first) / first) * 100).toFixed(2))
  }

  // tendances par catégorie
  const trendsByCategory = categoryKeys.reduce<Record<string, number>>((acc, key) => {
    if (chartData.length >= 2) {
      const firstV = chartData[0][key] as number
      const lastV = chartData[chartData.length - 1][key] as number
      acc[key] = calcTrend(firstV, lastV)
    } else {
      acc[key] = 0
    }
    return acc
  }, {})

  // tendance globale : on compare la somme du premier jour vs la somme du dernier
  let globalTrendPercent = 0
  if (chartData.length >= 2) {
    const sumAt = (idx: number) =>
      categoryKeys.reduce((s, k) => s + (chartData[idx][k] as number), 0)
    const firstSum = sumAt(0)
    const lastSum = sumAt(chartData.length - 1)
    globalTrendPercent = calcTrend(firstSum, lastSum)
  }


  return {
    chartData,
    pieChartData,
    chartConfig,
    totalByCategory,
    total,
    dateRange,
  }
}

export const useChartState = () => {
   const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
      const toggleKey = (key: string) => {
        setHiddenKeys((prev) => {
          const newHiddenKeys = prev.includes(key)
            ? prev.filter((k) => k !== key)
            : [...prev, key];
          console.log("Toggled key:", key, "Hidden keys:", newHiddenKeys);
          return newHiddenKeys;
        });
      };
  return { hiddenKeys, toggleKey }
}