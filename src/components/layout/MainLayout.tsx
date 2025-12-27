import { Footer } from "./Footer";
import Header from "./Header";
import PageTransition from "./PageTransition";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { useLocation } from "react-router-dom";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="w-full flex-1">
        <PageTransition locationKey={location.pathname}>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
