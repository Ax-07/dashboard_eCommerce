/**
 * Génère des suggestions de libellé pour un option value donné.
 * 
 * - Si le nom du produit est un seul mot, on propose le nom complet.
 * - Si c’est plusieurs mots, on propose :
 *    • nom complet
 *    • premier mot + initiale(s) des suivants
 *    • initiales uniquement
 *    • chaque mot raccourci (ex: “Blue Dream” → “Blue D.”, “B.D.”, “Blue”)
 * - On concatène ensuite la quantité et l’unité, ex: “Blue D. 100 g”
 */
export default function generateLabelSuggestions(
    productName: string,
    quantity: number | string,
    unit: string
  ): string[] {
    const qty = `${quantity}${unit}`;
    const words = productName.split(/\s+/).filter(Boolean);
    const suggestions = new Set<string>();
  
    if (words.length === 1) {
      suggestions.add(`${words[0]} ${qty}`);
    } else {
      // nom complet
      suggestions.add(`${productName} ${qty}`);
      // premier mot + initiale des suivants
      const initials = words.slice(1).map(w => w[0].toUpperCase() + '.').join('');
      suggestions.add(`${words[0]} ${initials} ${qty}`);
      // toutes initiales
      const allInitials = words.map(w => w[0].toUpperCase() + '.').join('');
      suggestions.add(`${allInitials} ${qty}`);
      // chaque mot raccourci séparément
      words.forEach((w, i) => {
        const rest = words
          .map((x, j) => (j === i ? x : x[0].toUpperCase() + '.'))
          .join(' ');
        suggestions.add(`${rest} ${qty}`);
      });
      // éventuellement juste premier mot
      suggestions.add(`${words[0]} ${qty}`);
    }
  
    return Array.from(suggestions);
  }
  