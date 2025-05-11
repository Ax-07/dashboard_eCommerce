// @/src/lib/validators/category.zod.ts

import { z } from "zod";

import { MediaSchema } from "./media.zod";

export const SubCategoriesSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Le nom est requis" }),
  slug: z.string().optional(),
  description: z.string().optional(),
  media: MediaSchema.optional(),
  parentId: z.string().uuid().optional(),
});

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Le nom est requis" }),
  slug: z.string().optional(),
  description: z.string().optional(),
  media: MediaSchema.optional(),
  parentId: z.string().uuid().optional(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
export type SubCategoryInput = z.infer<typeof SubCategoriesSchema>;

export type CategoryOutput = z.infer<typeof CategorySchema> & {
  subCategories?: SubCategoryOutput[];
}
export type SubCategoryOutput = z.infer<typeof SubCategoriesSchema>;