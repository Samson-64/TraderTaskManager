export const TASK_CATEGORIES = [
  "Pre-Market",
  "Execution",
  "Post-Trade",
  "Weekly Review",
] as const;

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export const TASK_STATUSES = ["pending", "in-progress", "completed"] as const;

export const EMOTIONS = [
  "Calm",
  "Confident",
  "Nervous",
  "Excited",
  "Frustrated",
  "Disciplined",
] as const;

export const STORAGE_KEYS = {
  TASKS: "trader_tasks",
  JOURNAL: "trader_journal",
  THEME: "trader_theme",
};

export const PRIORITY_COLORS = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
} as const;

export const CATEGORY_COLORS = {
  "Pre-Market": "bg-purple-100 text-purple-800",
  Execution: "bg-indigo-100 text-indigo-800",
  "Post-Trade": "bg-green-100 text-green-800",
  "Weekly Review": "bg-pink-100 text-pink-800",
} as const;
