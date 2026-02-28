import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import CreateUser from "./features/auth/pages/CreateUser";
import React from "react";

// componente para proteger rutas
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// dashboard simple de prueba
const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Estas autenticado</p>
      <button onClick={handleLogout}>Cerrar sesion</button>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ruta publica */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CreateUser/>}/>

        {/* ruta protegida */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* redireccion por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;