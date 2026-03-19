"use client";

import { useJournalStore } from "@/store/journalStore";
import { useCallback } from "react";
import { TradeJournal } from "@/types";

export const useJournal = () => {
  const {
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    getWinRate,
    getTotalTrades,
  } = useJournalStore();

  return {
    trades,
    winRate: getWinRate(),
    totalTrades: getTotalTrades(),
    addTrade: useCallback(
      (trade: Omit<TradeJournal, "id" | "createdAt">) => addTrade(trade),
      [addTrade],
    ),
    updateTrade: useCallback(
      (id: string, updates: Partial<TradeJournal>) => updateTrade(id, updates),
      [updateTrade],
    ),
    deleteTrade: useCallback((id: string) => deleteTrade(id), [deleteTrade]),
  };
};
