import { z } from "zod";

export const CartSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      productName: z.string(),
      sku: z.string(),
      quantity: z.number().min(1).max(100),
      unitPrice: z.number().min(0),
      totalPrice: z.number().min(0),
    })
  ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CartInput = z.infer<typeof CartSchema>;
