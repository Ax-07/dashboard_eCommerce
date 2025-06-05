// @/src/hooks/useMetricsData.ts
import { useMemo } from "react";
import {
    startOfDay,
    endOfDay,
    startOfWeek,
    startOfMonth,
    startOfQuarter,
    startOfYear,
    subDays,
    subWeeks,
    subMonths,
    subQuarters,
    subYears,
    differenceInDays,
} from "date-fns";
import { OrderOutput, OrderItemInput } from "@/src/lib/validators/order.zod";
import { PeriodType } from "./useOrders";

type RevenueByCategory = Record<string, number>;
type TrendByCategory = Record<string, number>;

type GlobalTrend = {
    journalière: number;
    hebdomadaire: number;
    mensuel: number;
    trimestriel: number;
    annuel: number;
};

interface UseMetricsProps {
    orders: OrderOutput[];
    dateRange?: { from?: Date; to?: Date };
    period: PeriodType;
}

export function useMetricsData({ orders, dateRange }: UseMetricsProps) {
    console.log('daterange', dateRange)
    //
    // ─── 0) Calculer fromStart (00:00:00) et toEnd (23:59:59.999) au tout début
    //
    const fromStart = dateRange?.from;
    const toEnd = dateRange?.to;

    console.log('fromStart', fromStart, 'toEnd', toEnd);
    /**
     * Filtre les commandes en fonction de la plage de dates spécifiée.
     * Si aucune plage n'est spécifiée, retourne toutes les commandes.
     */
    const filteredOrders = useMemo(() => {
        if (!fromStart || !toEnd) {
            return orders;
        }
        const fromTs = fromStart.getTime();
        const toTs = toEnd.getTime();
        return orders.filter((o) => {
            const ts = new Date(o.updatedAt).getTime();
            return ts >= fromTs && ts <= toTs;
        });
    }, [orders, fromStart, toEnd]);

    //
    // ─── 2) Filtrer SURTOUT pour le CA, ne garder que les commandes 'delivered'
    //
    /**
     * Filtre les commandes pour ne garder que celles qui ont un statut de livré ou complété.
     */
    const completedOrders = useMemo(() => {
        return filteredOrders.filter((o) => ["delivered", "completed"].includes(o.status))
    }, [filteredOrders]);

    //
    // ─── 3) Calcul du chiffre d’affaires par catégorie et total, sur revenueOrders uniquement
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

    const totalRevenue = useMemo(
        () =>
            Object.values(revenueByCategory).reduce((sum, v) => {
                return sum + v;
            }, 0),
        [revenueByCategory]
    );

    //
    // ─── 4) Nombre total de commandes (toutes statuts confondus)
    //
    const totalOrders = useMemo(() => {
        return filteredOrders.length;
    }, [filteredOrders]);

    const totalOrdersByStatus = useMemo(() => {
        return filteredOrders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }
            , {} as Record<string, number>);
    }, [filteredOrders]);

    //
    // ─── 5) Nombre de clients uniques (toutes commandes filtrées)
    //
    const uniqueCustomers = useMemo(() => {
        return new Set(filteredOrders.map((o) => o.customerId)).size;
    }, [filteredOrders]);

    //
    // ─── 6) Valeur moyenne par commande (AOV) : on la calcule sur activeOrders car on veut rapporter le CA “effectif” au nombre de commandes “livrées”
    //
    //     Si vous préférez rapporter au nombre total de commandes (toutes statuts), changez totalDeliveredOrders.
    //
    const totalDeliveredOrders = useMemo(() => {
        return completedOrders.length;
    }, [completedOrders]);

    const averageOrderValue = useMemo(() => {
        return totalDeliveredOrders > 0
            ? totalRevenue / totalDeliveredOrders
            : 0;
    }, [totalRevenue, totalDeliveredOrders]);

    //
    // ─── 7) Taux de complétion (orderCompletionRate) : % des commandes livrées sur le total
    //
    const orderCompletionRate = useMemo(() => {
        return totalOrders > 0
            ? (completedOrders.length / totalOrders) * 100
            : 0;
    }, [completedOrders.length, totalOrders]);

    //
    // ─── 8) Calcul de spanDays (en comptant fromStart→toEnd)
    //
    const spanDays = useMemo(() => {
        if (!fromStart || !toEnd) return 0;
        // +1 pour que from===to compte pour 1 jour
        return differenceInDays(toEnd, fromStart) + 1;
    }, [fromStart, toEnd]);

    //
    // ─── 9) Déterminer la granularité (PeriodType) en fonction de spanDays
    //
    const period = useMemo<PeriodType>(() => {
        if (spanDays <= 1) return "journalière";
        if (spanDays <= 7) return "hebdomadaire";
        if (spanDays <= 30) return "mensuel";
        if (spanDays <= 90) return "trimestriel";
        return "annuel";
    }, [spanDays]);

    //
    // ─── 10) Fonction utilitaire pour sommer le CA par catégorie entre deux dates données
    //          → On ne garde que les commandes “delivered” dans sums, donc on réutilise “revenueOrders” filtrées.
    //
    const sumRevenueBetween = (startDate: Date, endDate: Date) => {
        const startTs = startOfDay(startDate).getTime();
        const endTs = endOfDay(endDate).getTime();

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
    // ─── 11) Définir la date de référence pour les tendances (soit toEnd, soit maintenant)
    //
    const referenceDate = toEnd ? toEnd : new Date();

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

    //
    // ─── 16) Retour final du hook
    //
    return {
        totalRevenue,
        revenueByCategory,
        totalOrders,
        totalOrdersByStatus,
        orderCompletionRate,
        uniqueCustomers,
        averageOrderValue,
        trendByCategory: {
            journalière: trendByCategoryDaily,
            hebdomadaire: trendByCategoryWeekly,
            mensuel: trendByCategoryMonthly,
            trimestriel: trendByCategoryQuarterly,
            annuel: trendByCategoryYearly,
        },
        globalTrend,
        period,
    };
}
