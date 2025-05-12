import { ELIQUIDS } from "./productsEliquideCBD.exemple";
import { CBD_FLOWERS } from "./productsFleursCBD.exemple";
import { CBD_OILS } from "./productsHuileCBD.exemple";
import { CBD_RESIN } from "./productsResineCBD.exemple";
import { ProductOutput } from "../lib/validators/product.zod";
import { CategoryOutput, SubCategoryOutput } from "../lib/validators/category.zod";
import { mockOrder } from "./order.mock";


export const PRODUCTS = [
  ...CBD_OILS,
  ...CBD_FLOWERS,
  ...CBD_RESIN,
  ...ELIQUIDS,
];

export const ORDER = [
  ...mockOrder
]

export const getCategories = (products: ProductOutput[]) => {
  const categories = new Set<string>();
  products.reduce((acc, product) => {
    if (product.category) {
      categories.add(product.category.name);
    }
    return acc;
  }, []);
  return Array.from(categories).map((category) => ({ name: category }));
};

export const getCategoriesWithSubcategories = (products: ProductOutput[]) => {
  const map = new Map<string, CategoryOutput>();

  products.forEach((product) => {
    const category = product.category;
    if (!category) return;

    const catId = category.id;
    const catName = category.name;
    const catDesc = category.description ?? "Aucune description fournie.";
    const media = category.media

    // Crée la catégorie si elle n'existe pas encore dans la map
    if (!map.has(catName)) {
      map.set(catName, {
        id: catId,
        name: catName,
        description: catDesc,
        media: media,
        subCategories: [],
      });
    }

    // Récupère le tableau existant
    const entry = map.get(catName)!;

    // Parcours des sous-catégories définies sur le produit
    const subs = Array.isArray(category.subCategories)
      ? category.subCategories
      : [];

    if (subs.length === 0) {
      // Cas où aucun subcategory n'est fourni
      if (!entry?.subCategories?.some((s) => s.name === "Autres")) {
        entry.subCategories?.push({
          name: "Autres",
          description: "",
        });
      }
    } else {
      subs.forEach((sub: SubCategoryOutput) => {
        const subId = sub.id;
        const subName = sub.name;
        const subDesc = sub.description ?? "";
        const subMedia = sub.media;
        if (!entry.subCategories?.some((s) => s.name === subName)) {
          entry.subCategories?.push({
            id: subId,
            name: subName,
            description: subDesc,
            media: subMedia,
          });
        }
      });
    }
  });

  // On retourne un tableau des valeurs de la map
  return Array.from(map.values());
};

const getCategoryPaths = (cat: CategoryOutput): string[] => {
  console.log('cat', cat); // Affiche la catégorie courante
  const path = [cat.name];
  if (cat.subCategories && cat.subCategories.length) {
    // Pour simplifier, on prend la première sous‑catégorie imbriquée
    // (si vous en avez plusieurs, il faudra adapter la logique).
    return path.concat(getCategoryPaths(cat.subCategories[0]));
  }
  return path;
}
const path = getCategoryPaths(PRODUCTS[0].category!);
console.log('path', path); // Affiche le chemin de la catégorie

export const PRODUCTS_CATEGORIES = getCategories(PRODUCTS); console.log('PRODUCTS_CATEGORIES', PRODUCTS_CATEGORIES); // Affiche les catégories uniques
export const PRODUCTS_CATEGORIES_WITH_SUBCATEGORIES = getCategoriesWithSubcategories(PRODUCTS); console.log('PRODUCTS_CATEGORIES_WITH_SUBCATEGORIES', PRODUCTS_CATEGORIES_WITH_SUBCATEGORIES); // Affiche les catégories avec sous-catégories
