import { CategoryOutput, CategorySchema } from "./category.zod";
// @/src/lib/validators/product.zod.ts

import { z } from "zod";
import { OptionSchema } from "./option.zod";
import { MediaSchema } from "./media.zod";
import { PromotionSchema } from "./promotion.zod";
import { StockSchema } from "./stock.zod";
import { MarketingSchema } from "./marketing.zod";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Le nom du produit est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  price: z.coerce.number().nonnegative().optional(),
  unit: z
    .enum(["kg", "g", "l", "cl", "ml", "m2", "m3", "mL", "mL2", "mL3"])
    .optional(),
  unitPrice: z.coerce.number().nonnegative().optional(),
  // categoryId:     z.string().uuid().optional(), //decommenter pour la prod
  categoryId: z.string().optional(), // supprimer a la prod
  // subCategoryId:  z.string().uuid().optional(), //decommenter pour la prod
  subCategoryId: z.string().optional(), // supprimer a la prod
  options: z.array(OptionSchema).default([]),
  media: z.array(MediaSchema).optional(),
  promotion: PromotionSchema.optional(),
  marketing: MarketingSchema.optional(),
  attributes: z.record(z.any()).optional(),
  stock: StockSchema.optional(),
  status: z.enum(["available", "out_of_stock", "discontinued"]).optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;
export type ProductOutput = z.infer<typeof ProductSchema> & {
  id: string;
  category: CategoryOutput | null;
  reviewSummary: {
    averageRating: number;
    totalReviews: number;
  } | null;
  marketingStatus: object | null;
};
