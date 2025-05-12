import { z } from "zod";

export const ReviewSchema = z.object({
  id: z.string().uuid().optional(),
    productId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    rating: z.number().min(1).max(5),
})

export type ReviewInput = z.infer<typeof ReviewSchema>;
export type ReviewOutput = z.infer<typeof ReviewSchema> & {
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
    };