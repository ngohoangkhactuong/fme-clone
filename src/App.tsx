import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./views/Home";
import DutyRegistrationPage from "./views/Home/components/DutyRegistrationPage";
import DutyReportPage from "./views/Home/components/DutyReportPage";
import ScheduleManager from "./views/Admin/ScheduleManager";
import ScheduleCalendar from "./views/Home/components/ScheduleCalendar";
import { AuthProvider } from "./hooks/useAuth";
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";
import Profile from "./views/Auth/Profile";
import AccountSettings from "./views/Auth/AccountSettings";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <MainLayout>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<DutyRegistrationPage />} path="/dang-ky-truc" />
          <Route element={<DutyReportPage />} path="/bao-cao-ca-truc" />
          <Route element={<SignIn />} path="/auth/signin" />
          <Route element={<SignUp />} path="/auth/signup" />
          <Route element={<Profile />} path="/account/profile" />
          <Route element={<AccountSettings />} path="/account/settings" />
          <Route element={<ScheduleManager />} path="/admin/schedules" />
          <Route element={<ScheduleCalendar />} path="/calendar" />
        </Routes>
      </MainLayout>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
