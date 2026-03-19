"use client";

import { useTaskStore } from "@/store/taskStore";
import { useCallback, useMemo } from "react";
import { Task, TaskPriority, TaskStatus, TaskCategory } from "@/types";

export const useTasks = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    setFilter,
    reorderTasks,
    getFilteredTasks,
  } = useTaskStore();

  const filteredTasks = useMemo(() => getFilteredTasks(), [getFilteredTasks]);
  const completedCount = useMemo(
    () => tasks.filter((t) => t.status === "completed").length,
    [tasks],
  );
  const completionRate = useMemo(
    () =>
      tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0,
    [tasks, completedCount],
  );

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    completedCount,
    completionRate,
    addTask: useCallback(
      (task: Omit<Task, "id" | "createdAt">) => addTask(task),
      [addTask],
    ),
    updateTask: useCallback(
      (id: string, updates: Partial<Task>) => updateTask(id, updates),
      [updateTask],
    ),
    deleteTask: useCallback((id: string) => deleteTask(id), [deleteTask]),
    completeTask: useCallback((id: string) => completeTask(id), [completeTask]),
    setFilter: useCallback(
      (filter: {
        category?: TaskCategory;
        status?: TaskStatus;
        priority?: TaskPriority;
      }) => setFilter(filter),
      [setFilter],
    ),
    reorderTasks: useCallback(
      (reordered: Task[]) => reorderTasks(reordered),
      [reorderTasks],
    ),
  };
};
