/**
 * Fichier : generate_monthly_sales.js
 * Description :
 * Ce script génère des constantes de ventes quotidiennes aléatoires pour chaque mois
 * compris entre une date de début et une date de fin, puis écrit un fichier JS exportant ces constantes
 * ainsi qu'une constante `ALLSELLS` combinant toutes les ventes générées.
 * Pour chaque mois du range, il crée un tableau d'objets { date, fleurs, resines, huiles, eliquides }
 * avec une valeur aléatoire pour chaque catégorie et chaque jour du mois.
 *
 * Usage :
 * - Définir `startDate` et `endDate` en haut du fichier.
 * - Exécuter : `node generate_monthly_sales.js`.
 * - Le fichier `monthly_sales.ts` sera créé dans `src/mock/sells/`, contenant :
 *    export const sellsYYYY_MM = [...];
 *    export const ALLSELLS = [...];
 */

import fs from 'fs';
import path from 'path';

// Configuration : plage de dates
const startDate = new Date('2024-01-01');
const endDate   = new Date('2024-12-31');

// Dossier de sortie
const sellsDirectory = path.join(process.cwd(), 'src', 'mock', 'sells');
// Catégories de ventes
const categories = ['fleurs', 'resines', 'huiles', 'eliquides'];

// Utilitaires
const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Génère la liste des mois entre start et end (format YYYY-MM)
const getMonthsRange = (start, end) => {
  const months = [];
  let cur = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cur <= last) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, '0');
    months.push({ year: y, month: cur.getMonth() });
    cur.setMonth(cur.getMonth() + 1);
  }
  return months;
};

// Crée le dossier de sortie
if (!fs.existsSync(sellsDirectory)) fs.mkdirSync(sellsDirectory, { recursive: true });

const monthsToGenerate = getMonthsRange(startDate, endDate);
let allExports = `// Auto-généré : ventes mensuelles de ${startDate.toISOString().slice(0,10)} à ${endDate.toISOString().slice(0,10)}

`;
const allConstNames = [];

monthsToGenerate.forEach(({ year, month }) => {
  const mStr = String(month + 1).padStart(2, '0');
  const yStr = String(year);
  const constName = `sells${yStr}_${mStr}`;
  allConstNames.push(constName);

  const days = getDaysInMonth(year, month);
  let arrLiteral = `export const ${constName} = [\n`;

  for (let day = 1; day <= days; day++) {
    const date = new Date(year, month, day);
    if (date < startDate || date > endDate) continue;
    const dateStr = date.toISOString().slice(0,10);
    const entries = categories.map(cat => `${cat}: ${randInt(50, 500)}`).join(', ');
    arrLiteral += `  { date: '${dateStr}', ${entries} },\n`;
  }
  arrLiteral += `];\n\n`;
  allExports += arrLiteral;
});

// Ajoute ALLSELLS combinant toutes les ventes
allExports += `export const ALLSELLS = [\n`;
allConstNames.forEach(name => {
  allExports += `  ...${name},\n`;
});
allExports += `];\n`;

// Écrit le fichier
const outFile = path.join(sellsDirectory, 'monthly_sales.ts');
fs.writeFileSync(outFile, allExports, 'utf8');
console.log(`Généré : ${outFile}`);
