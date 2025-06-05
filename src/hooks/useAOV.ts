import { OrderOutput } from "../lib/validators/order.zod";

interface UseAOVProps {
    orders: OrderOutput[];
}

/**
 * Hook pour calculer la valeur moyenne des commandes (AOV - Average Order Value).
 * Ce hook prend en entrée un tableau de commandes et retourne la valeur moyenne des commandes.
 */
export const useAOV = ({ orders }: UseAOVProps) => {
    /**
     * Calcule la valeur moyenne des commandes (AOV).
     * On utilise Object.values pour obtenir les valeurs du revenueByCategory
     * et on les additionne pour obtenir le total.
     */
    const averageOrderValue = orders.reduce((total, order) => {
        const orderTotal = order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        return total + orderTotal;
    }, 0) / (orders.length || 1); // Evite la division par zéro

    return {
        averageOrderValue,
    };
};