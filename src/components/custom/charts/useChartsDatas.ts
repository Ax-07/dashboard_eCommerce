// @/src/components/custom/charts/useChatsDatas.ts
import { useMemo, useState } from "react"
import { 
  differenceInDays,
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  startOfDay,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
  format,
} from "date-fns";
import { getComputeSells } from "@/src/mock/sells/computeSells";
import { OrderItemInput, OrderOutput } from "@/src/lib/validators/order.zod";
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
  orders?: OrderOutput[];
  dateRange?: { from?: Date; to?: Date }
}

export const useChartsDatas = ({
  orders = [],
  dateRange,
}: UseChartProps) => {

  const data = getComputeSells({ Order: orders });
  const sellsbycategorybydate = data;
  const from = dateRange?.from;
  const to = dateRange?.to;

  // 1) filtrage des orders brutes
  const filteredOrders = useMemo(() => {
    if (!from || !to) return orders;
    const fromTs = from.getTime();
    const toTs = to.getTime();
    return orders.filter(o => {
      const ts = new Date(o.updatedAt).getTime();  // adapter selon ton champ date
      return ts >= fromTs && ts <= toTs;
    });
  }, [orders, from, to]);

  // Calculer la période de temps sélectionnée
  const spanDays = useMemo(() => {
    if (!from || !to) return 0
    return differenceInDays(to, from)
  }, [from, to]);

  // 1) Calculer la période pour formater l'affichage des graphiques
  const tickFormatter = useMemo(() => {
    return (value: string) => {
      const date = new Date(value);
      if (spanDays <= 30) {
        return format(date, "dd/MM");
      } else if (spanDays <= 90) {
        return format(date, "dd/MM");
      } else if (spanDays <= 365) {
        return format(date, "MMM");
      } else {
        return format(date, "yyyy");
      }
    };
  }, [spanDays]);

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
    const toTs = to.getTime()
    return data
      .filter((d) => {
        const ts = new Date(d.date).getTime()
        return ts >= fromTs && ts <= toTs
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [data, from, to])

  // 4) Choix du « bucket » en fonction de la durée (quotidien / hebdo / mensuel)
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

  // --- Ventes --- //

  // Caluler le nombre total des transactions par statut
  const totalTransactionsByStatus = filteredOrders.reduce<Record<string, number>>((acc, order) => {
    const status = order.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Calculer le total des ventes par catégorie
  const totalSellByCategory = chartData.reduce<Record<string, number>>((acc, curr) => {
    categoryKeys.forEach((k) => {
      acc[k] = (acc[k] || 0) + (typeof curr[k] === "number" ? (curr[k] as number) : 0)
    })
    return acc
  }, {})

  // Calculer le total des ventes
  const totalSell = Object.values(totalSellByCategory).reduce((a, b) => a + b, 0)

  // --- Commandes --- //

  // Calculer le nombre total des commandes par catégories
  const totalOrdersByCategories = chartData.reduce<Record<string, number>>((acc, curr) => {
    categoryKeys.forEach((k) => {
      acc[k] = (acc[k] || 0) + (typeof curr[k] === "number" ? 1 : 0)
    })
    return acc
  }, {})

  // Calculer le nombre total de commandes
  const totalOrders = filteredOrders.length;

  // Calculer le nombre total de commandes par catégorie
  const totalOrdersByCategory = filteredOrders.reduce<Record<string, number>>((acc, order) => {
    order.items.forEach((item: OrderItemInput) => {
      const category = item.category ?? "autre";
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {});

  // Calculer la valeur moyenne des commandes
  const averageOrderValue = totalSell / totalOrders || 0;

  // --- Clients --- //

  // Calculer le nombre total de clients uniques
  const uniqueCustomers = new Set(filteredOrders.map(o => o.customerId)).size;

  // --- Tendances --- //

    // ───> 9) Fonction utilitaire : somme par catégorie sur une plage de dates
  function sumByCategoryBetween(
    startDate: Date,
    endDate: Date
  ): Record<string, number> {
    const sums: Record<string, number> = {};
    categoryKeys.forEach((k) => (sums[k] = 0));

    sellsbycategorybydate.forEach((d) => {
      const dt = new Date(d.date);
      if (dt >= startDate && dt <= endDate) {
        categoryKeys.forEach((k) => {
          const val = typeof d[k] === "number" ? (d[k] as number) : 0;
          sums[k] += val;
        });
      }
    });

    return sums;
  }

  // calculs de tendance
  const calcTrendPercent = (first: number, last: number) => {
    if (first === 0) return 0
    return parseFloat((((last - first) / first) * 100).toFixed(2))
  }

  // ───> 11) On définit la date de référence pour les calculs (aujourd’hui ou dateRange.to)
  const referenceDate = to ? new Date(to) : new Date();

  // ───> 12) Calcul des différents points de découpe
  // 12.1) JOURNALIER
  const currDayStart = startOfDay(referenceDate);
  const prevDayStart = subDays(currDayStart, 1);
  // 12.2) HEBDO
  const currWeekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });
  const prevWeekStart = subWeeks(currWeekStart, 1);
  const prevWeekEnd = subDays(currWeekStart, 1);
  // 12.3) MENSUEL
  const currMonthStart = startOfMonth(referenceDate);
  const prevMonthStart = subMonths(currMonthStart, 1);
  const prevMonthEnd = subDays(currMonthStart, 1);
  // 12.4) TRIMESTRIEL
  const currQuarterStart = startOfQuarter(referenceDate);
  const prevQuarterStart = subQuarters(currQuarterStart, 1);
  const prevQuarterEnd = subDays(currQuarterStart, 1);
  // 12.5) ANNUEL
  const currYearStart = startOfYear(referenceDate);
  const prevYearStart = subYears(currYearStart, 1);
  const prevYearEnd = subDays(currYearStart, 1);

// ───> 13) Aggrégation pour chaque période
  // 13.1) Daily
  const sumPrevDay = sumByCategoryBetween(prevDayStart, prevDayStart);
  const sumCurrDay = sumByCategoryBetween(currDayStart, referenceDate);

  // 13.2) Weekly
  const sumPrevWeek = sumByCategoryBetween(prevWeekStart, prevWeekEnd);
  const sumCurrWeek = sumByCategoryBetween(currWeekStart, referenceDate);

  // 13.3) Monthly
  const sumPrevMonth = sumByCategoryBetween(prevMonthStart, prevMonthEnd);
  // On peut décider de prendre jusqu’à la référence ou jusqu’à la fin du mois
  // Disons qu’on prend jusqu’à la date de référence pour rester cohérent
  const sumCurrMonth = sumByCategoryBetween(currMonthStart, referenceDate);

  // 13.4) Quarterly
  const sumPrevQuarter = sumByCategoryBetween(prevQuarterStart, prevQuarterEnd);
  const sumCurrQuarter = sumByCategoryBetween(currQuarterStart, referenceDate);

  // 13.5) Yearly
  const sumPrevYear = sumByCategoryBetween(prevYearStart, prevYearEnd);
  const sumCurrYear = sumByCategoryBetween(currYearStart, referenceDate);

  // ───> 14) Calcul des tendances % par catégorie
  const dailyTrendByCategory: Record<string, number> = {};
  const weeklyTrendByCategory: Record<string, number> = {};
  const monthlyTrendByCategory: Record<string, number> = {};
  const quarterlyTrendByCategory: Record<string, number> = {};
  const yearlyTrendByCategory: Record<string, number> = {};

  categoryKeys.forEach((k) => {
    dailyTrendByCategory[k] = calcTrendPercent(sumPrevDay[k], sumCurrDay[k]);
    weeklyTrendByCategory[k] = calcTrendPercent(
      sumPrevWeek[k],
      sumCurrWeek[k]
    );
    monthlyTrendByCategory[k] = calcTrendPercent(
      sumPrevMonth[k],
      sumCurrMonth[k]
    );
    quarterlyTrendByCategory[k] = calcTrendPercent(
      sumPrevQuarter[k],
      sumCurrQuarter[k]
    );
    yearlyTrendByCategory[k] = calcTrendPercent(
      sumPrevYear[k],
      sumCurrYear[k]
    );
  });

  // ───> 15) Si vous voulez une tendance “globale” non plus par catégorie
  //        mais sur la somme de toutes les catégories, vous pouvez aussi :
  function sumAllCategories(obj: Record<string, number>): number {
    return categoryKeys.reduce((acc, k) => acc + (obj[k] || 0), 0);
  }

  const globalDailyTrend = calcTrendPercent(
    sumAllCategories(sumPrevDay),
    sumAllCategories(sumCurrDay)
  );
  const globalWeeklyTrend = calcTrendPercent(
    sumAllCategories(sumPrevWeek),
    sumAllCategories(sumCurrWeek)
  );
  const globalMonthlyTrend = calcTrendPercent(
    sumAllCategories(sumPrevMonth),
    sumAllCategories(sumCurrMonth)
  );
  const globalQuarterlyTrend = calcTrendPercent(
    sumAllCategories(sumPrevQuarter),
    sumAllCategories(sumCurrQuarter)
  );
  const globalYearlyTrend = calcTrendPercent(
    sumAllCategories(sumPrevYear),
    sumAllCategories(sumCurrYear)
  );

    // ───> 18) **NOUVEAU** : Calcul des tendances **du chiffre d’affaires** (somme totale)
  // Pour chaque granularité, on somme d’abord toutes les catégories, puis on calcule le %
  const revenueSumPrevDay     = sumAllCategories(sumPrevDay);
  const revenueSumCurrDay     = sumAllCategories(sumCurrDay);
  const revenueSumPrevWeek    = sumAllCategories(sumPrevWeek);
  const revenueSumCurrWeek    = sumAllCategories(sumCurrWeek);
  const revenueSumPrevMonth   = sumAllCategories(sumPrevMonth);
  const revenueSumCurrMonth   = sumAllCategories(sumCurrMonth);
  const revenueSumPrevQuarter = sumAllCategories(sumPrevQuarter);
  const revenueSumCurrQuarter = sumAllCategories(sumCurrQuarter);
  const revenueSumPrevYear    = sumAllCategories(sumPrevYear);
  const revenueSumCurrYear    = sumAllCategories(sumCurrYear);

  // Préparer les données pour le graphique en camembert
  const pieChartData: PieChartData[] = categoryKeys.map(key => ({
    name: key,
    value: totalSellByCategory[key],
    fill: `var(--color-${key})`,
  }));

  return {
    chartData, // les données du graphique
    pieChartData, // les données du graphique en camembert
    chartConfig, // la configuration du graphique
    dateRange, // la plage de dates sélectionnée
    tickFormatter, // la fonction de formatage des dates pour l'axe X
    sellsbycategorybydate, // les ventes par catégorie et par date
    totalSell, // le chiffre d'affaires total
    totalSellByCategory, // le chiffre d'affaires par catégorie
    totalOrders, // le nombre total de commandes
    totalOrdersByCategories, // le nombre total de commandes par catégorie
    uniqueCustomers, // le nombre de clients uniques
    totalTransactionsByStatus, // le nombre total de transactions par statut
    totalOrdersByCategory, // le nombre total de commandes par catégorie
    averageOrderValue, // la valeur moyenne des commandes
    trendsByCategory: {
      daily: dailyTrendByCategory,
      weekly: weeklyTrendByCategory,
      monthly: monthlyTrendByCategory,
      quarterly: quarterlyTrendByCategory,
      yearly: yearlyTrendByCategory,
    },
    globalTrendPercent: {
      daily: globalDailyTrend,
      weekly: globalWeeklyTrend,
      monthly: globalMonthlyTrend,
      quarterly: globalQuarterlyTrend,
      yearly: globalYearlyTrend,
    },
    sells: {
      daily: revenueSumCurrDay,
      weekly: revenueSumCurrWeek,
      monthly: revenueSumCurrMonth,
      quarterly: revenueSumCurrQuarter,
      yearly: revenueSumCurrYear,
    }

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