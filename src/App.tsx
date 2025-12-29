import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./views/Home";
import DutyReportPage from "./views/Home/components/DutyReportPage";
import ScheduleManager from "./views/Admin/ScheduleManager";
import ReportsManager from "./views/Admin/ReportsManager";
import ScheduleCalendar from "./views/Home/components/ScheduleCalendar";
import { AuthProvider } from "./hooks/useAuth";
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";
import Profile from "./views/Auth/Profile";
import AccountSettings from "./views/Auth/AccountSettings";
import { ROUTES } from "@/constants";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <MainLayout>
        <Routes>
          <Route element={<HomePage />} path={ROUTES.HOME} />
          <Route element={<DutyReportPage />} path={ROUTES.DUTY_REPORT} />
          <Route element={<SignIn />} path={ROUTES.AUTH.SIGN_IN} />
          <Route element={<SignUp />} path={ROUTES.AUTH.SIGN_UP} />
          <Route element={<Profile />} path={ROUTES.ACCOUNT.PROFILE} />
          <Route element={<AccountSettings />} path={ROUTES.ACCOUNT.SETTINGS} />
          <Route element={<ScheduleManager />} path={ROUTES.ADMIN.SCHEDULES} />
          <Route element={<ReportsManager />} path={ROUTES.ADMIN.REPORTS} />
          <Route element={<ScheduleCalendar />} path={ROUTES.CALENDAR} />
        </Routes>
      </MainLayout>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
