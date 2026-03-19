"use client";

import React, { useState } from "react";
import { TradeJournal } from "@/types";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { X } from "lucide-react";
import { EMOTIONS } from "@/utils/constants";

interface TradeJournalFormProps {
  initialTrade?: TradeJournal;
  onSubmit: (trade: Omit<TradeJournal, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export const TradeJournalForm: React.FC<TradeJournalFormProps> = ({
  initialTrade,
  onSubmit,
  onCancel,
}) => {
  const [tradingPair, setTradingPair] = useState(
    initialTrade?.tradingPair || "",
  );
  const [entryPrice, setEntryPrice] = useState(initialTrade?.entryPrice || 0);
  const [stopLoss, setStopLoss] = useState(initialTrade?.stopLoss || 0);
  const [takeProfit, setTakeProfit] = useState(initialTrade?.takeProfit || 0);
  const [result, setResult] = useState<"win" | "loss" | "breakeven">(
    initialTrade?.result || "win",
  );
  const [emotion, setEmotion] = useState(
    initialTrade?.emotionDuringTrade || "",
  );
  const [notes, setNotes] = useState(initialTrade?.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tradingPair.trim()) {
      alert("Trading pair is required");
      return;
    }

    onSubmit({
      tradingPair,
      entryPrice: parseFloat(entryPrice.toString()),
      stopLoss: parseFloat(stopLoss.toString()),
      takeProfit: parseFloat(takeProfit.toString()),
      result,
      emotionDuringTrade: emotion,
      notes,
    });
  };

  return (
    <Card className="border-2 border-green-200 dark:border-green-800">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <CardTitle>{initialTrade ? "Edit Trade" : "Log New Trade"}</CardTitle>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>
      </CardHeader>

      <CardContent className="mt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Trading Pair (e.g., EUR/USD)"
            value={tradingPair}
            onChange={(e) => setTradingPair(e.target.value)}
            placeholder="EUR/USD"
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Entry Price"
              type="number"
              step="0.00001"
              value={entryPrice}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              required
            />
            <Input
              label="Stop Loss"
              type="number"
              step="0.00001"
              value={stopLoss}
              onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
              required
            />
            <Input
              label="Take Profit"
              type="number"
              step="0.00001"
              value={takeProfit}
              onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Trade Result
              </label>
              <select
                value={result}
                onChange={(e) =>
                  setResult(e.target.value as "win" | "loss" | "breakeven")
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="win">Win</option>
                <option value="loss">Loss</option>
                <option value="breakeven">Breakeven</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Emotion During Trade
              </label>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select emotion</option>
                {EMOTIONS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Trade Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add observations, reasoning, lessons learned..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="submit" variant="primary" className="flex-1">
              {initialTrade ? "Update Trade" : "Log Trade"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
