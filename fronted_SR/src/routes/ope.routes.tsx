import { Route } from "react-router-dom"
import PrivateRoute from "../components/PrivateRoute"
// funcionalidades del operador de rutas
import OpeLayout from "../operador/layouts/OpeLayout"
import InicioOpe from "../operador/pages/InicioOpe"
// perfil
import Perfil from "../operador/pages/Perfil"
// registro
import Registro from "../operador/pages/Registro"
import CrearPuntos from "../operador/pages/registro/create"
// control
import Control from "../operador/pages/Control"
import Add from "../operador/pages/control/add"
// solicitudes
import Solicitud from "../operador/pages/Solicitud"
// atencion
import Atencion from "../operador/pages/Atencion"


export const OpeRoutes = () => (
    <Route path="/ope" element={
        <PrivateRoute allowedRoles={["operador_punto_verde"]}>
            <OpeLayout />
        </PrivateRoute>
    }>
        <Route index element={<InicioOpe />} />
        <Route path="perfil/:id" element={<Perfil />} />
        <Route path="registro" element={<Registro />} />
        <Route path="registro/crear" element={<CrearPuntos />} />
        <Route path="control" element={<Control />} />
        <Route path="control/add/:id" element={<Add />} />
        <Route path="solicitud" element={<Solicitud />} />
        <Route path="atencion" element={<Atencion />} />
    </Route>
)