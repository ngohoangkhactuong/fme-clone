import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => (
  <button
    aria-label="Toggle theme"
    className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    onClick={toggleTheme}
  >
    {theme === "light" ? (
      <Sun className="h-5 w-5" />
    ) : (
      <Moon className="h-5 w-5" />
    )}
  </button>
);
