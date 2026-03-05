import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { Ruta } from "../types/Ruta";
import "./ruta/ruta.css"

function Rutas() {

  const [rutas, setRutas] = useState<Ruta[]>([]);
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

                  <button className="btn-ver" onClick={() => navigate(`/rutas/${ruta.id_ruta}`)}>
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

    </div>
  );
}

export default Rutas;