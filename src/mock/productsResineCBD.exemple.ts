import { ProductOutput } from "../lib/validators/product.zod";

export const CBD_RESIN: ProductOutput[] = [
  {
    id: "hash-kief-2025",
    name: "Kief Hash",
    description: `Kief Hash est une résines de CBD traditionnelle, riche en trichomes et offrant des arômes terreux avec une touche de noisette. Idéale pour la relaxation.`,
    price: 15.0,
    unit: "g",
    stock: { quantity: 120 },
    categoryId: "resines",
    subCategoryId: "kief",
    category: {
      id: "resines",
      name: "Résines",
      description: "Résines de CBD concentrée",
      media: {
        url: "https://images.unsplash.com/photo-1728762635815-27965508a98b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2JkJTIwaGFzaHxlbnwwfHwwfHx8Mg%3D%3D",
        alt: "Kief Hash CBD",
        type: "image",
      },
      subCategories: [
        { id:"kief", name: "Kief", description: "Fine poudre de trichomes" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "hash-kief-buy-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 8.0, totalPrice: 50 * 8.0 },
          { sku: "hash-kief-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 7.5, totalPrice: 100 * 7.5 },
          { sku: "hash-kief-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 7.0, totalPrice: 250 * 7.0 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "hash-kief-sell-1g", name: "1 g", quantity: 1, unit: "g", unitPrice: 1.8, totalPrice: 1 * 1.8 },
          { sku: "hash-kief-sell-2g", name: "2 g", quantity: 2, unit: "g", unitPrice: 1.7, totalPrice: 2 * 1.7 },
          { sku: "hash-kief-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 1.6, totalPrice: 5 * 1.6 }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pot de Kief Hash CBD",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.2, totalReviews: 14 },
    marketingStatus: null
  },
  {
    id: "bubble-hash-2025",
    name: "Bubble Hash",
    description: `Bubble Hash premium, extraction à l'eau glacée pour un produit sans solvant, aux arômes doux et floraux.`,
    price: 18.0,
    unit: "g",
    stock: { quantity: 80 },
    categoryId: "resines",
    subCategoryId: "bubble-hash",
    category: {
      id: "resines",
      name: "Résines",
      description: "Résines de CBD concentrée",
      subCategories: [
        { id:"bubble-hash", name: "Bubble Hash", description: "Extraction à l'eau" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "bubble-hash-buy-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 10.0, totalPrice: 50 * 10.0 },
          { sku: "bubble-hash-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 9.5, totalPrice: 100 * 9.5 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "bubble-hash-sell-1g", name: "1 g", quantity: 1, unit: "g", unitPrice: 2.2, totalPrice: 1 * 2.2 },
          { sku: "bubble-hash-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 2.0, totalPrice: 5 * 2.0 }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Sac de Bubble Hash CBD",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.7, totalReviews: 22 },
    marketingStatus: null
  },
  {
    id: "rosin-ice-rosin-2025",
    name: "Ice Rosin",
    description: `Ice Rosin artisanal, pressé à froid, sans solvants, offrant un profil terpénique intense avec des notes de pin.`,
    price: 25.0,
    unit: "g",
    stock: { quantity: 45 },
    categoryId: "resines",
    subCategoryId: "rosin",
    category: {
      id: "resines",
      name: "Résines",
      description: "Résines de CBD concentrée",
      subCategories: [
        { id:"rosin", name: "Rosin", description: "Pression à froid" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "rosin-ice-buy-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 18.0, totalPrice: 10 * 18.0 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "rosin-ice-sell-1g", name: "1 g", quantity: 1, unit: "g", unitPrice: 3.5, totalPrice: 1 * 3.5 },
          { sku: "rosin-ice-sell-2g", name: "2 g", quantity: 2, unit: "g", unitPrice: 3.0, totalPrice: 2 * 3.0 },
          { sku: "rosin-ice-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 2.8, totalPrice: 5 * 2.8 }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pot d'Ice Rosin CBD",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.8, totalReviews: 10 },
    marketingStatus: null
  },
  {
    id: "finger-hash-2025",
    name: "Finger Hash",
    description: `Finger Hash traditionnel, texture malléable et arômes boisés, conçu pour un usage quotidien.`,
    price: 14.0,
    unit: "g",
    stock: { quantity: 150 },
    categoryId: "resines",
    subCategoryId: "finger-hash",
    category: {
      id: "resines",
      name: "Résines",
      description: "Résines de CBD concentrée",
      subCategories: [
        { id:"finger-hash", name: "Finger Hash", description: "Hash pressé à la main" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "finger-hash-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 9.0, totalPrice: 100 * 9.0 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "finger-hash-sell-1g", name: "1 g", quantity: 1, unit: "g", unitPrice: 1.5, totalPrice: 1 * 1.5 },
          { sku: "finger-hash-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 1.4, totalPrice: 5 * 1.4 },
          { sku: "finger-hash-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 1.3, totalPrice: 10 * 1.3 }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Bloc de Finger Hash CBD",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.3, totalReviews: 18 },
    marketingStatus: null
  },
  {
    id: "rosin-live-2025",
    name: "Live Rosin",
    description: `Live Rosin extrait directement de fleurs fraîches pour préserver un maximum de terpènes et offrir un goût frais et floral.`,
    price: 30.0,
    unit: "g",
    stock: { quantity: 30 },
    categoryId: "resines",
    subCategoryId: "live-rosin",
    category: {
      id: "resines",
      name: "Résines",
      description: "Résines de CBD concentrée",
      subCategories: [
        { id:"live-rosin", name: "Live Rosin", description: "Extraction à froid de fleurs fraîches" }
      ]
    },
    options: [
      {
        id: "prixdachat",
        name: "Prix d'achat",
        values: [
          { sku: "rosin-live-buy-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 25.0, totalPrice: 5 * 25.0 }
        ]
      },
      {
        id: "prixdevente",
        name: "Prix de vente",
        values: [
          { sku: "rosin-live-sell-1g", name: "1 g", quantity: 1, unit: "g", unitPrice: 5.5, totalPrice: 1 * 5.5 },
          { sku: "rosin-live-sell-2g", name: "2 g", quantity: 2, unit: "g", unitPrice: 5.0, totalPrice: 2 * 5.0 },
          { sku: "rosin-live-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.5, totalPrice: 5 * 4.5 }
        ]
      }
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pot de Live Rosin CBD",
      type: "image",
      isPrimary: true
    }],
    reviewSummary: { averageRating: 4.9, totalReviews: 8 },
    marketingStatus: null
  }
];
