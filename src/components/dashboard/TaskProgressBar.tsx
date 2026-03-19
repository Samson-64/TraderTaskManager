"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";

interface TaskProgressBarProps {
  completed: number;
  total: number;
  label?: string;
}

export const TaskProgressBar: React.FC<TaskProgressBarProps> = ({
  completed,
  total,
  label = "Daily Tasks",
}) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Progress
          </span>
          <span className="text-sm font-bold text-indigo-600">
            {completed} of {total}
          </span>
        </div>
        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {Math.round(percentage)}% Complete
        </p>
      </CardContent>
    </Card>
  );
};
