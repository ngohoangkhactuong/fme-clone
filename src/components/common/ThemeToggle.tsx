import { Sun, Moon } from "lucide-react";
import React from "react";

type ThemeToggleProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  toggleTheme
}) => (
  <button
    onClick={toggleTheme}
    className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    aria-label="Toggle theme"
  >
    {theme === "light" ? (
      <Sun className="h-5 w-5" />
    ) : (
      <Moon className="h-5 w-5" />
    )}
  </button>
);
