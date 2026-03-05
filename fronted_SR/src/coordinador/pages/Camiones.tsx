import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Camion {
  id_camion: number;
  placa: string;
  capacidad_ton: number;
  estado: string;
  conductor: string;
}

function Camiones() {
  const [camiones, setCamiones] = useState<Camion[]>([]);
  const navigate = useNavigate();

  const obtenerCamiones = async () => {
    try {
      const res = await api.get("/camiones");
      setCamiones(res.data);
    } catch (error) {
      console.error("Error cargando camiones", error);
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

  useEffect(() => {
    obtenerCamiones();
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
    </div>
  );
}

export default Camiones;