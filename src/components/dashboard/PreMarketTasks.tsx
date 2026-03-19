"use client";

import React from "react";
import { Task } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { Clock } from "lucide-react";
import { Badge } from "@/components/common/Badge";

interface PreMarketTasksProps {
  tasks: Task[];
}

export const PreMarketTasks: React.FC<PreMarketTasksProps> = ({ tasks }) => {
  const preMarketTasks = tasks.filter((t) => t.category === "Pre-Market");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="text-purple-600" size={20} />
          Pre-Market Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {preMarketTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No pre-market tasks
          </p>
        ) : (
          <div className="space-y-3">
            {preMarketTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {task.dueTime}
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    task.priority === "high"
                      ? "danger"
                      : task.priority === "medium"
                        ? "warning"
                        : "info"
                  }
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
