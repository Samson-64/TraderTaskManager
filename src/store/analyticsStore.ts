"use client";

import { create } from "zustand";
import { AnalyticsData } from "@/types";

interface AnalyticsStore {
  data: AnalyticsData[];
  addDataPoint: (point: AnalyticsData) => void;
  getWeeklyData: () => AnalyticsData[];
  calculateAverageDiscipline: () => number;
  calculateAverageProductivity: () => number;
}

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => {
  return {
    data: [],

    addDataPoint: (point) => {
      set((state) => {
        const newData = [...state.data, point];
        // Keep only last 30 days
        return {
          data: newData.slice(-30),
        };
      });
    },

    getWeeklyData: () => {
      const data = get().data;
      return data.slice(-7);
    },

    calculateAverageDiscipline: () => {
      const data = get().data;
      if (data.length === 0) return 0;
      const sum = data.reduce((acc, point) => acc + point.disciplineScore, 0);
      return Math.round(sum / data.length);
    },

    calculateAverageProductivity: () => {
      const data = get().data;
      if (data.length === 0) return 0;
      const sum = data.reduce((acc, point) => acc + point.productivity, 0);
      return Math.round(sum / data.length);
    },
  };
});
