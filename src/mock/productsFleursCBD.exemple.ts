import { ProductOutput } from "../lib/validators/product.zod";

const categoryMediaUrl = "https://images.unsplash.com/photo-1597266029701-618ac066150a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hcmlqdWFuYXxlbnwwfHwwfHx8MA%3D%3D";
const subCategoryMediaUrls = {
  greenhouse: "https://images.unsplash.com/photo-1518469669531-9b8c528f909d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFyaWp1YW5hfGVufDB8fDB8fHww",
  glasshouse: "https://images.unsplash.com/photo-1536669402438-004d53bd9af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hcmlqdWFuYXxlbnwwfHwwfHx8MA%3D%3D",
  indoor: "https://images.unsplash.com/photo-1590682751946-a65099676151?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  bio: "https://images.unsplash.com/photo-1591754060004-f91c95f5cf05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1hcmlqdWFuYXxlbnwwfHwwfHx8MA%3D%3D"
}

export const CBD_FLOWERS: ProductOutput[] = [
  {
    id: "og_kush-greenhouse-2025",
    name: "OG Kush greenhouse 2025",
    description: `OG Kush est une variété de cannabis très populaire, avec des effets puissants et son goût distinctif. Utilisée à des fins médicinales pour traiter stress, insomnie et douleur chronique.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "greenhouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs",
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      }, 
      subCategories: [{ 
        id: "greenhouse",
        name: "Greenhouse",
        slug: "greenhouse",
        description: "Fleurs cultivées en serre",
        media: {
          url: subCategoryMediaUrls.greenhouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }]
    },
    options: [
    { id: "prixdachat", name: "Prix d'achat", values: [
      { sku: "og_kush-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 0.65, totalPrice: 100 * 0.65 },
      { sku: "og_kush-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 0.6, totalPrice: 250 * 0.6 },
      { sku: "og_kush-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 0.5, totalPrice: 500 * 0.5 },
      { sku: "og_kush-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.45, totalPrice: 1000 * 0.45 },
      { sku: "og_kush-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.45, totalPrice: 5000 * 0.45 }
    ] },
    { id: "prixdevente", name: "Prix de vente", values: [
      { sku: "og_kush-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
      { sku: "og_kush-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
      { sku: "og_kush-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
      { sku: "og_kush-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
      { sku: "og_kush-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
    ] },
  ],
  media: [{
    url: "https://placehold.co/200x200",
    alt: "Pochette de fleurs de CBD AK-47",
    type: "image",
    isPrimary: true,
  }],
  reviewSummary: { averageRating: 4.5, totalReviews: 30 },
  marketingStatus: {
    isFeatured: true,
    isBestSeller: false,
    isLimitedEdition: false,
    isNew: true,
    isPopular: false,
    isTrending: false,
  }
  },
  {
    id: "ak_47-indoor-2025",
    name: "AK-47 Indoor",
    description: `Fleur de CBD AK 47 française, une variété Indoor d'exception. Dense et compacte, elle dégage une odeur puissante et caractéristique, accompagnée d'un effet notable. Ses arômes naturels, rappelant les fruits des bois. Fleur de CBD AK 47 française, une variété Indoor d'exception. Dense et compacte, elle dégage une odeur puissante et caractéristique, accompagnée d'un effet notable. Ses arômes naturels, rappelant les fruits des bois.`,
    price: 2.8,
    unit: "g",
    stock: {
      quantity: 450
    },
    categoryId: "fleurs",
    subCategoryId: "indoor",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées", 
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "indoor",
        name: "Indoor", 
        description: "Fleurs cultivées en intérieur",
        media: {
          url: subCategoryMediaUrls.indoor,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachatsmallbuds", name: "Prix d'achat small buds", values: [
        { sku: "AK_47-sb-buy-100g", name: "Small buds 100 g", quantity: 100, unit: "g", unitPrice: 1.1, totalPrice: 100 * 1.1 },
        { sku: "AK_47-sb-buy-250g", name: "Small buds 250 g", quantity: 250, unit: "g", unitPrice: 0.8, totalPrice: 250 * 0.8 },
        { sku: "AK_47-sb-buy-500g", name: "Small buds 500 g", quantity: 500, unit: "g", unitPrice: 0.8, totalPrice: 500 * 0.8 },
        { sku: "AK_47-sb-buy-1000g", name: "Small buds 1000 g", quantity: 1000, unit: "g", unitPrice: 0.6, totalPrice: 1000 * 0.6 },
        { sku: "AK_47-sb-buy-5000g", name: "Small buds 5000 g", quantity: 5000, unit: "g", unitPrice: 0.55, totalPrice: 5000 * 0.55 }
      ] },
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "AK_47-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.8, totalPrice: 100 * 1.8 },
        { sku: "AK_47-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.5, totalPrice: 250 * 1.5 },
        { sku: "AK_47-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.35, totalPrice: 500 * 1.35 },
        { sku: "AK_47-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 1.20, totalPrice: 1000 * 1.20 },
        { sku: "AK_47-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.95, totalPrice: 5000 * 0.95 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "AK_47-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "AK_47-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "AK_47-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "AK_47-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "AK_47-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
      isNew: true,
      isPopular: false,
      isTrending: false,
    }
  },
  {
    id: "white_widow-2025",
    name: "White Widow 2025",
    description: `Notre White Widow une magnifique fleur de CBD à l'aspect bien verte et des saveurs agrumes et de cannabis puissant ! Le meilleur rapport/qualité prix. Des buds magnifiques de couleurs vertes qui la rend exceptionnelle !`,
    price: 2.8,
    unit: "g",
    stock: {
      quantity: 250
    },
    categoryId: "fleurs",
    subCategoryId: "indoor",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "indoor",
        name: "Indoor", 
        description: "Cultivée en intérieur",
        media: {
          url: subCategoryMediaUrls.indoor,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "white_widow-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.2, totalPrice: 100 * 1.2 },
        { sku: "white_widow-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.1, totalPrice: 250 * 1.1 },
        { sku: "white_widow-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1, totalPrice: 500 * 1 },
        { sku: "white_widow-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.89, totalPrice: 1000 * 0.89 },
        { sku: "white_widow-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.85, totalPrice: 5000 * 0.85 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "white_widow-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "white_widow-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "white_widow-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "white_widow-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "white_widow-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
      isPopular: false,
      isTrending: false,
    }
  },
  {
    id: "orange_vbio-glasshouse-2025",
    name: "Orange bud",
    description: `Variété exclusive Orange CBDV en Glasshouse, goût agrumes, concentration CBDV élevée.`,
    price: 2.8,
    unit: "g",
    stock: {
      quantity: 250
    },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée premium",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "orange_vbio-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.1, totalPrice: 100 * 1.1 },
        { sku: "orange_vbio-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1, totalPrice: 250 * 1 },
        { sku: "orange_vbio-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 0.9, totalPrice: 500 * 0.9 },
        { sku: "orange_vbio-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.79, totalPrice: 1000 * 0.79 },
        { sku: "orange_vbio-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.73, totalPrice: 5000 * 0.73 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "orange_vbio-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "orange_vbio-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "orange_vbio-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "orange_vbio-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "orange_vbio-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
      isPopular: false,
      isTrending: false,
    }
  },
  {
    id: "gorilla_glue–greenhouse-2025",
    name: "Gorilla Glue",
    description: `Gorilla Glue offre un profil aromatique terreux et boisé, têtes élégantes.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "greenhouse",
        name: "Greenhouse", 
        description: "Serre contrôlée",
        media: {
          url: subCategoryMediaUrls.greenhouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "gorilla_glue-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.1, totalPrice: 100 * 1.1 },
        { sku: "gorilla_glue-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1, totalPrice: 250 * 1 },
        { sku: "gorilla_glue-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 0.9, totalPrice: 500 * 0.9 },
        { sku: "gorilla_glue-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.79, totalPrice: 1000 * 0.79 },
        { sku: "gorilla_glue-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.73, totalPrice: 5000 * 0.73 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "gorilla_glue-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "gorilla_glue-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "gorilla_glue-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "gorilla_glue-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "gorilla_glue-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
      isPopular: false,
      isTrending: false,
    }
  },
  {
    id: "bubba_kush–glasshouse-2025",
    name: "Bubba Kush",
    description: `Bubba Kush puissance brute, beauté exceptionnelle.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée premium",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "bubba_kush-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.1, totalPrice: 100 * 1.1 },
        { sku: "bubba_kush-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1, totalPrice: 250 * 1 },
        { sku: "bubba_kush-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 0.9, totalPrice: 500 * 0.9 },
        { sku: "bubba_kush-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.79, totalPrice: 1000 * 0.79 },
        { sku: "bubba_kush-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.73, totalPrice: 5000 * 0.73 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "bubba_kush-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "bubba_kush-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "bubba_kush-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "bubba_kush-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "bubba_kush-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
      isPopular: false,
      isTrending: false,
    }
  },
  {
    id: "blueberry_dream-greenhouse-2025",
    name: "Blueberry Dream",
    description: `Blueberry Dream cultivée en Greenhouse Rhône-Alpes, idéale pour la relaxation nocturne.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "greenhouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées", 
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "greenhouse",
        name: "Greenhouse", 
        description: "Serre contrôlée",
        media: {
          url: subCategoryMediaUrls.greenhouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "blueberry_dream-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.3, totalPrice: 100 * 1.3 },
        { sku: "blueberry_dream-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.2, totalPrice: 250 * 1.2 },
        { sku: "blueberry_dream-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.1, totalPrice: 500 * 1.1 },
        { sku: "blueberry_dream-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.99, totalPrice: 1000 * 0.99 },
        { sku: "blueberry_dream-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.93, totalPrice: 5000 * 0.93 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "blueberry_dream-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "blueberry_dream-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "blueberry_dream-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "blueberry_dream-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "blueberry_dream-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
      isPopular: false,
      isTrending: false,
    }
  },
  {
    id: "strawberry-glasshouse-2025",
    name: "Strawberry",
    description: `La Strawberry, cultiver sous notre serre haute technologie en verre et éclairée, la Strawberry est une merveille tant par sa texture que par son gout de fraise et fruits des bois.
    Une magnifique et parfumée fleurs de CBD Strawberry en small buds. De notre culture Greenhouse 2025. 
    La qualité parfaite de notre strawberry, dans un format cool price ! Fruit d'une culture dédiée à l'excellence, se distinguant par une texture unique et des saveurs de fruits rouges. 100% naturelles.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée++",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachatsmallbuds", name: "Prix d'achat small buds", values: [
        { sku: "strawberry-sb-buy-500g", name: "Small buds 500 g", quantity: 500, unit: "g", unitPrice: 0.3, totalPrice: 500 * 0.3 },
        { sku: "strawberry-sb-buy-1000g", name: "Small buds 1000 g", quantity: 1000, unit: "g", unitPrice: 0.2, totalPrice: 1000 * 0.2 },
        { sku: "strawberry-sb-buy-5000g", name: "Small buds 5000 g", quantity: 5000, unit: "g", unitPrice: 0.18, totalPrice: 5000 * 0.18 }
      ] },
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "strawberry-buy-100g", name: "Small buds 100 g", quantity: 100, unit: "g", unitPrice: 0.65, totalPrice: 100 * 0.65 },
        { sku: "strawberry-buy-250g", name: "Small buds 250 g", quantity: 250, unit: "g", unitPrice: 0.6, totalPrice: 250 * 0.6 },
        { sku: "strawberry-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 0.5, totalPrice: 500 * 0.5 },
        { sku: "strawberry-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.45, totalPrice: 1000 * 0.45 },
        { sku: "strawberry-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.45, totalPrice: 5000 * 0.45 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "strawberry-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "strawberry-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "strawberry-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "strawberry-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "strawberry-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
    },
  },
  {
    id: "orange_V2-premium-glasshouse-2025",
    name: "Orange bud V2",
    description: `Orange V2 génétique exclusive, saveurs d'agrumes, buds nuancés et résineux.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre premium",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "orange_V2-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.3, totalPrice: 100 * 1.3 },
        { sku: "orange_V2-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.2, totalPrice: 250 * 1.2 },
        { sku: "orange_V2-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.1, totalPrice: 500 * 1.1 },
        { sku: "orange_V2-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.99, totalPrice: 1000 * 0.99 },
        { sku: "orange_V2-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.93, totalPrice: 5000 * 0.93 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "orange_V2-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "orange_V2-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "orange_V2-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "orange_V2-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "orange_V2-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
    },
  },
  {
    id: "dark_devil-glasshouse-2025",
    name: "Dark Devil",
    description: `Dark Devil premium Glasshouse, fleur de CBD irrésistible par son aspect et ses parfums.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée++",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "orange_V2-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.3, totalPrice: 100 * 1.3 },
        { sku: "orange_V2-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.2, totalPrice: 250 * 1.2 },
        { sku: "orange_V2-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.1, totalPrice: 500 * 1.1 },
        { sku: "orange_V2-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.99, totalPrice: 1000 * 0.99 },
        { sku: "orange_V2-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.93, totalPrice: 5000 * 0.93 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "orange_V2-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "orange_V2-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "orange_V2-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "orange_V2-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "orange_V2-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
    },
  },
  {
    id: "cannatonic-glasshouse-2025",
    name: "Cannatonic",
    description: `La Cannatonic Glasshouse 2025, variété apaisante aux arômes doux.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachatsmallbuds", name: "Prix d'achat small buds", values: [
        { sku: "cannatonic-sb-buy-500g", name: "Small buds 500 g", quantity: 500, unit: "g", unitPrice: 0.3, totalPrice: 500 * 0.3 },
        { sku: "cannatonic-sb-buy-1000g", name: "Small buds 1000 g", quantity: 1000, unit: "g", unitPrice: 0.2, totalPrice: 1000 * 0.2 },
        { sku: "cannatonic-sb-buy-5000g", name: "Small buds 5000 g", quantity: 5000, unit: "g", unitPrice: 0.18, totalPrice: 5000 * 0.18 }
      ] },
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "cannatonic-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.3, totalPrice: 100 * 1.3 },
        { sku: "cannatonic-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.2, totalPrice: 250 * 1.2 },
        { sku: "cannatonic-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.1, totalPrice: 500 * 1.1 },
        { sku: "cannatonic-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.99, totalPrice: 1000 * 0.99 },
        { sku: "cannatonic-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.93, totalPrice: 5000 * 0.93 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "cannatonic-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "cannatonic-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "cannatonic-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "cannatonic-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "cannatonic-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
    },
  },
  {
    id: "lemon_tonic-glasshouse-2025",
    name: "Lemon Tonic",
    description: `Notre Lemon Tonic, est une nouvelle génétique exclue chez Jungle Grower. Avec des buds denses et grasses, elle donne la sensation qu'elle sera très apaisante, avec sa belle couleur verte et de nombreux trichomes collants qui dégagent une odeur subtile d'agrumes et de citrons.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: {
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "orange_V2-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.3, totalPrice: 100 * 1.3 },
        { sku: "orange_V2-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.2, totalPrice: 250 * 1.2 },
        { sku: "orange_V2-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.1, totalPrice: 500 * 1.1 },
        { sku: "orange_V2-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.99, totalPrice: 1000 * 0.99 },
        { sku: "orange_V2-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.93, totalPrice: 5000 * 0.93 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "orange_V2-sell-10g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "orange_V2-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "orange_V2-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "orange_V2-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "orange_V2-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
    },
  },
  {
    id: "mandarine_Kush-glasshouse-2025",
    name: "Mandarine Kush",
    description: `Mandarine Kush Indoor, buds denses, arômes mandarine et cuir.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "mandarine_Kush-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 0.8, totalPrice: 100 * 0.8 },
        { sku: "mandarine_Kush-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 0.7, totalPrice: 250 * 0.7 },
        { sku: "mandarine_Kush-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 0.6, totalPrice: 500 * 0.6 },
        { sku: "mandarine_Kush-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.49, totalPrice: 1000 * 0.49 },
        { sku: "mandarine_Kush-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.45, totalPrice: 5000 * 0.45 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "mandarine_Kush-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "mandarine_Kush-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "mandarine_Kush-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "mandarine_Kush-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "mandarine_Kush-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      isLimitedEdition: false,
    },
  },
  {
    id: "lemon_haze-Indoor-2025",
    name: "Lemon Haze",
    description: `Lemon Haze Indoor, têtes denses, arôme citronné vivifiant.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "indoor",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "indoor",
        name: "Indoor", 
        description: "Culture intérieure",
        media: {
          url: subCategoryMediaUrls.indoor,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "lemon_haze-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.5, totalPrice: 100 * 1.5 },
        { sku: "lemon_haze-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.4, totalPrice: 250 * 1.4 },
        { sku: "lemon_haze-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.3, totalPrice: 500 * 1.3 },
        { sku: "lemon_haze-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 1.2, totalPrice: 1000 * 1.2 },
        { sku: "lemon_haze-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 1, totalPrice: 5000 * 1 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "lemon_haze-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "lemon_haze-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "lemon_haze-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "lemon_haze-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "lemon_haze-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      isLimitedEdition: false,
    },
  },
  {
    id: "orange_cbdv-2024",
    name: "Orange bud bio",
    description: `Orange CBDV Bio 2024, saveur agrumes, concentration CBDV élevée.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "bio",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "bio",
        name: "Bio", 
        description: "Cultivée en agriculture biologique",
        media: {
          url: subCategoryMediaUrls.bio,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "orange_cbdv-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1, totalPrice: 100 * 1 },
        { sku: "orange_cbdv-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 0.86, totalPrice: 250 * 0.86 },
        { sku: "orange_cbdv-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 0.8, totalPrice: 500 * 0.8 },
        { sku: "orange_cbdv-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 0.75, totalPrice: 1000 * 0.75 },
        { sku: "orange_cbdv-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.7, totalPrice: 5000 * 0.7 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "orange_cbdv-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "orange_cbdv-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "orange_cbdv-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "orange_cbdv-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "orange_cbdv-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      isLimitedEdition: false,
    },
  },
  {
    id: "purple_haze-glasshouse-2025",
    name: "Purple Haze",
    description: `Purple Haze Glasshouse+, perle violette aux reflets et arômes fruités.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "purple_haze-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.5, totalPrice: 100 * 1.5 },
        { sku: "purple_haze-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.4, totalPrice: 250 * 1.4 },
        { sku: "purple_haze-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.3, totalPrice: 500 * 1.3 },
        { sku: "purple_haze-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 1.2, totalPrice: 1000 * 1.2 },
        { sku: "purple_haze-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 1, totalPrice: 5000 * 1 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "purple_haze-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "purple_haze-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "purple_haze-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "purple_haze-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "purple_haze-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      isLimitedEdition: false,
    },
  },
  { 
    id: "moon-rock-kief",
    name: "Moon Rock – Kief",
    description: `Notre Moon Rocks avec taux de CBD élévé, a une texture et une apparence uniques, avec une couche de kief qui recouvre la fleur, donnant une couleur verte, dorée ou brunâtre.`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "glasshouse",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs",
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "glasshouse",
        name: "Glasshouse", 
        description: "Serre vitrée",
        media: {
          url: subCategoryMediaUrls.glasshouse,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "purple_haze-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.5, totalPrice: 100 * 1.5 },
        { sku: "purple_haze-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.4, totalPrice: 250 * 1.4 },
        { sku: "purple_haze-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.3, totalPrice: 500 * 1.3 },
        { sku: "purple_haze-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 1.2, totalPrice: 1000 * 1.2 },
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "purple_haze-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.4, totalPrice: 5 * 4.4 },
        { sku: "purple_haze-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4, totalPrice: 10 * 4 },
        { sku: "purple_haze-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 3.6, totalPrice: 25 * 3.6 },
        { sku: "purple_haze-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.2, totalPrice: 50 * 3.2, isDefault: true },
        { sku: "purple_haze-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 2.8, totalPrice: 100 * 2.8 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      isLimitedEdition: false,
    },
  },
  { 
    id: "bubble_gum-indoor-2025",
    name: "BubbleGum Indoor 2025", 
    description: `Une génétique exclu de chez Jungle Grower, la Bubble Gum Indoo Hydro, la perfection incarnée ! Couleur verte magnifique, texture compacte, parfum de fruits et de bonbons. La best-seller de vos boutiques !`,
    price: 2.8,
    unit: "g",
    stock: { quantity: 250 },
    categoryId: "fleurs",
    subCategoryId: "indoor",
    category: { 
      id: "fleurs",
      name: "Fleurs",
      slug: "fleurs", 
      description: "Fleurs de CBD séchées",
      media: {
        url: categoryMediaUrl,
        alt: "Pochette de fleurs de CBD AK-47",
        type: "image",
        isPrimary: true,
      },
      subCategories: [{ 
        id: "indoor",
        name: "Indoor",
        description: "Culture intérieure",
        media: {
          url: subCategoryMediaUrls.indoor,
          alt: "Photo de fleurs de CBD AK-47",
          type: "image",
          isPrimary: true,
        }
      }] 
    },
    options: [
      { id: "prixdachat", name: "Prix d'achat", values: [
        { sku: "bubbleGum-buy-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 1.8, totalPrice: 100 * 1.8 },
        { sku: "bubbleGum-buy-250g", name: "250 g", quantity: 250, unit: "g", unitPrice: 1.5, totalPrice: 250 * 1.5 },
        { sku: "bubbleGum-buy-500g", name: "500 g", quantity: 500, unit: "g", unitPrice: 1.35, totalPrice: 500 * 1.35 },
        { sku: "bubbleGum-buy-1000g", name: "1000 g", quantity: 1000, unit: "g", unitPrice: 1.2, totalPrice: 1000 * 1.2 },
        { sku: "bubbleGum-buy-5000g", name: "5000 g", quantity: 5000, unit: "g", unitPrice: 0.95, totalPrice: 5000 * 0.95 }
      ] },
      { id: "prixdevente", name: "Prix de vente", values: [
        { sku: "bubbleGum-sell-5g", name: "5 g", quantity: 5, unit: "g", unitPrice: 4.8, totalPrice: 5 * 4.8 },
        { sku: "bubbleGum-sell-10g", name: "10 g", quantity: 10, unit: "g", unitPrice: 4.4, totalPrice: 10 * 4.4 },
        { sku: "bubbleGum-sell-25g", name: "25 g", quantity: 25, unit: "g", unitPrice: 4, totalPrice: 25 * 4 },
        { sku: "bubbleGum-sell-50g", name: "50 g", quantity: 50, unit: "g", unitPrice: 3.6, totalPrice: 50 * 3.6, isDefault: true },
        { sku: "bubbleGum-sell-100g", name: "100 g", quantity: 100, unit: "g", unitPrice: 3.2, totalPrice: 100 * 3.2 },
      ] },
    ],
    media: [{
      url: "https://placehold.co/200x200",
      alt: "Pochette de fleurs de CBD AK-47",
      type: "image",
      isPrimary: true,
    }],
    reviewSummary: { averageRating: 4.5, totalReviews: 30 },
    marketingStatus: {
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      isLimitedEdition: false,
    },
  }
];