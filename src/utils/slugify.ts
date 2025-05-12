// src/utils/slug.ts
export function slugify(str: string): string {
  return str
    // 1. Décompose les caractères accentués en lettre + diacritique
    .normalize("NFD")
    // 2. Supprime les diacritiques (accents)
    .replace(/[\u0300-\u036f]/g, "")
    // 3. Met en minuscules
    .toLowerCase()
    // 4. Remplace tout ce qui n'est pas lettre ou chiffre par un tiret
    .replace(/[^a-z0-9]+/g, "-")
    // 5. Supprime les éventuels tirets en début et fin de chaîne
    .replace(/^-+|-+$/g, "");
}
