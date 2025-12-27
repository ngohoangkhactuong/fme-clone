import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./views/Home";
import DutyRegistrationPage from "./views/Home/components/DutyRegistrationPage";

const App = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<DutyRegistrationPage />} path="/dang-ky-truc" />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);

export default App;
