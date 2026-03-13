import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import MapView from "../../../components/MapView";

function CrearPuntoVerde() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        nombre: "",
        direccion: "",
        latitud: "",
        longitud:"",
        capacidad: "",
        horario: "",
        encargado: ""
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const limpiarFormulario = () => {
        setForm({
            nombre: "",
            direccion: "",
            latitud: "",
            longitud:"",
            capacidad: "",
            horario: "",
            encargado: ""
        })
    }

    const guardarPuntos = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            await api.post("/punto-verde", form)

            await Swal.fire({
                title: "Registro creado",
                text: "La generación de basura fue registrada correctamente.",
                icon: "success",
                confirmButtonColor: "#1abc9c",
                background: "#051F20",
                color: "#fff"
            })
            
            limpiarFormulario()
            navigate("/ope/registro")
        } catch (error: any) {
            console.error("Error creando puntos verdes", error)
            Swal.fire({
                title: "Error",
                text:
                    error?.response?.data?.message ||
                    "No se pudo registrar la generación.",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#051F20",
                color: "#fff"
            })
        } finally {
            setLoading(false)
        }
    }

  // agregar coordenada
    const inicioCoords =
        form.latitud && form.longitud
            ? [Number(form.latitud), Number(form.longitud)] as [number, number]
            : undefined

    const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

    const handleMapClick = (lat: number, lng: number) => {
        if (!form.latitud || !form.longitud) {
            set("latitud", lat.toFixed(6));
            set("longitud", lng.toFixed(6));
            return;
        }
    }

    const limpiarCoordenadas = () => {
        setForm(f => ({
            ...f,
            latitud: "",
            longitud: ""
        }))
    }

    return (
        <div className="ruta-wrapper">
            <div className="ruta-header">
                <h1>Nuevos Puntos Verdes</h1>
                <p>Modulo de Puntos Verderdes y Reciclaje</p>

                <div className="ruta-card">
                    <div className="ruta-card-header">
                        <h2>Registro de Puntos</h2>
                        <span>Verdes</span>
                    </div>

                    <div className="ruta-card-body">
                        <div className="ruta-grid">

                            {/* COLUMNA IZQUIERDA */}
                            <div>
                                <div className="section-label">Información General</div>

                                <div className="form-group">
                                    <label>Nombre del Punto</label>
                                    <input type="text"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}/>
                                </div>

                                <div className="section-label">Coordenadas</div>
                                {/* LATITUD Y LONGITUD */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Latitud</label>
                                        <input type="number"
                                        name="latitud"
                                        value={form.latitud}
                                        onChange={handleChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Longitud</label>
                                        <input type="number"
                                        name="longitud"
                                        value={form.longitud}
                                        onChange={handleChange}/>
                                    </div>
                                </div>
                                {/* DIRECCION Y CAPACIDAD */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Dirección</label>
                                        <input type="text"
                                        name="direccion"
                                        value={form.direccion}
                                        onChange={handleChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Capacidad</label>
                                        <input type="number"
                                        name="capacidad"
                                        value={form.capacidad}
                                        onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="section-label">Encargado y Horario</div>
                                {/* ENCARGADO Y HORARIO*/}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nombre Encargado</label>
                                        <input type="text"
                                        name="encargado"
                                        value={form.encargado}
                                        onChange={handleChange}/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Hora</label>
                                            <input type="text"
                                            name="horario"
                                            value={form.horario}
                                            onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>
                                {/* BOTON GUARDAR */}
                                <button className="btn-guardar" onClick={guardarPuntos} disabled={loading}>
                                    {loading ? "Guardando..." : "Guardar Punto"}
                                </button>

                            </div>

                            {/* COLUMNA DERECHA */}
                            <div className="map-side">
                                {/* MAPA */}
                                <div className="map-box">
                                    <div className="map-overlay-grid">
                                        <MapView inicio={inicioCoords} onMapClick={handleMapClick} />
                                        <button className="btn-icon-limpiar" onClick={limpiarCoordenadas} title="Limpiar coordenadas"><i className="bi bi-trash-fill"></i></button>
                                    </div>
                                </div>
                                {/* RESUMEN */}
                                <div className="resumen-box">
                                    <div className="resumen-title">Resumen</div>

                                    <div className="resumen-item">
                                        <span>Nombre</span>
                                        <span>{form.nombre || "-"}</span>
                                    </div>
                                    <div className="resumen-item">
                                        <span>(Latitud, Longitud)</span>
                                        <span> {form.latitud && form.longitud ? `${form.latitud}, ${form.longitud}`: "-"} </span>
                                    </div>
                                    <div className="resumen-item">
                                        <span>Dirección</span>
                                        <span>{form.direccion || "-"}</span>
                                    </div>
                                    <div className="resumen-item">
                                        <span>Capacidad</span>
                                        <span>{form.capacidad || "-"}</span>
                                    </div>
                                    <div className="resumen-item">
                                        <span>Encargado</span>
                                        <span>{form.encargado || "-"}</span>
                                    </div>  
                                    <div className="resumen-item">
                                        <span>Horario</span>
                                        <span>{form.horario || "-"}</span>
                                    </div>                                  
                                </div>
                                {/* BOTON CANCELAR */}
                                <div>
                                    <button className="ruta-crear-btn-cancelar"
                                    onClick={() => navigate("/ope/registro")}>
                                        Cancelar
                                    </button>
                                </div>   
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrearPuntoVerde