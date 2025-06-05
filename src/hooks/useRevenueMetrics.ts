import { useMemo } from 'react';
import { OrderItemInput, OrderOutput } from '../lib/validators/order.zod';
import { startOfDay, startOfMonth, startOfQuarter, startOfWeek, startOfYear, subDays, subMonths, subQuarters, subWeeks, subYears } from 'date-fns';
import { PeriodType } from './useOrders';

type RevenueByCategory = Record<string, number>;
type TrendByCategory = Record<string, number>;

type GlobalTrend = {
    journalière: number;
    hebdomadaire: number;
    mensuel: number;
    trimestriel: number;
    annuel: number;
};

interface UseRevenueMetricsProps {
    orders: OrderOutput[];
    dateRange: { from: Date; to: Date };
    period: PeriodType;
    referenceDate: Date;
}

export const useRevenueMetrics = ({ orders, dateRange, period, referenceDate }: UseRevenueMetricsProps) => {
    const fromStart = dateRange.from;
    const toEnd = dateRange.to;

    /**
     * Filtre les commandes pour ne garder que celles qui ont un statut de livré ou complété.
     */
    const completedOrders = useMemo(() => {
        return orders.filter((o) => ["delivered", "completed"].includes(o.status))
    }, [orders]);

    //
    // Calcul du chiffre d’affaires par catégorie et total, sur revenueOrders uniquement
    //
    const revenueByCategory = useMemo<RevenueByCategory>(() => {
        return completedOrders.reduce<RevenueByCategory>((acc, order) => {
            order.items.forEach((item: OrderItemInput) => {
                const cat = item.category ?? "autre";
                acc[cat] = (acc[cat] || 0) + item.unitPrice * item.quantity;
            });
            return acc;
        }, {});
    }, [completedOrders]);

    /**
     * Calcul du chiffre d'affaires total.
     * On utilise Object.values pour obtenir les valeurs du revenueByCategory
     * et on les additionne pour obtenir le total.
     */
    const totalRevenue = useMemo(() => 
        Object.values(revenueByCategory).reduce((sum, v) => {
            return sum + v;
        }, 0), [revenueByCategory]);

    /**
     * Calcule le chiffre d'affaires total pour une période donnée.
     * @param startDate Date de début de la période
     * @param endDate Date de fin de la période
     * @returns Chiffre d'affaires total pour la période
     */
    const sumRevenueBetween = (startDate: Date, endDate: Date) => {
        const startTs = fromStart.getTime();
        const endTs = toEnd.getTime();

        const sums: RevenueByCategory = {};
        // On initialise chaque catégorie à 0
        Object.keys(revenueByCategory).forEach((cat) => {
            sums[cat] = 0;
        });

        completedOrders.forEach((o) => {
            const ts = new Date(o.updatedAt).getTime();
            if (ts >= startTs && ts <= endTs) {
                o.items.forEach((item: OrderItemInput) => {
                    const cat = item.category ?? "autre";
                    const montant = item.unitPrice * item.quantity;
                    sums[cat] = (sums[cat] || 0) + montant;
                });
            }
        });

        return sums;
    };

    /**
     * Calcule le pourcentage de tendance entre deux valeurs.
     * Si la valeur précédente est 0, on renvoie simplement la valeur courante.
     * @param prev 
     * @param curr 
     * @returns 
     */
    const calcTrendPercent = (prev: number, curr: number) => {
        if (prev === 0) {
            // Si la période précédente était à zéro, on renvoie simplement la valeur courante
            return parseFloat(curr.toFixed(2));
        }
        return parseFloat((((curr - prev) / prev) * 100).toFixed(2));
    };

    //
    // ─── 12) Calcul des bornes selon chaque granularité
    //
    const currDayStart = startOfDay(referenceDate);
    const prevDayStart = subDays(currDayStart, 1);

    const currWeekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });
    const prevWeekStart = subWeeks(currWeekStart, 1);
    const prevWeekEnd = subDays(currWeekStart, 1);

    const currMonthStart = startOfMonth(referenceDate);
    const prevMonthStart = subMonths(currMonthStart, 1);
    const prevMonthEnd = subDays(currMonthStart, 1);

    const currQuarterStart = startOfQuarter(referenceDate);
    const prevQuarterStart = subQuarters(currQuarterStart, 1);
    const prevQuarterEnd = subDays(currQuarterStart, 1);

    const currYearStart = startOfYear(referenceDate);
    const prevYearStart = subYears(currYearStart, 1);
    const prevYearEnd = subDays(currYearStart, 1);

    //
    // ─── 13) Sommes cumulées par catégorie pour chaque période (toutes catégories, commandes “delivered”)
    //
    const sumPrevDay = sumRevenueBetween(prevDayStart, prevDayStart);
    const sumCurrDay = sumRevenueBetween(currDayStart, referenceDate);

    const sumPrevWeek = sumRevenueBetween(prevWeekStart, prevWeekEnd);
    const sumCurrWeek = sumRevenueBetween(currWeekStart, referenceDate);

    const sumPrevMonth = sumRevenueBetween(prevMonthStart, prevMonthEnd);
    const sumCurrMonth = sumRevenueBetween(currMonthStart, referenceDate);

    const sumPrevQuarter = sumRevenueBetween(prevQuarterStart, prevQuarterEnd);
    const sumCurrQuarter = sumRevenueBetween(currQuarterStart, referenceDate);

    const sumPrevYear = sumRevenueBetween(prevYearStart, prevYearEnd);
    const sumCurrYear = sumRevenueBetween(currYearStart, referenceDate);

    //
    // ─── 14) Calcul des tendances par catégorie
    //
    const trendByCategoryDaily: TrendByCategory = {};
    const trendByCategoryWeekly: TrendByCategory = {};
    const trendByCategoryMonthly: TrendByCategory = {};
    const trendByCategoryQuarterly: TrendByCategory = {};
    const trendByCategoryYearly: TrendByCategory = {};

    Object.keys(revenueByCategory).forEach((cat) => {
        trendByCategoryDaily[cat] = calcTrendPercent(
            sumPrevDay[cat] || 0,
            sumCurrDay[cat] || 0
        );
        trendByCategoryWeekly[cat] = calcTrendPercent(
            sumPrevWeek[cat] || 0,
            sumCurrWeek[cat] || 0
        );
        trendByCategoryMonthly[cat] = calcTrendPercent(
            sumPrevMonth[cat] || 0,
            sumCurrMonth[cat] || 0
        );
        trendByCategoryQuarterly[cat] = calcTrendPercent(
            sumPrevQuarter[cat] || 0,
            sumCurrQuarter[cat] || 0
        );
        trendByCategoryYearly[cat] = calcTrendPercent(
            sumPrevYear[cat] || 0,
            sumCurrYear[cat] || 0
        );
    });

    //
    // ─── 15) Calcul des tendances globales (toutes catégories, commandes “delivered”)
    //
    const sumAll = (obj: RevenueByCategory) =>
        Object.values(obj).reduce((acc, v) => acc + v, 0);

    const globalTrend: GlobalTrend = {
        journalière: calcTrendPercent(sumAll(sumPrevDay), sumAll(sumCurrDay)),
        hebdomadaire: calcTrendPercent(
            sumAll(sumPrevWeek),
            sumAll(sumCurrWeek)
        ),
        mensuel: calcTrendPercent(
            sumAll(sumPrevMonth),
            sumAll(sumCurrMonth)
        ),
        trimestriel: calcTrendPercent(
            sumAll(sumPrevQuarter),
            sumAll(sumCurrQuarter)
        ),
        annuel: calcTrendPercent(sumAll(sumPrevYear), sumAll(sumCurrYear)),
    };

    const totalDeliveredOrders = useMemo(() => {
        return completedOrders.length;
    }, [completedOrders]);

    const averageOrderValue = useMemo(() => {
        return totalDeliveredOrders > 0
            ? totalRevenue / totalDeliveredOrders
            : 0;
    }, [totalRevenue, totalDeliveredOrders]);
    return {
        totalRevenue,
        revenueByCategory,
        trendByCategory: {
            journalière: trendByCategoryDaily,
            hebdomadaire: trendByCategoryWeekly,
            mensuel: trendByCategoryMonthly,
            trimestriel: trendByCategoryQuarterly,
            annuel: trendByCategoryYearly,
        },
        globalTrend,
        averageOrderValue,
        period
    }
}