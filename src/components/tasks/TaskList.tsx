"use client";

import React, { useState } from "react";
import { Task, TaskCategory, TaskStatus, TaskPriority } from "@/types";
import { TaskCard } from "./TaskCard";
import {
  TASK_CATEGORIES,
  TASK_STATUSES,
  TASK_PRIORITIES,
} from "@/utils/constants";

import clsx from "clsx";

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask?: (task: Task) => void;
  onReorderTasks?: (tasks: Task[]) => void;
  showFilters?: boolean;
  onFilterChange?: (filters: {
    category?: TaskCategory;
    status?: TaskStatus;
    priority?: TaskPriority;
  }) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
  onReorderTasks,
  showFilters = true,
  onFilterChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<TaskCategory | "all">(
    "all",
  );
  const [activeStatus, setActiveStatus] = useState<TaskStatus | "all">("all");
  const [activePriority, setActivePriority] = useState<TaskPriority | "all">(
    "all",
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        category: activeCategory === "all" ? undefined : activeCategory,
        status: activeStatus === "all" ? undefined : activeStatus,
        priority: activePriority === "all" ? undefined : activePriority,
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedItem(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem || !onReorderTasks) return;

    const draggedIndex = tasks.findIndex((t) => t.id === draggedItem);
    if (draggedIndex === targetIndex) return;

    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);

    onReorderTasks(newTasks);
    setDraggedItem(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeCategory !== "all" && task.category !== activeCategory)
      return false;
    if (activeStatus !== "all" && task.status !== activeStatus) return false;
    if (activePriority !== "all" && task.priority !== activePriority)
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Filter Tasks
          </h3>

          <div className="flex flex-wrap gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Category
              </label>
              <select
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value as TaskCategory | "all");
                  handleFilterChange();
                }}
                className="px-3 py-1 rounded text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {TASK_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Status
              </label>
              <select
                value={activeStatus}
                onChange={(e) => {
                  setActiveStatus(e.target.value as TaskStatus | "all");
                  handleFilterChange();
                }}
                className="px-3 py-1 rounded text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                {TASK_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Priority
              </label>
              <select
                value={activePriority}
                onChange={(e) => {
                  setActivePriority(e.target.value as TaskPriority | "all");
                  handleFilterChange();
                }}
                className="px-3 py-1 rounded text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Priorities</option>
                {TASK_PRIORITIES.map((pri) => (
                  <option key={pri} value={pri}>
                    {pri.charAt(0).toUpperCase() + pri.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              draggable={onReorderTasks !== undefined}
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={clsx(draggedItem === task.id && "opacity-50")}
            >
              <TaskCard
                task={task}
                onComplete={() => onCompleteTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
                onEdit={() => onEditTask?.(task)}
                draggable={onReorderTasks !== undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
