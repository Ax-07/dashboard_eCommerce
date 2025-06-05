import { OrderOutput } from "../lib/validators/order.zod";

interface UseCustomerMetricsProps {
    orders: OrderOutput[];
}

/**
 * Hook pour calculer les métriques des clients.
 * Ce hook prend en entrée un tableau de commandes et retourne les métriques des clients.
 */
export const useCustomerMetrics = ({ orders }: UseCustomerMetricsProps) => {
    /**
     * Calcule le nombre total de clients uniques.
     * On utilise un Set pour stocker les IDs uniques des clients.
     */
    const uniqueCustomers = new Set(orders.map(order => order.customerId));
    const totalUniqueCustomers = uniqueCustomers.size;

    /**
     * Calcule le nombre total de commandes par client.
     * On utilise un objet pour stocker le nombre de commandes par client.
     */
    const ordersByCustomer: Record<string, number> = {};
    orders.forEach(order => {
        if (order.customerId !== undefined) {
            if (ordersByCustomer[order.customerId]) {
                ordersByCustomer[order.customerId]++;
            } else {
                ordersByCustomer[order.customerId] = 1;
            }
        }
    });

    /**
     * Calcule le nombre moyen de commandes par client.
     * On divise le nombre total de commandes par le nombre total de clients uniques.
     * Si un client n'a pas de commandes, on considère que son nombre de commandes est 0.
     */
    const averageOrdersPerCustomer = totalUniqueCustomers > 0
        ? Object.values(ordersByCustomer).reduce((sum, count) => sum + count, 0) / totalUniqueCustomers
        : 0;

    /**
     * Calcule le revenu moyen par client.
     * On additionne le total des montants des commandes et on divise par le nombre total de clients uniques.
     * Si un client n'a pas de commandes, on considère que son revenu est 0.
     */
    const averageRevenuePerCustomer = totalUniqueCustomers > 0
        ? orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0) / totalUniqueCustomers
        : 0;

    return {
        totalUniqueCustomers,
        ordersByCustomer,
        averageOrdersPerCustomer,
        averageRevenuePerCustomer,
    };
}