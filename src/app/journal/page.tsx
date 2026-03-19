"use client";

import React, { useState } from "react";
import { useJournal } from "@/hooks/useJournal";
import { TradeJournalForm } from "@/components/journal/TradeJournalForm";
import { TradeCard } from "@/components/journal/TradeCard";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/Card";
import { TradeJournal } from "@/types";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";

export default function JournalPage() {
  const { trades, winRate, totalTrades, addTrade, updateTrade, deleteTrade } =
    useJournal();
  const [showForm, setShowForm] = useState(false);
  const [editingTrade, setEditingTrade] = useState<TradeJournal | null>(null);

  const handleSubmit = (trade: Omit<TradeJournal, "id" | "createdAt">) => {
    if (editingTrade) {
      updateTrade(editingTrade.id, trade);
      setEditingTrade(null);
    } else {
      addTrade(trade);
    }
    setShowForm(false);
  };

  const wins = trades.filter((t) => t.result === "win").length;
  const losses = trades.filter((t) => t.result === "loss").length;


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Trade Journal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Log and review your trades to improve performance
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditingTrade(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Log Trade
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Total Trades
            </p>
            <p className="text-3xl font-bold text-indigo-600">{totalTrades}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Win Rate
            </p>
            <p className="text-3xl font-bold text-green-600">{winRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
              <TrendingUp size={16} />
              Wins
            </p>
            <p className="text-3xl font-bold text-green-600">{wins}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
              <TrendingDown size={16} />
              Losses
            </p>
            <p className="text-3xl font-bold text-red-600">{losses}</p>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      {showForm && (
        <TradeJournalForm
          initialTrade={editingTrade || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTrade(null);
          }}
        />
      )}

      {/* Trades List */}
      {trades.length === 0 ? (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No trades logged yet. Start by logging your first trade!
            </p>
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Log Your First Trade
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {trades.map((trade) => (
            <TradeCard
              key={trade.id}
              trade={trade}
              onDelete={() => deleteTrade(trade.id)}
              onEdit={() => {
                setEditingTrade(trade);
                setShowForm(true);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
