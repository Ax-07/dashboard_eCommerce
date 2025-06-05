import { useMemo } from 'react';
import { OrderOutput } from '../lib/validators/order.zod';
import { differenceInDays } from 'date-fns';

export type PeriodType =
    | "journalière"
    | "hebdomadaire"
    | "mensuel"
    | "trimestriel"
    | "annuel";

interface UseOrderProps {
    orders: OrderOutput[];
    dateRange: { from: Date; to: Date };
}

/**
 * Hook pour gérer les commandes et les métriques associées.
 * Ce hook prend en entrée un tableau de commandes et une plage de dates,
 * et retourne les commandes filtrées par date, regroupées par statut,
 * ainsi que des métriques telles que le nombre total de commandes, le taux de complétion, etc.
 */
export const useOrders = ({ orders, dateRange }: UseOrderProps) => {
    const fromStart = dateRange.from;
    const toEnd = dateRange.to;

    /**
     * Vérifie si la plage de dates est valide.
     * Si fromStart est après toEnd, on inverse les dates.
     */
    const spanDays = useMemo(() => {
        if (!fromStart || !toEnd) return 0;
        // +1 pour que from===to compte pour 1 jour
        return differenceInDays(toEnd, fromStart) + 1;
    }, [fromStart, toEnd]);

    /**
     * Détermine la période en fonction de la plage de dates.
     * - Journalière si spanDays <= 1
     * - Hebdomadaire si spanDays <= 7
     * - Mensuel si spanDays <= 30
     * - Trimestriel si spanDays <= 90
     * - Annuel sinon
     */
    const period = useMemo<PeriodType>(() => {
        if (spanDays <= 1) return "journalière";
        if (spanDays <= 7) return "hebdomadaire";
        if (spanDays <= 30) return "mensuel";
        if (spanDays <= 90) return "trimestriel";
        return "annuel";
    }, [spanDays]);

    /**
     * Détermine la date de référence.
     * Si toEnd n'est pas défini, on utilise la date actuelle.
     */
    const referenceDate = toEnd ? toEnd : new Date();

    /**
     * Filtre les commandes en fonction de la plage de dates spécifiée.
     * Si aucune plage n'est spécifiée, retourne toutes les commandes.
     */
    const ordersByDateRange = useMemo(() => {
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

    /**
     * Regroupe les commandes par status.
     */
    const ordersByStatus = useMemo(() => {
        return ordersByDateRange.reduce((acc, order) => {
            if (!acc[order.status]) {
                acc[order.status] = [];
            }
            acc[order.status].push(order);
            return acc;
        }, {} as Record<string, OrderOutput[]>);
    }, [ordersByDateRange]);

    /**
     * Filtre les commandes pour ne garder que celles qui ont un statut de livré ou complété.
     */
    const completedOrders = useMemo(() => {
        return ordersByDateRange.filter((o) => ["delivered", "completed"].includes(o.status))
    }, [ordersByDateRange]);

    /**
     * Nombre total de commandes de la période sélectionner.
     */
    const totalOrders = useMemo(() => {
        return ordersByDateRange.length;
    }, [ordersByDateRange]);

    /**
     * Nombre total de commandes par status.
     */
    const totalOrdersByStatus = useMemo(() => {
        return ordersByDateRange.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }
            , {} as Record<string, number>);
    }, [ordersByDateRange]);

    /**
     * Calcul du taux de complétion des commandes.
     * Le taux de complétion est le pourcentage de commandes livrées ou complétées par rapport au nombre total de commandes.
     */
    const orderCompletionRate = useMemo(() => {
        return totalOrders > 0
            ? (completedOrders.length / totalOrders) * 100
            : 0;
    }, [completedOrders.length, totalOrders]);

    return {
        ordersByDateRange,
        ordersByStatus,
        completedOrders,
        totalOrders,
        totalOrdersByStatus,
        orderCompletionRate,
        period,
        referenceDate,
    };
}