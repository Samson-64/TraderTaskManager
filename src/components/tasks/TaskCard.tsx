"use client";

import React from "react";
import { motion } from "framer-motion";
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

  const getPriorityBorder = () => {
    if (isCompleted) return "border-green-500";
    if (task.priority === "high") return "border-red-500";
    if (task.priority === "medium") return "border-yellow-500";
    return "border-blue-500";
  };

  return (
    <motion.div
      draggable={draggable}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(79, 70, 229, 0.2)" }}
      className={clsx(
        "bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border-l-4 shadow-lg hover:shadow-xl transition-all duration-200 cursor-grab active:cursor-grabbing border-slate-700",
        getPriorityBorder(),
        isCompleted && "opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={clsx(
                "font-semibold text-white",
                isCompleted && "line-through text-slate-400",
              )}
            >
              {task.title}
            </h3>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle size={18} className="text-green-400" />
              </motion.div>
            )}
          </div>

          {task.description && (
            <p className="text-sm text-slate-400 mb-2">{task.description}</p>
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

          <div className="flex items-center text-xs text-slate-400 gap-2">
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
              className="text-green-400 hover:text-green-300"
              animated={true}
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
              className="text-indigo-400 hover:text-indigo-300"
              animated={true}
            >
              Edit
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            title="Delete"
            className="text-red-400 hover:text-red-300"
            animated={true}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
