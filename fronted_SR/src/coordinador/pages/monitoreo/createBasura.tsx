import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import type { Ruta } from "../../types/Ruta";

function CrearBasura() {
    
    const navigate = useNavigate();
    const [ruta, setRuta] = useState<Ruta[]>([]);

    const [form, setForm] = useState({
        cantidad_puntos: "",
        volumen_estimado: "",
        total_estimado: "",
        dia_semana: "",
        historial: "",
        id_ruta: ""
    });

    const [loading, setLoading] = useState(false);

    // cargar rutas
    const cargarRutas = async () => {
        try {
            const res = await api.get("/rutas");
            setRuta(res.data);
        } catch (error) {
            console.error("Error cargando rutas", error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar las rutas",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#111",
                color: "#fff"
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const limpiarFormulario = () => {
        setForm({
            cantidad_puntos: "",
            volumen_estimado: "",
            total_estimado: "",
            dia_semana: "",
            historial: "",
            id_ruta: ""
        });
    };

    const guardarBasura = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await api.post("/generar-basura", form);

            await Swal.fire({
                title: "Registro creado",
                text: "La generación de basura fue registrada correctamente.",
                icon: "success",
                confirmButtonColor: "#1abc9c",
                background: "#051F20",
                color: "#fff"
            });

            limpiarFormulario();
            navigate("/coord/monitoreo");

        } catch (error: any) {
            console.error("Error creando basura", error);

            Swal.fire({
                title: "Error",
                text:
                    error?.response?.data?.message ||
                    "No se pudo registrar la generación.",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#051F20",
                color: "#fff"
            });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarRutas();
    }, []);

    return (
        <div className="basura-crear-page">

            <div className="basura-crear-container">

                <h2 className="basura-crear-title">
                    <i className="bi bi-trash3-fill"></i> Generar Basura
                </h2>

                <form onSubmit={guardarBasura} className="basura-crear-form-group">

                    <div className="basura-crear-group">
                        <label>Cantidad de Puntos</label>
                        <input
                            type="number"
                            name="cantidad_puntos"
                            className="basura-crear-input"
                            value={form.cantidad_puntos}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="basura-crear-group">
                        <label>Volumen Estimado</label>
                        <input
                            type="number"
                            name="volumen_estimado"
                            className="basura-crear-input"
                            value={form.volumen_estimado}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="basura-crear-group">
                        <label>Total Estimado</label>
                        <input
                            type="number"
                            name="total_estimado"
                            className="basura-crear-input"
                            value={form.total_estimado}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="basura-crear-group">
                        <label>Días de la Semana</label>
                        <input
                            type="text"
                            name="dia_semana"
                            className="basura-crear-input"
                            value={form.dia_semana}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="basura-crear-group full-width">
                        <label>Historial</label>
                        <input
                            type="text"
                            name="historial"
                            className="basura-crear-input"
                            value={form.historial}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="basura-crear-group full-width">
                        <label>Ruta</label>
                        <select
                            name="id_ruta"
                            className="basura-crear-select"
                            value={form.id_ruta}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione una ruta</option>

                            {ruta.map((r) => (
                                <option key={r.id_ruta} value={r.id_ruta}>
                                    {r.nombre} - {r.horario} - {r.zona.nombre}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className="basura-crear-buttons">

                        <button
                            type="submit"
                            className="basura-crear-btn-guardar"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </button>

                        <button
                            type="button"
                            className="basura-crear-btn-cancelar"
                            onClick={() => navigate("/coord/monitoreo")}
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CrearBasura;