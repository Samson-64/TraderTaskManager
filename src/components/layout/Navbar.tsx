"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/common/Button";

export const Navbar: React.FC = () => {
  const { isDark, toggleDarkMode, mounted } = useDarkMode();

  if (!mounted) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-20 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-900 border-b border-slate-700 backdrop-blur-sm bg-opacity-80"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Trader Task Manager
          </h2>
        </motion.div>

        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            title={isDark ? "Light mode" : "Dark mode"}
            animated={true}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            <User size={20} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
