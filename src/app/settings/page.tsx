"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun, Trash2 } from "lucide-react";
import { useTaskStore } from "@/store/taskStore";
import { useJournalStore } from "@/store/journalStore";

export default function SettingsPage() {
  const { isDark, toggleDarkMode, mounted } = useDarkMode();
  const taskStore = useTaskStore();
  const journalStore = useJournalStore();

  const handleClearAllData = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all data? This cannot be undone.",
      )
    ) {
      // Clear tasks
      taskStore.tasks.forEach((task) => {
        taskStore.deleteTask(task.id);
      });
      // Clear journals
      journalStore.trades.forEach((trade) => {
        journalStore.deleteTrade(trade.id);
      });
      alert("All data has been cleared.");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your application preferences
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Dark Mode
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Toggle between light and dark theme
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={toggleDarkMode}
              className="flex items-center gap-2"
            >
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
              {isDark ? "Dark" : "Light"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Application Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Application</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-gray-900 dark:text-white mb-2">
              Application Version
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">1.0.0</p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="font-medium text-gray-900 dark:text-white mb-2">
              Storage Information
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All your data is stored locally in your browser&apos;s storage. No
              data is sent to external servers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              ⚠️ Warning: This action cannot be undone. All tasks and trades
              will be permanently deleted.
            </p>
          </div>

          <Button
            variant="danger"
            onClick={handleClearAllData}
            className="flex items-center gap-2"
          >
            <Trash2 size={20} />
            Clear All Data
          </Button>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Trader Task Manager
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A professional dashboard for forex and crypto traders to manage
                daily trading routines, tasks, and maintain trading discipline.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © 2024 Trader Task Manager. All rights reserved.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
