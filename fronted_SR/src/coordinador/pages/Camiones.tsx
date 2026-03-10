import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { Camion, Asig_Camion } from "../types/Ruta";


function Camiones() {
  const [camiones, setCamiones] = useState<Camion[]>([]);
  const [asigCam, setAsigCam] = useState<Asig_Camion[]>([]);
  const navigate = useNavigate();

  // funcion para obtener camiones del backend
  const obtenerCamiones = async () => {
    try {
      const res = await api.get("/camiones");
      setCamiones(res.data);
    } catch (error) {
      console.error("Error cargando camiones", error);
    }
  };

  // funcion para obtener asignaciones de camiones del backend
  const obtenerAsig_Camion = async () => {
    try {
      const res = await api.get("/asig-camion");
      setAsigCam(res.data);
    } catch (error) {
      console.error("Error cargando asignacion de camion", error);
    }
  };

  const eliminarCamion = async (id: number) => {

    const result = await Swal.fire({
      title: "¿Eliminar camión?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#051F20",
      color: "#fff"
    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/camiones/${id}`);

      await Swal.fire({
        title: "Eliminado",
        text: "El camión fue eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#1abc9c",
        background: "#051F20",
        color: "#fff"
      });

      obtenerCamiones();

    } catch (error) {

      console.error("Error eliminando", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el camión.",
        icon: "error",
        confirmButtonColor: "#e74c3c",
        background: "051F20",
        color: "#fff"
      });

    }
  };

  const eliminarAsignacion = async (id: number) => {

    const result = await Swal.fire({
      title: "¿Eliminar Asignacion?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#051F20",
      color: "#fff"
    });

    if (!result.isConfirmed) return;

    try {

      await api.delete(`/asig-camion/${id}`);

      await Swal.fire({
        title: "Eliminado",
        text: "La Asignacion fue eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#1abc9c",
        background: "#051F20",
        color: "#fff"
      });

      obtenerAsig_Camion();

    } catch (error) {

      console.error("Error eliminando", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la asignacion",
        icon: "error",
        confirmButtonColor: "#e74c3c",
        background: "051F20",
        color: "#fff"
      });

    }
  };

  useEffect(() => {
    obtenerCamiones();
    obtenerAsig_Camion();
  }, []);

  return (
    <div className="camiones-container">

      <div className="camiones-header">
        <h2><i className="bi bi-truck"></i> Gestión de Camiones</h2>

        <button className="btn-crear" onClick={() => navigate("crear")}>
          <i className="bi bi-plus-square"></i> Nuevo Camión
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-camiones">

          <thead>
            <tr>
              <th>ID</th>
              <th>Placa</th>
              <th>Capacidad (Ton)</th>
              <th>Estado</th>
              <th>Conductor</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {camiones.map((camion) => (
              <tr key={camion.id_camion}>
                <td>{camion.id_camion}</td>
                <td>{camion.placa}</td>
                <td>{camion.capacidad_ton}</td>
                <td>{camion.estado}</td>
                <td>{camion.conductor}</td>

                <td className="acciones">

                  <button className="btn-editar" onClick={() => navigate(`editar/${camion.id_camion}`)}>
                    <i className="bi bi-pencil-fill"></i> Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarCamion(camion.id_camion)}
                  >
                    <i className="bi bi-trash3-fill"></i> Eliminar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <br />

      <div className="camiones-header">
        <h2>Asignacion Ruta a Camion</h2>

        <button className="btn-crear" onClick={() => navigate(`asignar`)}>
          <i className="bi bi-truck"></i>+ Asignar
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-camiones">

          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Camion</th>
              <th>Ruta</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {asigCam.map((asig) => (
              <tr key={asig.id_asignacion}>
                <td>{asig.id_asignacion}</td>
                <td>{asig.fecha}</td>
                <td>{asig.camion.conductor}</td>
                <td>{asig.ruta.nombre}</td>

                <td className="acciones">
                  <button className="btn-editar">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button className="btn-eliminar"
                  onClick={() => eliminarAsignacion(asig.id_asignacion)}>
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                  <button className="btn-camion">
                    <i className="bi bi-truck"></i>
                  </button>
                  <button className="btn-ruta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair2" viewBox="0 0 16 16">
                      <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Camiones;