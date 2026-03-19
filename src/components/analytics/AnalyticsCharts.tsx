"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { useTaskStore } from "@/store/taskStore";
import { useJournalStore } from "@/store/journalStore";

export const AnalyticsCharts: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const trades = useJournalStore((state) => state.trades);
  const [disciplineValues] = useState<number[]>(() =>
    Array.from({ length: 7 }, () => Math.min(80 + Math.random() * 20, 100)),
  );

  // Generate weekly data
  const weeklyData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // If no values yet, use defaults
    const values =
      disciplineValues.length > 0 ? disciplineValues : days.map(() => 85);
    return days.map((day, idx) => {
      const dayTasks = tasks.filter(
        (t) =>
          new Date(t.createdAt).getDay() === (idx + 1) % 7 &&
          t.status === "completed",
      );
      return {
        name: day,
        completed: dayTasks.length,
        productivity: Math.min((dayTasks.length / 5) * 100, 100),
        discipline: values[idx] || 85,
      };
    });
  }, [tasks, disciplineValues]);

  // Calculate trade statistics
  const tradeStats = useMemo(() => {
    const wins = trades.filter((t) => t.result === "win").length;
    const losses = trades.filter((t) => t.result === "loss").length;
    const breakevens = trades.filter((t) => t.result === "breakeven").length;

    return {
      wins,
      losses,
      breakevens,
      total: trades.length,
      winRate: trades.length > 0 ? Math.round((wins / trades.length) * 100) : 0,
    };
  }, [trades]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Trades
              </p>
              <p className="text-3xl font-bold text-indigo-600">
                {tradeStats.total}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Win Rate
              </p>
              <p className="text-3xl font-bold text-green-600">
                {tradeStats.winRate}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Wins</p>
              <p className="text-3xl font-bold text-green-600">
                {tradeStats.wins}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Losses</p>
              <p className="text-3xl font-bold text-red-600">
                {tradeStats.losses}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Productivity & Discipline</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="productivity"
                fill="#4f46e5"
                name="Productivity %"
              />
              <Bar dataKey="discipline" fill="#7c3aed" name="Discipline %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Task Completion Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={2}
                name="Tasks Completed"
                dot={{ fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
