import { Footer } from "./Footer";
import Header from "./Header";
import { useTheme } from "@/hooks/useTheme";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="w-full flex-1">{children}</main>
      <Footer />
    </div>
  );
};
