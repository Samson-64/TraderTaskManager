"use client";

import React from "react";
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
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900";
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900";
    return "bg-red-100 dark:bg-red-900";
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-yellow-500" />
          Discipline Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div
            className={`${getScoreBgColor(score)} rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4`}
          >
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Overall Discipline</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Task Completion
              </span>
              <span className="text-sm font-bold text-indigo-600">
                {taskCompletionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${taskCompletionRate}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trade Journal Entries
              </span>
              <span className="text-sm font-bold text-purple-600">
                {tradeReviewCount}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Keep a consistent journaling habit
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
