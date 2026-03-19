"use client";

import React from "react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/common/Button";

export const Navbar: React.FC = () => {
  const { isDark, toggleDarkMode, mounted } = useDarkMode();

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trader Task Manager
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-all">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};
