import { Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateUser from "../features/auth/pages/CreateUser";

export const PublicRoutes = () => (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<CreateUser />} />
  </>
);