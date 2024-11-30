import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../page/login";
import AuthLayout from "../layout/authLayout";
import NoAuthLayout from "../layout/noAuthLayout";
import DashbaordPage from "../page/dashbaord";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<DashbaordPage />} />
        </Route>
        <Route element={<NoAuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
