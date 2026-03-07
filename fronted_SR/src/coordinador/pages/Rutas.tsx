import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { Ruta, Coordenada } from "../types/Ruta";
import "./ruta/ruta.css"

function Rutas() {

  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [coordenadas, setCoordenadas] = useState<Coordenada[]>([]);
  const navigate = useNavigate();

  // obtener rutas
  const obtenerRutas = async () => {
    try {
      const res = await api.get("/rutas");
      setRutas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // obtener coordenadas
  const obtenerCoordenadas = async () => {
    try {
      const res = await api.get("/ruta-coordenadas");
      setCoordenadas(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  // eliminar rutas 
  const eliminarRutas = async (id:number) => {
    const resutl = await Swal.fire({
      title: "¿Eliminar Ruta?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      background: "#051F20",
      color: "#fff"
    });

    if (!resutl.isConfirmed) return;

    try {
      await api.delete(`/rutas/${id}`);

      await Swal.fire({
        title: "Eliminado",
        text: "La Ruta fue eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#1abc9c",
        background: "#051F20",
        color: "#fff"  
      });

      obtenerRutas();
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
  }

  useEffect(() => {
    obtenerRutas();
    obtenerCoordenadas();
  }, []);

  return (
    <div className="rutas-container">

      <div className="rutas-header">
        <h2><i className="bi bi-sign-turn-right"></i> Rutas y Zonas</h2>

        <button className="btn-crear" onClick={() => navigate("crear")}>
          <i className="bi bi-plus-square"></i> Nueva Ruta
        </button>
      </div>


      <div className="tabla-container">
        <table className="tabla-rutas">
          <thead>
            <tr>
              <th>Ruta</th>
              <th>Zona</th>
              <th>Dias</th>
              <th>Horario</th>
              <th>Tipo Residuo</th>
              <th>Distancia</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {rutas.map((ruta) => (
              <tr key={ruta.id_ruta}>
                <td>{ruta.nombre}</td>
                <td>{ruta.zona ? ruta.zona.nombre : "Sin zona"}</td>
                <td>{ruta.dias_recoleccion}</td>
                <td>{ruta.horario}</td>
                <td>{ruta.tipo_residuo}</td>
                <td>{ruta.distancia_km} km</td>

                <td className="acciones">

                  <button className="btn-ver" onClick={() => navigate(`ver/${ruta.id_ruta}`)}>
                    <i className="bi bi-eye"></i>
                  </button>

                  <button className="btn-editar" onClick={() => navigate(`/rutas/editar/${ruta.id_ruta}`)}>
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button className="btn-eliminar" onClick={() => eliminarRutas(ruta.id_ruta)}>
                    <i className="bi bi-trash"></i>
                  </button>

                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <br />
      <div className="rutas-header">
        <h2> 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair2" viewBox="0 0 16 16">
            <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
          </svg> Rutas y Coordenadas
        </h2>

        <button className="btn-crear">
          <i className="bi bi-plus-square"></i> Nueva Coordenada
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-rutas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Orden</th>
              <th>ID Ruta</th>
            </tr>
          </thead>

          <tbody>
            {coordenadas.map((coordenada) => (
              <tr key={coordenada.id_coord}>
                <td>{coordenada.id_coord}</td>
                <td>{coordenada.latitud}</td>
                <td>{coordenada.longitud}</td>
                <td>{coordenada.orden}</td>
                <td>{coordenada.ruta ? coordenada.ruta.id_ruta : "Sin Ruta"}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Rutas;