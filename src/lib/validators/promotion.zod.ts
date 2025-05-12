import { z } from 'zod'

export const PromotionSchema = z.object({
  isOnSale: z.boolean().optional(),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  discountAmount: z.coerce.number().nonnegative().optional(),
  salePrice: z.coerce.number().nonnegative().optional(),
  saleStartDate: z.string().datetime().optional(),
  saleEndDate:   z.string().datetime().optional(),
})

export type PromotionInput = z.infer<typeof PromotionSchema>
