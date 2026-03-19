"use client";

import { useEffect, useRef, useState } from "react";
import { STORAGE_KEYS } from "@/utils/constants";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const savedTheme = getFromLocalStorage(STORAGE_KEYS.THEME, "light");
      const isDarkMode = savedTheme === "dark";
      setIsDark(isDarkMode);

      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      initializedRef.current = true;
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDark, mounted]);

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
