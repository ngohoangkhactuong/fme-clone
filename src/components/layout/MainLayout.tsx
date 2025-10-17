import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { useTheme } from "@/hooks/useTheme";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="w-full flex-1">{children}</main>
      <Footer />
    </div>
  );
};
