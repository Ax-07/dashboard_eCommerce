// @/src/lib/validators/option.zod.ts

import { z } from 'zod'

export const OptionValueSchema = z.object({
  sku: z.string().uuid().optional(),
  name: z.string().min(1, { message: "Le nom de la valeur est requis" }),
  quantity: z.number().int().min(0).optional(),
  unit: z.string().optional(),
  unitPrice: z.number().nonnegative().optional(),
  totalPrice: z.number().nonnegative().optional(),
  priceModifier: z.number().optional(),
  isDefault: z.boolean().optional(),
})

export type OptionValueInput = z.infer<typeof OptionValueSchema>

export const OptionSchema = z.object({
  id:     z.string().uuid().optional(),
  name:   z.string().min(1, { message: "Le nom de l'option est requis" }),
  productId: z.string().uuid().optional(),
  values:   z.array(OptionValueSchema).nonempty({ message: "Au moins une valeur est requise" }),
})

export type OptionInput = z.infer<typeof OptionSchema>
