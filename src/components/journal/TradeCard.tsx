"use client";

import React from "react";
import { TradeJournal } from "@/types";
import { Card, CardContent } from "@/components/common/Card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";

interface TradeCardProps {
  trade: TradeJournal;
  onDelete: () => void;
  onEdit?: () => void;
}

export const TradeCard: React.FC<TradeCardProps> = ({
  trade,
  onDelete,
  onEdit,
}) => {
  const profit = trade.takeProfit - trade.entryPrice;
  const riskReward =
    Math.abs(profit) > 0
      ? profit / Math.abs(trade.entryPrice - trade.stopLoss)
      : 0;

  const resultColor =
    trade.result === "win"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : trade.result === "loss"
        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  return (
    <Card className="border-l-4 border-indigo-500">
      <CardContent>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {trade.tradingPair}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(trade.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="text-indigo-600"
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-red-600"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Entry Price
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {trade.entryPrice.toFixed(5)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Stop Loss
            </p>
            <p className="text-lg font-semibold text-red-600">
              {trade.stopLoss.toFixed(5)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Take Profit
            </p>
            <p className="text-lg font-semibold text-green-600">
              {trade.takeProfit.toFixed(5)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Risk/Reward
            </p>
            <p className="text-lg font-semibold text-indigo-600">
              {riskReward.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <Badge className={resultColor}>
            {trade.result === "win" ? (
              <TrendingUp size={14} className="mr-1 inline" />
            ) : (
              <TrendingDown size={14} className="mr-1 inline" />
            )}
            {trade.result.toUpperCase()}
          </Badge>
          <Badge variant="info">{trade.emotionDuringTrade}</Badge>
        </div>

        {trade.notes && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
            {trade.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
