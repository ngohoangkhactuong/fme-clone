import React from "react";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./views/Home";

const App: React.FC = () => (
  <MainLayout>
    <HomePage />
  </MainLayout>
);

export default App;
