"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { CheckCircle } from "lucide-react";

interface TradingChecklistProps {
  tasksCompleted: number;
  totalTasks: number;
}

export const TradingChecklist: React.FC<TradingChecklistProps> = ({
  tasksCompleted,
  totalTasks,
}) => {
  const completionRate =
    totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  const checklistItems = [
    { name: "Review Market Overview", completed: tasksCompleted > 0 },
    { name: "Check Economic Calendar", completed: tasksCompleted > 1 },
    { name: "Prepare Trade Plan", completed: tasksCompleted > 2 },
    { name: "Set Risk Parameters", completed: tasksCompleted > 3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="text-indigo-600" />
          Today&apos;s Trading Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  item.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {item.completed && (
                  <CheckCircle size={16} className="text-white" />
                )}
              </div>
              <span
                className={`${
                  item.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm font-bold text-indigo-600">
                {tasksCompleted}/{totalTasks}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
