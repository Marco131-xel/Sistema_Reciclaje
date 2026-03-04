import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// importar routes
import { AdminRoutes } from "./routes/admin.routes";
import { CiudadanoRoutes } from "./routes/ciudadano.routes";
import { CoordRoutes } from "./routes/coord.routes";
import { PublicRoutes } from "./routes/public.routes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ruta publica */}
        {PublicRoutes()}
        {/* ruta protegida */}
        {AdminRoutes()}
        {CoordRoutes()}
        {CiudadanoRoutes()}
        {/* redireccion por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;