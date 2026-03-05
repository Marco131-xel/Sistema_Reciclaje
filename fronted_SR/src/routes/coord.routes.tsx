import { Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
// funcionalidades del coordinador
import CoordLayout from "../coordinador/layouts/CoordLayout";
import InicioCoord from "../coordinador/pages/InicioCoord";
import Camiones from "../coordinador/pages/Camiones";
import CrearCamion from "../coordinador/pages/camion/create";
import EditarCamion from "../coordinador/pages/camion/edit";
import Incidencias from "../coordinador/pages/Incidencias";
import Monitoreo from "../coordinador/pages/Monitoreo";
import Reportes from "../coordinador/pages/Reportes";
import Rutas from "../coordinador/pages/Rutas";


export const CoordRoutes = () => (
    <Route path="/coord" element={
        <PrivateRoute allowedRoles={["coordinador_rutas"]}>
            <CoordLayout />
        </PrivateRoute>
    }>
        <Route index element={<InicioCoord />} />
        <Route path="rutas" element={<Rutas />} />
        <Route path="camiones" element={<Camiones />} />
        <Route path="camiones/crear" element={<CrearCamion />} />
        <Route path="camiones/editar/:id" element={<EditarCamion />} />
        <Route path="monitoreo" element={<Monitoreo />} />
        <Route path="incidencias" element={<Incidencias />} />
        <Route path="reportes" element={<Reportes />} />
    </Route>
)