"use client";

import React from "react";
import { Task } from "@/types";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Trash2, CheckCircle, Clock } from "lucide-react";
import { PRIORITY_COLORS, CATEGORY_COLORS } from "@/utils/constants";
import clsx from "clsx";

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
  onDelete: () => void;
  onEdit?: () => void;
  draggable?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onDelete,
  onEdit,
  draggable = false,
}) => {
  const isCompleted = task.status === "completed";

  return (
    <div
      draggable={draggable}
      className={clsx(
        "bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing",
        isCompleted
          ? "border-green-500 opacity-70"
          : task.priority === "high"
            ? "border-red-500"
            : task.priority === "medium"
              ? "border-yellow-500"
              : "border-blue-500",
        isCompleted && "bg-gray-100 dark:bg-gray-700",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={clsx(
                "font-semibold text-gray-900 dark:text-white",
                isCompleted && "line-through text-gray-500",
              )}
            >
              {task.title}
            </h3>
            {isCompleted && (
              <CheckCircle size={18} className="text-green-500" />
            )}
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={CATEGORY_COLORS[task.category]}>
              {task.category}
            </Badge>
            <Badge className={PRIORITY_COLORS[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="info">{task.status}</Badge>
          </div>

          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
            <Clock size={14} />
            <span>{task.dueTime}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {!isCompleted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onComplete}
              title="Mark as complete"
              className="text-green-600 hover:text-green-700"
            >
              <CheckCircle size={18} />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              title="Edit"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Edit
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            title="Delete"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
