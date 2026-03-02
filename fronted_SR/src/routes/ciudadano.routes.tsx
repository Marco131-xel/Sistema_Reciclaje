import { Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
// funciones del ciudadano
import InicioCiu from "../ciudadano/pages/InicioCiu";

export const CiudadanoRoutes = () => (

  <Route path="/ciudadano" element={
      <PrivateRoute allowedRoles={["ciudadano"]}>
        <InicioCiu />
      </PrivateRoute>

    }>

    </Route>
)