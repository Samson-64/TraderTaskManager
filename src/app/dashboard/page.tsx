"use client";

import React, { useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useJournal } from "@/hooks/useJournal";
import { TradingChecklist } from "@/components/dashboard/TradingChecklist";
import { DisciplineScore } from "@/components/dashboard/DisciplineScore";
import { TaskProgressBar } from "@/components/dashboard/TaskProgressBar";
import { PreMarketTasks } from "@/components/dashboard/PreMarketTasks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { TrendingUp, Clock } from "lucide-react";

export default function DashboardPage() {
  const { allTasks, completedCount, completionRate } = useTasks();
  const { totalTrades, winRate } = useJournal();

  const disciplineScore = useMemo(() => {
    const taskScore = completionRate || 0;
    const journalScore = Math.min((totalTrades / 5) * 100, 100);
    return Math.round((taskScore * 0.6 + journalScore * 0.4) / 2);
  }, [completionRate, totalTrades]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here&apos;s your trading overview.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DisciplineScore
          score={disciplineScore}
          taskCompletionRate={completionRate}
          tradeReviewCount={totalTrades}
        />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-green-600" size={20} />
              Trading Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Trades Logged
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalTrades}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Win Rate
                </p>
                <p className="text-2xl font-bold text-green-600">{winRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-orange-600" size={20} />
              Task Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Tasks
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {allTasks.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completed Today
                </p>
                <p className="text-2xl font-bold text-indigo-600">
                  {completedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TradingChecklist
            tasksCompleted={completedCount}
            totalTasks={Math.max(allTasks.length, 4)}
          />
          <PreMarketTasks tasks={allTasks} />
        </div>

        <div>
          <TaskProgressBar
            completed={completedCount}
            total={Math.max(allTasks.length, 1)}
            label="Daily Progress"
          />
        </div>
      </div>
    </div>
  );
}
