import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import "./camion.css";
import type { Camion, Ruta } from "../../types/Ruta";

function Assign() {
    const navigate = useNavigate();
    const [camion, setCamion] = useState<Camion[]>([]);
    const [ruta, setRuta] = useState<Ruta[]>([]);

    const [form, setForm] = useState({
        fecha: "",
        id_camion: "",
        id_ruta: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarCamiones();
        cargarRutas();

        const hoy = new Date().toISOString().split("T")[0];

        setForm((prev) => ({
            ...prev,
            fecha: hoy
        }));
    }, []);

    // funcion para cargar los camiones 
    const cargarCamiones = async () => {
        try {
            const res = await api.get("/camiones");
            setCamion(res.data)
        } catch (error) {
            console.error("Error cargando camiones", error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los camiones",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#111",
                color: "#fff"
            });
        }
    }

    // funcion para cargar las rutas
    const cargarRutas = async () => {
        try {
            const res = await api.get("/rutas");
            setRuta(res.data);
        } catch (error) {
            console.error("Error cargando rutaas", error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar las rutas",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#111",
                color: "#fff"
            });
        }
    }

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
            fecha: "",
            id_camion: "",
            id_ruta: "",
        });
    };

    const guardarAsig = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await api.post("asig-camion", form);

            await Swal.fire({
                title: "Camión creado",
                text: "El camión fue registrado correctamente.",
                icon: "success",
                confirmButtonColor: "#1abc9c",
                background: "#051F20",
                color: "#fff"
            });

            limpiarFormulario();
            navigate("/coord/camiones")
        } catch (error: any) {
            console.error("Error Asignando Camion", error);

            Swal.fire({
                title: "Error",
                text:
                error?.response?.data?.message ||
                "No se pudo crear el camión.",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#051F20",
                color: "#fff"
            }); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="camion-crear-page">
            <div className="camion-crear-container">
                <h2 className="camion-crear-title">
                    <i className="bi bi-truck"></i>+ Asignar Camion
                </h2>

                <form onSubmit={guardarAsig} className="camion-crear-form">

                    <div className="camion-crear-group">
                        <label>Fecha</label>
                        <input type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="camion-crear-group">
                        <label>Camion</label>
                        <select 
                        name="id_camion" 
                        value={form.id_camion}
                        onChange={handleChange}
                        required>
                            <option value="">Seleccione un Camion</option>
                            {camion.map((c) => (
                                <option key={c.id_camion} value={c.id_camion}>
                                    {c.placa} - {c.conductor} - {c.estado}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="camion-crear-group">
                        <label>Ruta</label>
                        <select name="id_ruta"
                        value={form.id_ruta}
                        onChange={handleChange}
                        required>
                            <option value="">Seleccione una Ruta</option>
                            {ruta.map((r) => (
                                <option key={r.id_ruta} value={r.id_ruta}>
                                    {r.nombre} - {r.horario} - {r.zona.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="camion-crear-buttons">
                        <button
                        type="submit"
                        className="camion-crear-btn-guardar"
                        disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </button>

                        <button
                        type="button"
                        className="camion-crear-btn-cancelar"
                        onClick={() => navigate("/coord/camiones")}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Assign;