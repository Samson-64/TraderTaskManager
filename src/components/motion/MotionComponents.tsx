"use client";

import { motion } from "framer-motion";
import React from "react";

// Page wrapper with fade in animation
export const MotionPageContainer = motion.div;

// Card animation wrapper
export const MotionCard = motion.div;

// Button animation wrapper
export const MotionButton = motion.button;

// List item animation
export const MotionListItem = motion.li;

// Stagger container for lists
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Individual item in stagger
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

// Page fade in animation
export const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// Card hover animation
export const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

// Button click animation
export const buttonClickVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};

// Slide in from left
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// Slide in from right
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// Scale in animation
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Bounce animation
export const bounceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
};
