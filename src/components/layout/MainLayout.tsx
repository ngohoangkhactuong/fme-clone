import React from "react";
import Header from "./Header";
import { Footer } from "./Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <Header />
    <main className="w-full flex-1">{children}</main>
    <Footer />
  </div>
);
