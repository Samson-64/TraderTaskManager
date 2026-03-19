"use client";

import React, { ReactNode } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useDarkMode();

  return <>{children}</>;
};
