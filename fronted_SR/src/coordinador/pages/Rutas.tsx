import { useState, useEffect } from "react";
import MapView from "../../components/MapView"
import { calcularDistancia } from "../../types/distancia";

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

export default function Ruta() {

  const [form, setForm] = useState({
    nombre: "",
    zona: "",
    distancia_km: "",
    horaInicio: "",
    horaFin: "",
    tipo_residuo: "",
    dias: [] as string[],

    inicio_lat: "",
    inicio_lng: "",
    fin_lat: "",
    fin_lng: "",
  });

  const set = (k: string, v: any) =>
    setForm(f => ({ ...f, [k]: v }));

  const toggleDia = (dia: string) => {
    setForm(f => ({
      ...f,
      dias: f.dias.includes(dia)
        ? f.dias.filter(d => d !== dia)
        : [...f.dias, dia]
    }));
  };

   const horarioInvalido =
    !!(
        form.horaInicio &&
        form.horaFin &&
        form.horaFin <= form.horaInicio
    );

  const handleGuardar = () => {
    if (
      !form.nombre ||
      !form.zona ||
      horarioInvalido ||
      !form.inicio_lat ||
      !form.inicio_lng ||
      !form.fin_lat ||
      !form.fin_lng
    ) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    const horario = `${form.horaInicio} - ${form.horaFin}`;

    console.log({
      ...form,
      horario
    });

    alert("Ruta guardada correctamente");
  };
  // limpiar coordenadas
  const limpiarCoordenadas = () => {
    setForm(f => ({
      ...f,
      inicio_lat: "",
      inicio_lng: "",
      fin_lat: "",
      fin_lng: "",
      distancia_km: ""
    }));
  };
  // calcular distancia manual
  useEffect(() => {

    if (
      form.inicio_lat &&
      form.inicio_lng &&
      form.fin_lat &&
      form.fin_lng
    ) {

      const lat1 = parseFloat(form.inicio_lat);
      const lng1 = parseFloat(form.inicio_lng);
      const lat2 = parseFloat(form.fin_lat);
      const lng2 = parseFloat(form.fin_lng);

      const distancia = calcularDistancia(lat1, lng1, lat2, lng2);

      set("distancia_km", distancia.toFixed(2));
    }

  }, [
    form.inicio_lat,
    form.inicio_lng,
    form.fin_lat,
    form.fin_lng
  ]);

  // agregar coordenada
  const inicioCoords =
    form.inicio_lat && form.inicio_lng
      ? [Number(form.inicio_lat), Number(form.inicio_lng)] as [number, number]
      : undefined;

  const finCoords =
    form.fin_lat && form.fin_lng
      ? [Number(form.fin_lat), Number(form.fin_lng)] as [number, number]
      : undefined;

  // agregar coordenadas al tocar mapa
  const handleMapClick = (lat: number, lng: number) => {

    if (!form.inicio_lat || !form.inicio_lng) {
      set("inicio_lat", lat.toFixed(6));
      set("inicio_lng", lng.toFixed(6));
      return;
    }

    if (!form.fin_lat || !form.fin_lng) {

      set("fin_lat", lat.toFixed(6));
      set("fin_lng", lng.toFixed(6));

      const distancia = calcularDistancia(
        parseFloat(form.inicio_lat),
        parseFloat(form.inicio_lng),
        lat,
        lng
      );

      set("distancia_km", distancia.toFixed(2));

    }

  };

  return (
    <div className="ruta-wrapper">

      <div className="ruta-header">
        <h1>Nueva Ruta</h1>
        <p>Módulo de gestión de rutas de recolección</p>
      </div>

      <div className="ruta-card">
        <div className="ruta-card-header">
          <h2><i className="bi bi-sign-turn-right"></i> Registro de Ruta</h2>
          <span>Recolección</span>
        </div>

        <div className="ruta-card-body">
          <div className="ruta-grid">

            {/* COLUMNA IZQUIERDA */}
            <div>

              <div className="section-label"><i className="bi bi-info-circle-fill"></i> Información General</div>

              <div className="form-group">
                <label>Nombre de la ruta *</label>
                <input
                  value={form.nombre}
                  onChange={e => set("nombre", e.target.value)}
                />
              </div>

              <div className="section-label"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair2" viewBox="0 0 16 16">
                <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
              </svg> Coordenadas</div>

              <div className="form-row">
                <div className="form-group">
                  <label>Inicio Latitud *</label>
                  <input
                    type="number"
                    step="any"
                    value={form.inicio_lat}
                    onChange={e => set("inicio_lat", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Inicio Longitud *</label>
                  <input
                    type="number"
                    step="any"
                    value={form.inicio_lng}
                    onChange={e => set("inicio_lng", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fin Latitud *</label>
                  <input
                    type="number"
                    step="any"
                    value={form.fin_lat}
                    onChange={e => set("fin_lat", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Fin Longitud *</label>
                  <input
                    type="number"
                    step="any"
                    value={form.fin_lng}
                    onChange={e => set("fin_lng", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Zona *</label>
                  <select
                    value={form.zona}
                    onChange={e => set("zona", e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    <option>Zona Norte</option>
                    <option>Zona Sur</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Distancia (km)</label>
                  <input
                    type="number"
                    value={form.distancia_km}
                    readOnly
                    className="input-readonly"
                  />
                </div>
              </div>

              <div className="section-label"><i className="bi bi-calendar2-week-fill"></i> Horario</div>

              <div className="form-row">
                <div className="form-group">
                  <label>Hora inicio *</label>
                  <input
                    type="time"
                    value={form.horaInicio}
                    onChange={e => set("horaInicio", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Hora fin *</label>
                  <input
                    type="time"
                    value={form.horaFin}
                    onChange={e => set("horaFin", e.target.value)}
                    className={horarioInvalido ? "input-error" : ""}
                  />
                </div>
              </div>

              {horarioInvalido && (
                <small className="error-text">
                  La hora fin debe ser mayor que la hora inicio
                </small>
              )}

              <div className="form-group">
                <label>Tipo de Residuo</label>
                <select
                  value={form.tipo_residuo}
                  onChange={e => set("tipo_residuo", e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option>Orgánico</option>
                  <option>Inorgánico</option>
                  <option>Mixto</option>
                </select>
              </div>

              <div className="section-label"><i className="bi bi-calendar2-week-fill"></i> Días de Operación</div>

              <div className="dias-grid">
                {diasSemana.map(d => (
                  <div
                    key={d}
                    className={`dia-chip ${form.dias.includes(d) ? "selected" : ""}`}
                    onClick={() => toggleDia(d)}
                  >
                    {d.slice(0, 3)}
                  </div>
                ))}
              </div>

              <button
                className="btn-guardar"
                onClick={handleGuardar}
                disabled={horarioInvalido}
              >
                Guardar Ruta
              </button>

            </div>

            {/* COLUMNA DERECHA */}
            <div className="map-side">

              <div className="map-box">
                <div className="map-overlay-grid" />
                <MapView inicio={inicioCoords} fin={finCoords} onMapClick={handleMapClick} />
                <button className="btn-icon-limpiar" onClick={limpiarCoordenadas} title="Limpiar coordenadas"><i className="bi bi-trash-fill"></i></button>
              </div>
              

              <div className="resumen-box">
                <div className="resumen-title"><i className="bi bi-card-text"></i> Resumen</div>

                <div className="resumen-item">
                  <span>Nombre</span>
                  <span>{form.nombre || "—"}</span>
                </div>

                <div className="resumen-item">
                  <span>Zona</span>
                  <span>{form.zona || "—"}</span>
                </div>

                <div className="resumen-item">
                  <span>Distancia</span>
                  <span>{form.distancia_km ? `${form.distancia_km} km` : "—"}</span>
                </div>

                <div className="resumen-item">
                  <span>Tipo</span>
                  <span>{form.tipo_residuo || "—"}</span>
                </div>

                <div className="resumen-item">
                  <span>Inicio (Latitud, Longitud)</span>
                  <span>
                    {form.inicio_lat && form.inicio_lng
                      ? `${form.inicio_lat}, ${form.inicio_lng}`
                      : "—"}
                  </span>
                </div>

                <div className="resumen-item">
                  <span>Fin (Latitud, Longitud)</span>
                  <span>
                    {form.fin_lat && form.fin_lng
                      ? `${form.fin_lat}, ${form.fin_lng}`
                      : "—"}
                  </span>
                </div>

                <div className="resumen-item">
                  <span>Horario</span>
                  <span>
                    {form.horaInicio && form.horaFin
                      ? `${form.horaInicio} - ${form.horaFin}`
                      : "—"}
                  </span>
                </div>

                <div className="resumen-item">
                  <span>Días</span>
                  <span>
                    {form.dias.length
                      ? form.dias.map(d => d.slice(0, 3)).join(", ")
                      : "—"}
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}