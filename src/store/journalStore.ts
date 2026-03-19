"use client";

import { create } from "zustand";
import { TradeJournal } from "@/types";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { STORAGE_KEYS } from "@/utils/constants";

interface JournalStore {
  trades: TradeJournal[];
  addTrade: (trade: Omit<TradeJournal, "id" | "createdAt">) => void;
  updateTrade: (id: string, updates: Partial<TradeJournal>) => void;
  deleteTrade: (id: string) => void;
  getTrades: () => TradeJournal[];
  getWinRate: () => number;
  getTotalTrades: () => number;
}

export const useJournalStore = create<JournalStore>((set, get) => {
  const initialTrades = getFromLocalStorage(STORAGE_KEYS.JOURNAL, []);

  return {
    trades: initialTrades,

    addTrade: (trade) => {
      set((state) => {
        const newTrade: TradeJournal = {
          ...trade,
          id: `trade_${Date.now()}`,
          createdAt: Date.now(),
        };
        const updatedTrades = [...state.trades, newTrade];
        saveToLocalStorage(STORAGE_KEYS.JOURNAL, updatedTrades);
        return { trades: updatedTrades };
      });
    },

    updateTrade: (id, updates) => {
      set((state) => {
        const updatedTrades = state.trades.map((trade) =>
          trade.id === id ? { ...trade, ...updates } : trade,
        );
        saveToLocalStorage(STORAGE_KEYS.JOURNAL, updatedTrades);
        return { trades: updatedTrades };
      });
    },

    deleteTrade: (id) => {
      set((state) => {
        const updatedTrades = state.trades.filter((trade) => trade.id !== id);
        saveToLocalStorage(STORAGE_KEYS.JOURNAL, updatedTrades);
        return { trades: updatedTrades };
      });
    },

    getTrades: () => {
      return get().trades;
    },

    getWinRate: () => {
      const trades = get().trades;
      if (trades.length === 0) return 0;
      const wins = trades.filter((t) => t.result === "win").length;
      return Math.round((wins / trades.length) * 100);
    },

    getTotalTrades: () => {
      return get().trades.length;
    },
  };
});
