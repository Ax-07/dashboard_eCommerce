// @/src/mock/cart.mock.ts

import { CartInput } from "../lib/validators/cart.zod";

export const mockCarts: CartInput[] = [
  {
    id: "cart_aaa111bb22cc33dd44ee",
    userId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    createdAt: new Date("2025-05-12T10:00:00Z"),
    items: [
      {
        productId: "huile_spectre_complet-15pct-2025",
        productName: "Huile de CBD 10 %",
        sku: "CBD-OIL-10",
        quantity: 1,
        unitPrice: 29.99,
        totalPrice: 29.99,
      },
      {
        productId: "prod_24680",
        productName: "Gélules de CBD 5%",
        sku: "CBD-CAPS-5",
        quantity: 2,
        unitPrice: 19.99,
        totalPrice: 39.98,
      },
    ],
    updatedAt: new Date("2025-05-12T10:05:00Z"),
  },
  {
    id: "cart_bb222cc33dd44ee55ff",
    userId: "e7a1c2d3-4b5e-6f7a-8b9c-0d1e2f3a4b5c",
    createdAt: new Date("2025-05-13T15:30:00Z"),
    items: [
      {
        productId: "prod_13579",
        productName: "Baume réparateur CBD",
        sku: "CBD-REPAIR-BALM",
        quantity: 3,
        unitPrice: 34.50,
        totalPrice: 103.50,
      },
    ],
    updatedAt: new Date("2025-05-13T16:00:00Z"),
  },
];
