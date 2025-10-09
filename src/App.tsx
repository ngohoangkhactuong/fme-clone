import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./views/Home";
import DutyRegistrationPage from "./views/Home/components/DutyRegistrationPage";

const App: React.FC = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dang-ky-truc" element={<DutyRegistrationPage />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default App;
