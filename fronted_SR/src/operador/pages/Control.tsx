import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";
import type { Verde, Contenedor } from "../types/PuntoVerde";

function Control() {
  const [verde, setVerde] = useState<Verde[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [puntoSeleccionado, setPuntoSeleccionado] = useState<Verde | null>(null);
  const [contenedoresFiltrados, setContenedoresFiltrados] = useState<Contenedor[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const obtenerDatos = async (url: any, setState: any, mensajeError: any) => {
    try {
      const res = await api.get(url);
      setState(res.data);
    } catch (error) {
      console.error("Error cargando ", mensajeError, error);
      Swal.fire({
        title: "Error",
        text: "No se encontraron los datos",
        icon: "error",
        confirmButtonColor: "#2d6a4f",
        background: "#051F20",
        color: "#fff",
      });
    }
  };

  useEffect(() => {
    obtenerDatos("/punto-verde", setVerde, "Punto verdes");
  }, []);

  const handleBuscar = () => {
    const id = parseInt(searchId);
    if (!searchId || isNaN(id)) {
      Swal.fire({
        title: "Ingresa un ID",
        text: "Por favor escribe un número de Punto Verde válido.",
        icon: "warning",
        confirmButtonColor: "#2d6a4f",
        background: "#051F20",
        color: "#fff",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const pv = verde.find((v) => v.id_punto_verde === id);
      if (!pv) {
        setPuntoSeleccionado(null);
        setContenedoresFiltrados([]);
        Swal.fire({
          title: "No encontrado",
          text: `No existe un Punto Verde con ID ${id}.`,
          icon: "info",
          confirmButtonColor: "#2d6a4f",
          background: "#051F20",
          color: "#fff",
        });
      } else {
        setPuntoSeleccionado(pv);
        setContenedoresFiltrados(pv.contenedores || []);
      }
      setLoading(false);
    }, 400);
  };

  const getColorPorcentaje = (porcentaje: number) => {
    if (porcentaje >= 80) return "#e74c3c";
    if (porcentaje >= 50) return "#f39c12";
    return "#2d6a4f";
  };

  const getLabelPorcentaje = (porcentaje: number) => {
    if (porcentaje >= 80) return "Crítico";
    if (porcentaje >= 50) return "Moderado";
    return "Normal";
  };

  return (
    <>
      <div className="cc-root">
        {/* Header */}
        <div className="cc-header">
          <div className="cc-title-row">
            <h1 className="cc-title"><i className="bi bi-trash2-fill"></i> Control de Contenedores</h1>
          </div>
          <p className="cc-subtitle">Verificar contenedores de cada Punto Verde</p>
        </div>

        {/* Buscador */}
        <div className="cc-search-bar">
          <span className="cc-search-label">ID Punto Verde</span>
          <input
            className="cc-search-input"
            type="number"
            min={1}
            placeholder="Ej. 1"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
          />
          <button className="cc-btn" onClick={handleBuscar}>
            <i className="bi bi-search"></i>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="cc-spinner">
            <div className="spinner" />
          </div>
        )}

        {/* Info Punto Verde */}
        {!loading && puntoSeleccionado && (
          <>
            <div className="cc-info-card">
              <div className="cc-info-nombre">
                {puntoSeleccionado.nombre}
                <span className="cc-badge-id">
                  ID #{puntoSeleccionado.id_punto_verde}
                </span>
              </div>
              <div className="cc-info-grid">
                <div className="cc-info-item">
                  <span className="cc-info-key">Dirección</span>
                  <span className="cc-info-val">{puntoSeleccionado.direccion}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-key">Encargado</span>
                  <span className="cc-info-val">{puntoSeleccionado.encargado}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-key">Horario</span>
                  <span className="cc-info-val">{puntoSeleccionado.horario}</span>
                </div>
                <div className="cc-info-item">
                  <span className="cc-info-key">Capacidad total</span>
                  <span className="cc-info-val">{puntoSeleccionado.capacidad} kg</span>
                </div>
                <div className="cc-actions">
                  <button className="cc-btn2" 
                  onClick={() => navigate(`crear/${puntoSeleccionado.id_punto_verde}`)}
                  title="Crear Contenedor">
                    +<i className="bi bi-trash2"></i>
                  </button>
                  <button className="cc-btn2" 
                  onClick={() => navigate(`add/${puntoSeleccionado.id_punto_verde}`)}
                  title="Agregar a Contenedor">
                    +<i className="bi bi-box-seam"></i>
                  </button>
                </div>
              </div>


            </div>

            {/* Contenedores */}
            <p className="cc-section-title">
              Contenedores ({contenedoresFiltrados.length})
            </p>

            {contenedoresFiltrados.length === 0 ? (
              <div className="cc-empty">
                No hay contenedores registrados para este Punto Verde.
              </div>
            ) : (
              <div className="cc-grid">
                {contenedoresFiltrados.map((c) => {
                  const pct = Number(c.porcentaje) || 0;
                  const color = getColorPorcentaje(pct);
                  const label = getLabelPorcentaje(pct);
                  return (
                    <div className="cc-contenedor-card" key={c.id_contenedor}>
                      <div className="cc-card-top">
                        <span className="cc-material-name">
                          {c.material.nombre ?? "—"}
                        </span>
                        <span
                          className="cc-status-chip"
                          style={{
                            background: color + "22",
                            color: color,
                            border: `1px solid ${color}55`,
                          }}
                        >
                          {label}
                        </span>
                      </div>

                      <div className="cc-bar-wrap">
                        <div
                          className="cc-bar-fill"
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            background: color,
                          }}
                        />
                      </div>

                      <div className="cc-card-stats">
                        <div className="cc-stat">
                          <span className="cc-stat-key">Porcentaje </span>
                          <span className="cc-stat-val" style={{ color }}>
                            {pct}%
                          </span>
                        </div>
                        <div className="cc-stat">
                          <span className="cc-stat-key">Capacidad </span>
                          <span className="cc-stat-val">{c.capacidad} kg</span>
                        </div>
                        <div className="cc-stat">
                          <span className="cc-stat-key">ID </span>
                          <span className="cc-stat-val">#{c.id_contenedor}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Estado inicial */}
        {!loading && !puntoSeleccionado && (
          <div className="cc-empty">
            Ingresa el ID de un Punto Verde para ver sus contenedores.
          </div>
        )}
      </div>
    </>
  );
}

export default Control;