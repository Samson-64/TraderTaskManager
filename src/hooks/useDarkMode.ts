"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/utils/constants";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = getFromLocalStorage(STORAGE_KEYS.THEME, "light");
    return savedTheme === "dark";
  });
  const [mounted] = useState<boolean>(() => {
    return typeof window !== "undefined";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      saveToLocalStorage(STORAGE_KEYS.THEME, newValue ? "dark" : "light");

      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newValue;
    });
  };

  return { isDark, toggleDarkMode, mounted };
};
