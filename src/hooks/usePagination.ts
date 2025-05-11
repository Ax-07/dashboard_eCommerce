// src/hooks/usePagination.ts
import { useState, useMemo } from "react";

export function usePagination<T>(
  items: T[],
  pageSize: number,
  initialPage = 1
) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Si on dépasse les bornes, on recale
  const goToPage = (page: number) =>
    setCurrentPage(Math.min(Math.max(1, page), totalPages));

  return {
    currentPage,
    totalPages,
    totalItems,
    pagedData,
    startItem,
    endItem,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
    setPage: goToPage,
  };
}
