import React, { useMemo } from 'react';
import { OrderOutput } from '../lib/validators/order.zod';

interface UseOrderProps {
    orders: OrderOutput[];
    dateRange: { from: Date; to: Date };
}

const useOrders = ({ orders, dateRange }: UseOrderProps) => {
    const fromStart = dateRange.from;
    const toEnd = dateRange.to;

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
    };
}

export default useOrders;