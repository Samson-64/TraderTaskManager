export type TaskPriority = "low" | "medium" | "high";
export type TaskCategory =
  | "Pre-Market"
  | "Execution"
  | "Post-Trade"
  | "Weekly Review";
export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueTime: string;
  status: TaskStatus;
  category: TaskCategory;
  createdAt: number;
  completedAt?: number;
}

export interface TradeJournal {
  id: string;
  tradingPair: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  result: "win" | "loss" | "breakeven";
  emotionDuringTrade: string;
  notes: string;
  screenshotUrl?: string;
  createdAt: number;
}

export interface DisciplineMetrics {
  totalTasks: number;
  completedTasks: number;
  disciplineScore: number; // 0-100
  weeklyProductivity: number; // 0-100
  tradeReviewFrequency: number;
}

export interface AnalyticsData {
  date: string;
  completed: number;
  disciplineScore: number;
  productivity: number;
}
