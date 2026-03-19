"use client";

import React from "react";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { useTasks } from "@/hooks/useTasks";
import { useJournal } from "@/hooks/useJournal";
import { BarChart3, TrendingUp, Target } from "lucide-react";

export default function AnalyticsPage() {
  const { allTasks, completionRate } = useTasks();
  const { totalTrades, winRate } = useJournal();

  const completionStreak = Math.floor(completionRate / 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your trading performance and discipline metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={20} />
              Task Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-indigo-600 mb-2">
                {completionRate}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {allTasks.length > 0
                  ? `${allTasks.filter((t) => t.status === "completed").length} of ${allTasks.length} tasks`
                  : "No tasks yet"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-green-600" size={20} />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 mb-2">
                {winRate}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {totalTrades > 0
                  ? `Based on ${totalTrades} trades`
                  : "No trades logged"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-purple-600" size={20} />
              Consistency Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">
                {completionStreak}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Consecutive days of good performance
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <AnalyticsCharts />
    </div>
  );
}
