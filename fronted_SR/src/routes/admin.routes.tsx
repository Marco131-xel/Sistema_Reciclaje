import { Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
// funcionalidades del admin
import AdminLayout from "../admin/layouts/AdminLayout";
import Inicio from "../admin/pages/Inicio";
import Usuarios from "../admin/pages/Usuarios";
import Auditar from "../admin/pages/Auditar";
import Reportes from "../admin/pages/Reportes";
import Configurar from "../admin/pages/Configurar";
import CrearPersonal from "../admin/pages/CrearPersonal";
import EditarUsuario from "../admin/pages/EditarPersonal";
import VerUsuario from "../admin/pages/VerUsuario";

export const AdminRoutes = () => (
    <Route path="/admin" element={
        <PrivateRoute allowedRoles={["administrador_municipal"]}>
            <AdminLayout />
        </PrivateRoute>
    }>
        <Route index element={<Inicio />}/>
        <Route path="auditar" element={<Auditar />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="configurar" element={<Configurar />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuarios/crear" element={<CrearPersonal />} />
        <Route path="usuarios/editar/:id" element={<EditarUsuario />} />
        <Route path="usuarios/ver/:id" element={<VerUsuario />} />
    </Route>
)