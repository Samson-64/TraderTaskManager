"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function DashboardPage() {
  const { allTasks, completedCount, completionRate } = useTasks();
  const { totalTrades, winRate } = useJournal();

  const disciplineScore = useMemo(() => {
    const taskScore = completionRate || 0;
    const journalScore = Math.min((totalTrades / 5) * 100, 100);
    return Math.round((taskScore * 0.6 + journalScore * 0.4) / 2);
  }, [completionRate, totalTrades]);

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-slate-400">
          Welcome back! Here&apos;s your trading overview.
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <DisciplineScore
            score={disciplineScore}
            taskCompletionRate={completionRate}
            tradeReviewCount={totalTrades}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="text-green-500" size={20} />
                Trading Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Total Trades Logged</p>
                  <p className="text-3xl font-bold text-white">{totalTrades}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Win Rate</p>
                  <p className="text-2xl font-bold text-green-500">
                    {winRate}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="text-orange-500" size={20} />
                Task Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Total Tasks</p>
                  <p className="text-3xl font-bold text-white">
                    {allTasks.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Completed Today</p>
                  <p className="text-2xl font-bold text-indigo-400">
                    {completedCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
          <TradingChecklist
            tasksCompleted={completedCount}
            totalTasks={Math.max(allTasks.length, 4)}
          />
          <PreMarketTasks tasks={allTasks} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TaskProgressBar
            completed={completedCount}
            total={Math.max(allTasks.length, 1)}
            label="Daily Progress"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
