// @/src/mock/review.mock.ts
import { ReviewInput } from "@/src/lib/validators/review.zod";

export const mockReviews: ReviewInput[] = [
  {
    id: "rev_111aaa222bbb333ccc",
    userId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    productId: "huile_spectre_complet-15pct-2025",
    productName: "Huile de CBD 10 %",
    rating: 5,
    comment: "Très bon produit, livraison rapide.",
    createdAt: new Date("2025-04-15T09:20:00Z"),
  },
  {
    id: "rev_444ddd555eee666fff",
    userId: "e7a1c2d3-4b5e-6f7a-8b9c-0d1e2f3a4b5c",
    productId: "prod_24680",
    productName: "Gélules de CBD 5%",
    rating: 4,
    comment: "Efficace, mais un peu cher.",
    createdAt: new Date("2025-05-01T14:45:00Z"),
  },
];
