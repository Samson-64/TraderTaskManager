"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
  animated?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className,
  animated = false,
}) => {
  const badgeElement = (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-opacity-50",
        {
          "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 border-slate-600":
            variant === "default",
          "bg-gradient-to-r from-green-900 to-green-800 text-green-200 border-green-700":
            variant === "success",
          "bg-gradient-to-r from-yellow-900 to-yellow-800 text-yellow-200 border-yellow-700":
            variant === "warning",
          "bg-gradient-to-r from-red-900 to-red-800 text-red-200 border-red-700":
            variant === "danger",
          "bg-gradient-to-r from-indigo-900 to-indigo-800 text-indigo-200 border-indigo-700":
            variant === "info",
        },
        className,
      )}
    >
      {children}
    </span>
  );

  if (!animated) return badgeElement;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {badgeElement}
    </motion.div>
  );
};
