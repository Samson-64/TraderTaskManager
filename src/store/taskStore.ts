"use client";

import { create } from "zustand";
import { Task, TaskCategory, TaskPriority, TaskStatus } from "@/types";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { STORAGE_KEYS } from "@/utils/constants";

interface TaskStore {
  tasks: Task[];
  filter: {
    category?: TaskCategory;
    status?: TaskStatus;
    priority?: TaskPriority;
  };
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  setFilter: (filter: TaskStore["filter"]) => void;
  reorderTasks: (tasks: Task[]) => void;
  getFilteredTasks: () => Task[];
  getCompletedCount: () => number;
  getTodaysTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => {
  // Initialize from localStorage
  const initialTasks = getFromLocalStorage(STORAGE_KEYS.TASKS, []);

  return {
    tasks: initialTasks,
    filter: {},

    addTask: (task) => {
      set((state) => {
        const newTask: Task = {
          ...task,
          id: `task_${Date.now()}`,
          createdAt: Date.now(),
        };
        const updatedTasks = [...state.tasks, newTask];
        saveToLocalStorage(STORAGE_KEYS.TASKS, updatedTasks);
        return { tasks: updatedTasks };
      });
    },

    updateTask: (id, updates) => {
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task,
        );
        saveToLocalStorage(STORAGE_KEYS.TASKS, updatedTasks);
        return { tasks: updatedTasks };
      });
    },

    deleteTask: (id) => {
      set((state) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== id);
        saveToLocalStorage(STORAGE_KEYS.TASKS, updatedTasks);
        return { tasks: updatedTasks };
      });
    },

    completeTask: (id) => {
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                status: "completed" as TaskStatus,
                completedAt: Date.now(),
              }
            : task,
        );
        saveToLocalStorage(STORAGE_KEYS.TASKS, updatedTasks);
        return { tasks: updatedTasks };
      });
    },

    setFilter: (filter) => {
      set({ filter });
    },

    reorderTasks: (tasks) => {
      set({ tasks });
      saveToLocalStorage(STORAGE_KEYS.TASKS, tasks);
    },

    getFilteredTasks: () => {
      const { tasks, filter } = get();
      return tasks.filter((task) => {
        if (filter.category && task.category !== filter.category) return false;
        if (filter.status && task.status !== filter.status) return false;
        if (filter.priority && task.priority !== filter.priority) return false;
        return true;
      });
    },

    getCompletedCount: () => {
      return get().tasks.filter((t) => t.status === "completed").length;
    },

    getTodaysTasks: () => {
      const today = new Date().toDateString();
      return get().tasks.filter((task) => {
        const taskDate = new Date(task.createdAt).toDateString();
        return taskDate === today;
      });
    },
  };
});
