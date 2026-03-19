"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { Zap } from "lucide-react";

interface DisciplineScoreProps {
  score: number; // 0-100
  taskCompletionRate: number; // 0-100
  tradeReviewCount: number;
}

export const DisciplineScore: React.FC<DisciplineScoreProps> = ({
  score,
  taskCompletionRate,
  tradeReviewCount,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getGradient = (score: number) => {
    if (score >= 80) return "from-green-500/20 to-green-600/20";
    if (score >= 60) return "from-yellow-500/20 to-yellow-600/20";
    return "from-red-500/20 to-red-600/20";
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Zap className="text-yellow-400" />
          Discipline Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <motion.div
            className={`bg-gradient-to-br ${getGradient(score)} rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4 border border-slate-700`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <motion.span
              className={`text-4xl font-bold ${getScoreColor(score)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {score}
            </motion.span>
          </motion.div>
          <p className="text-slate-400">Overall Discipline</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-slate-300">
                Task Completion
              </span>
              <span className="text-sm font-bold text-indigo-400">
                {taskCompletionRate}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${taskCompletionRate}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-slate-300">
                Trade Journal Entries
              </span>
              <span className="text-sm font-bold text-purple-400">
                {tradeReviewCount}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Keep a consistent journaling habit
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
