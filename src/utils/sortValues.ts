// @/src/utils/sortValues.ts

/**
 * Triés une liste de valeurs en fonction d'un type de valeur (accessor) et d'un ordre de tri spécifié.
 * @param values 
 * @param accessor 
 * @param sortOrder 
 * @returns 
 */
export const sortValues = <T>(
  values: T[],
  accessor: (item: T) => string | number | Date | undefined,
  sortOrder: "asc" | "desc"
) => {
  return [...values].sort((a, b) => {
    const aValue = accessor(a);
    const bValue = accessor(b);

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    } else {
      return 0;
    }
  });
};
