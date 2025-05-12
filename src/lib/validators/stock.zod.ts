// @/src/lib/validators/stock.zod.ts

import { z } from 'zod'

export const StockSchema = z.object({
  quantity: z.coerce.number().int().min(0, { message: "La quantité doit être ≥ 0" }),
  min:      z.coerce.number().int().min(0).optional(),
  max:      z.coerce.number().int().min(0).optional(),
})

export type StockInput = z.infer<typeof StockSchema>
