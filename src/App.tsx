import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./views/Home";
import DutyRegistrationPage from "./views/Home/components/DutyRegistrationPage";
import DutyReportPage from "./views/Home/components/DutyReportPage";

const App = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<DutyRegistrationPage />} path="/dang-ky-truc" />
        <Route element={<DutyReportPage />} path="/bao-cao-ca-truc" />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default App;
