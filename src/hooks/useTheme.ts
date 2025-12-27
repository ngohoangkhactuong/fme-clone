import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("theme");
  return (stored as Theme) || "light";
};

export const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const oldTheme = theme === "light" ? "dark" : "light";

    root.classList.remove(oldTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};
