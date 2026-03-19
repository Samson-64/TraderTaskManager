"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  animated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, animated = true, ...props }, ref) => {
    const cardComponent = (
      <div
        ref={ref}
        className={clsx(
          "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900",
          "rounded-xl shadow-lg border border-slate-700 dark:border-slate-700 p-6",
          "hover:border-indigo-500/30 transition-all duration-300",
          "backdrop-blur-sm bg-opacity-80",
          className,
        )}
        {...props}
      />
    );

    if (!animated) return cardComponent;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)" }}
      >
        {cardComponent}
      </motion.div>
    );
  },
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "mb-4 pb-4 border-b border-slate-700 dark:border-slate-700",
        className,
      )}
      {...props}
    />
  ),
);

CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={clsx(
      "text-lg font-semibold text-white dark:text-white",
      className,
    )}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  ),
);

CardContent.displayName = "CardContent";
