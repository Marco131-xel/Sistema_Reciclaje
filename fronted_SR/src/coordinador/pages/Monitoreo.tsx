import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { Generar_Basura, Punto_Recoleccion } from "../types/Basura";
import MapView from "../../components/MapView";
import { IconTrash } from "../../components/IconTrash";

function Monitoreo() {
  const [generar, setGenerar] = useState<Generar_Basura[]>([]);
  const [punto, setPunto] = useState<Punto_Recoleccion[]>([]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoModal, setTipoModal] = useState<"ruta" | null>(null);
  const [rutaSeleccionada, setRutaSeleccionada] = useState<any>(null);
  const navigate = useNavigate();

  // funcion para obtener generacion de basura
  const obtenerGeneracion = async () => {
    try {
      const res = await api.get("/generar-basura");
      setGenerar(res.data);
    } catch (error) {
      console.error("Error cargando Generacion de basura", error)
    }
  }

  // funcion para obtener puntos de recoleccion
  const obtenerPuntos = async () => {
    try {
      const res = await api.get("/punto-recoleccion");
      setPunto(res.data);
    } catch (error) {
      console.error("Error cargando puntos de recoleccion", error);
    }
  }

  useEffect(() => {
    obtenerGeneracion();
    obtenerPuntos();
  }, []);

  const verRuta = (ruta:any) => {
    setTipoModal("ruta");
    setRutaSeleccionada(ruta);
    setModalAbierto(true);
  }

  const cerrarModal = () => {
    setModalAbierto(false);
  }

  const eliminarGen = async (id:number) => {
    const result = await Swal.fire({
      title: "¿Eliminar Basura?",
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
      await api.delete(`/generar-basura/${id}`);

      await Swal.fire({
        title: "Eliminado",
        text: "El camión fue eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#1abc9c",
        background: "#051F20",
        color: "#fff"
      });

      obtenerGeneracion();
    } catch (error) {
      console.error("Error eliminado", error);
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

  const obtenerEstado = (total: number) => {

    if (total <= 2000) {
      return {
        texto: "Normal",
        clase: "estado-normal",
        icono: "bi bi-check-circle-fill"
      };
    }

    if (total <= 3500) {
      return {
        texto: "Media",
        clase: "estado-media",
        icono: "bi bi-exclamation-triangle-fill"
      };
    }

    return {
      texto: "Alta carga",
      clase: "estado-alta",
      icono: "bi bi-x-octagon-fill"
    };
  };

  return (
    <div className="camiones-container">

      <div className="camiones-header">
        <h2><i className="bi bi-trash3-fill"></i> Generacion de basura por rutas</h2>

        <button className="btn-crear" onClick={() => navigate("crearBasura")}>
          +<i className="bi bi-trash3-fill"></i>
        </button>
      </div>

      <div className="tabla-container">
        <table className="tabla-camiones">

          <thead>
            <tr>
              <th>Ruta</th>
              <th>Dia</th>
              <th>Puntos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
          {generar.map((g) => {

            const estado = obtenerEstado(g.total_estimado);

            return (
              <tr key={g.id_generacion}>
                <td>{g.ruta.nombre}</td>
                <td>{g.dia_semana}</td>
                <td>{g.cantidad_puntos}</td>
                <td>{g.total_estimado}</td>

                <td className={estado.clase}>
                  <i className={estado.icono}></i> {estado.texto}
                </td>
                <td className="acciones">
                  <button className="btn-editar" title="Editar">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button className="btn-eliminar" title="Eliminar"
                  onClick={() => eliminarGen(g.id_generacion)}>
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                  <button className="btn-ruta" title="Ver Ruta"
                  onClick={() => verRuta(g.ruta)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair2" viewBox="0 0 16 16">
                      <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>

        </table>
      </div>

      <br />

      <div className="camiones-header">
        <h2><i className="bi bi-geo-alt-fill"></i> Mapa de Puntos de Recoleccion</h2>
      </div>

      <div className="tabla-container">
        <div className="map-todo">
          <div className="map-overlay-grid">
            <MapView 
            puntos={punto}
            iconPuntos={IconTrash}
            onMapClick={() => {}}
            />
          </div>
        </div>
      </div>
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-box">
              {tipoModal === "ruta" && rutaSeleccionada && (
                <>
                  <div className="modal-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair2" viewBox="0 0 16 16">
                      <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
                    </svg> Información de Ruta</div>

                  <div className="modal-group">
                    <label className="modal-label">ID Ruta</label>
                    <div className="modal-value">{rutaSeleccionada.id_ruta}</div>
                  </div>

                  <div className="modal-group">
                    <label className="modal-label">Nombre</label>
                    <div className="modal-value">{rutaSeleccionada.nombre}</div>
                  </div>

                  <div className="modal-group">
                    <label className="modal-label">Distancia</label>
                    <div className="modal-value">{rutaSeleccionada.distancia_km} km</div>
                  </div>

                  <div className="modal-group">
                    <label className="modal-label">Días de Recolección</label>
                    <div className="modal-value">{rutaSeleccionada.dias_recoleccion}</div>
                  </div>
                <button className="modal-btn" onClick={() => navigate(`/coord/rutas/ver/${rutaSeleccionada.id_ruta}`)}>
                  Ver Mas
                </button>
                </>
              )}
              <div className="modal-actions">
                <button className="modal-btn" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Monitoreo;