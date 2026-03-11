import { Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
// funcionalidades del coordinador
import CoordLayout from "../coordinador/layouts/CoordLayout";
import InicioCoord from "../coordinador/pages/InicioCoord";
// camiones
import Camiones from "../coordinador/pages/Camiones";
import CrearCamion from "../coordinador/pages/camion/create";
import EditarCamion from "../coordinador/pages/camion/edit";
import AsigCamion from "../coordinador/pages/camion/assign";
import EditAsigCam from "../coordinador/pages/camion/ediAsig";
// incidencias
import Incidencias from "../coordinador/pages/Incidencias";
// monitoreo
import Monitoreo from "../coordinador/pages/Monitoreo";
import CrearBasura from "../coordinador/pages/monitoreo/createBasura";
// reportes
import Reportes from "../coordinador/pages/Reportes";
// rutas
import Rutas from "../coordinador/pages/Rutas";
import CreateRuta from "../coordinador/pages/ruta/create";
import VerRuta from "../coordinador/pages/ruta/show";
// perfil
import Perfil from "../coordinador/pages/Perfil";


export const CoordRoutes = () => (
    <Route path="/coord" element={
        <PrivateRoute allowedRoles={["coordinador_rutas"]}>
            <CoordLayout />
        </PrivateRoute>
    }>
        <Route index element={<InicioCoord />} />
        <Route path="perfil/:id" element={<Perfil />} />
        <Route path="rutas" element={<Rutas />} />
        <Route path="rutas/crear" element={<CreateRuta />} />
        <Route path="rutas/ver/:id" element={<VerRuta />} />
        <Route path="camiones" element={<Camiones />} />
        <Route path="camiones/crear" element={<CrearCamion />} />
        <Route path="camiones/editar/:id" element={<EditarCamion />} />
        <Route path="camiones/editAsig/:id" element={<EditAsigCam />} />
        <Route path="camiones/asignar" element={<AsigCamion />} />
        <Route path="monitoreo" element={<Monitoreo />} />
        <Route path="monitoreo/crearBasura" element={<CrearBasura />} />
        <Route path="incidencias" element={<Incidencias />} />
        <Route path="reportes" element={<Reportes />} />
    </Route>
)