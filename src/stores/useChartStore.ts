// src/stores/useChartStore.ts
import { create } from "zustand";

interface ChartStore {
  hiddenKeysByChart: Record<string, string[]>;
  toggleKey: (chartId: string, key: string) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  hiddenKeysByChart: {},

  toggleKey: (chartId, key) =>
    set((state) => {
      // ⚠️ on récupère toujours un tableau, même si ça n'existe pas encore
      const prev = state.hiddenKeysByChart[chartId] ?? [];
      // on bascule la présence de la clé
      const next = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      return {
        hiddenKeysByChart: {
          ...state.hiddenKeysByChart,
          [chartId]: next,
        },
      };
    }),
}));