import { ProductOutput } from "../lib/validators/product.zod";

export const ELIQUIDS: ProductOutput[] = [
  {
    id: "eliquid-fruits-100-2025",
    name: "Fruits Rouges 100ml",
    description: `E-liquides arôme fruits rouges, mélange de fraise, framboise et cassis pour une vape gourmande.`,
    price: 12.5,
    unit: "ml",
    stock: { quantity: 200 },
    categoryId: "eliquides",
    subCategoryId: "fruits",
    category: {
      id: "eliquides",
      name: "E-liquides",
      description: "Liquides pour cigarette électronique",
      media: {
        url: "https://images.unsplash.com/photo-1601568656042-65dc282bd537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2JkJTIwZSUyMGxpcXVpZHxlbnwwfHwwfHx8Mg%3D%3D",
        alt: "Flacon d'e-liquides fruits rouges",
        type: "image",
      },
      subCategories: [
        { id:"fruits", name: "Fruits", description: "Arômes fruités" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "eliquid-fruits-buy-100ml", name: "100 ml", quantity: 100, unit: "ml", unitPrice: 0.10, totalPrice: 100 * 0.10 },
          { sku: "eliquid-fruits-buy-500ml", name: "500 ml", quantity: 500, unit: "ml", unitPrice: 0.095, totalPrice: 500 * 0.095 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "eliquid-fruits-sell-10ml", name: "10 ml", quantity: 10, unit: "ml", unitPrice: 1.5, totalPrice: 10 * 1.5, isDefault: true },
          { sku: "eliquid-fruits-sell-30ml", name: "30 ml", quantity: 30, unit: "ml", unitPrice: 1.3, totalPrice: 30 * 1.3 }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Flacon d'e-liquides fruits rouges",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.3, totalReviews: 25 },
    marketingStatus: {
      isFeatured: true,
      isBestSeller: true,
      isTrending: false,
      isPopular: true,
      isNew: false,
      isLimitedEdition: false,
    }
  },
  {
    id: "eliquid-menthol-50-2025",
    name: "Menthol 50ml",
    description: `E-liquides arôme menthol intense, sensation fraîche et rafraîchissante.`,
    price: 8.0,
    unit: "ml",
    stock: { quantity: 150 },
    categoryId: "eliquides",
    subCategoryId: "menthol",
    category: {
      id: "eliquides",
      name: "E-liquides",
      description: "Liquides pour cigarette électronique",
      subCategories: [
        { id:"menthol", name: "Menthol", description: "Arômes frais" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "eliquid-menthol-buy-50ml", name: "50 ml", quantity: 50, unit: "ml", unitPrice: 0.12, totalPrice: 50 * 0.12 },
          { sku: "eliquid-menthol-buy-100ml", name: "100 ml", quantity: 100, unit: "ml", unitPrice: 0.11, totalPrice: 100 * 0.11 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "eliquid-menthol-sell-10ml", name: "10 ml", quantity: 10, unit: "ml", unitPrice: 1.2, totalPrice: 10 * 1.2, isDefault: true },
          { sku: "eliquid-menthol-sell-20ml", name: "20 ml", quantity: 20, unit: "ml", unitPrice: 1.1, totalPrice: 20 * 1.1 }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Flacon d'e-liquides menthol",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.0, totalReviews: 18 },
    marketingStatus: {
      isFeatured: false,
      isBestSeller: true,
      isTrending: false,
      isPopular: true,
      isNew: false,
      isLimitedEdition: false,
    }
  },
  {
    id: "eliquid-tobacco-100-2025",
    name: "Classic Tobacco 100ml",
    description: `E-liquides classic tobacco, goût tabac blond doux et légèrement sucré.`,
    price: 13.0,
    unit: "ml",
    stock: { quantity: 100 },
    categoryId: "eliquides",
    subCategoryId: "classic",
    category: {
      id: "eliquides",
      name: "E-liquides",
      description: "Liquides pour cigarette électronique",
      subCategories: [
        { id:"classic", name: "Classic", description: "Arômes de tabac" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "eliquid-tobacco-buy-100ml", name: "100 ml", quantity: 100, unit: "ml", unitPrice: 0.11, totalPrice: 100 * 0.11 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "eliquid-tobacco-sell-10ml", name: "10 ml", quantity: 10, unit: "ml", unitPrice: 1.35, totalPrice: 10 * 1.35, isDefault: true }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Flacon d'e-liquides classic tobacco",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 20 },
    marketingStatus: {
      isFeatured: true,
      isBestSeller: false,
      isTrending: true,
      isPopular: true,
      isNew: false,
      isLimitedEdition: false,
    }
  },
  {
    id: "eliquid-dessert-60-2025",
    name: "Vanille Custard 60ml",
    description: `E-liquides dessert vanille custard, crème onctueuse parfumée à la vanille bourbon.`,
    price: 10.0,
    unit: "ml",
    stock: { quantity: 140 },
    categoryId: "eliquides",
    subCategoryId: "dessert",
    category: {
      id: "eliquides",
      name: "E-liquides",
      description: "Liquides pour cigarette électronique",
      subCategories: [
        { id:"dessert", name: "Dessert", description: "Arômes gourmands" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "eliquid-dessert-buy-60ml", name: "60 ml", quantity: 60, unit: "ml", unitPrice: 0.13, totalPrice: 60 * 0.13 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "eliquid-dessert-sell-10ml", name: "10 ml", quantity: 10, unit: "ml", unitPrice: 1.4, totalPrice: 10 * 1.4, isDefault: true }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Flacon d'e-liquides vanille custard",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.6, totalReviews: 22 },
    marketingStatus: {
      isFeatured: false,
      isBestSeller: true,
      isTrending: false,
      isPopular: true,
      isNew: false,
      isLimitedEdition: false,
    }
  },
  {
    id: "eliquid-tao-50-2025",
    name: "Tao Thé Vert 50ml",
    description: `E-liquides thé vert matcha, notes fraîches et légèrement herbacées.`,
    price: 9.0,
    unit: "ml",
    stock: { quantity: 130 },
    categoryId: "eliquides",
    subCategoryId: "boisson",
    category: {
      id: "eliquides",
      name: "E-liquides",
      description: "Liquides pour cigarette électronique",
      subCategories: [
        { id:"boisson", name: "Boisson", description: "Arômes boissons" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "eliquid-tao-buy-50ml", name: "50 ml", quantity: 50, unit: "ml", unitPrice: 0.12, totalPrice: 50 * 0.12 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "eliquid-tao-sell-10ml", name: "10 ml", quantity: 10, unit: "ml", unitPrice: 1.25, totalPrice: 10 * 1.25, isDefault: true }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Flacon d'e-liquides thé vert",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.2, totalReviews: 16 },
    marketingStatus: {
      isFeatured: true,
      isBestSeller: false,
      isTrending: false,
      isPopular: true,
      isNew: false,
      isLimitedEdition: false,
    }
  }
];
