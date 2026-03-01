import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import CreateUser from "./features/auth/pages/CreateUser";
import PrivateRoute from "./components/PrivateRoute";


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

// vista administrador
const AdminPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vista ADMINISTRADOR</h1>
      <p>Estas autenticado</p>
      <button onClick={handleLogout}>Cerrar sesion</button>
    </div>
  );
};

// vista ciudadano
const CiudadanoPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>VISTA CIUDADANO</h1>
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
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path="/admin" element={<PrivateRoute allowedRoles={["administrador_municipal"]}><AdminPage/></PrivateRoute>}/>
        <Route path="/ciudadano" element={<PrivateRoute allowedRoles={["ciudadano"]}><CiudadanoPage/></PrivateRoute>}/>

        {/* redireccion por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;