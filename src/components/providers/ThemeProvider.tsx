"use client";

import React, { ReactNode } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { mounted } = useDarkMode();

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
