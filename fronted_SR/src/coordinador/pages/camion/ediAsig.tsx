import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import type { Camion, Ruta } from "../../types/Ruta";

function EditarAsignacion () {
    const { id } = useParams();
    const navigate = useNavigate();

    const [camion, setCamion] = useState<Camion[]>([]);
    const [ruta, setRuta] = useState<Ruta[]>([]);

    const [form, setForm] = useState({
        fecha: "",
        id_camion: "",
        id_ruta: "",
    });

    const [loading, setLoading] = useState(false);

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

    const obtnerAsigCam = async () => {
        try {
            const res = await api.get(`/asig-camion/${id}`);
            const data = res.data;

            setForm({
                fecha: data.fecha,
                id_camion: data.camion.id_camion,
                id_ruta: data.ruta.id_ruta
            });
        } catch (error) {
            console.error("Error cargando Asignacion", error);
        }
    };

    useEffect(() => {
        obtnerAsigCam();
        cargarCamiones();
        cargarRutas();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const actualizarAsignacion = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            await api.put(`/asig-camion/${id}`, form);
            Swal.fire({
                icon: "success",
                title: "Asignacion actualizada",
                text: "Los datos se actualizaron correctamente",
                confirmButtonColor: "#3085d6",
                background: "#051F20",
                color: "#fff"
            });

            navigate("/coord/camiones");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar la Asignacion",
                background: "#051F20",
                color: "#fff"
            });            
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="editcam-container">
            <div className="editcam-box">
                <h2 className="editcam-title">Editar Asignacion</h2>

                <form className="editcam-form" onSubmit={actualizarAsignacion}>
                    <div className="editcam-group">
                        <label className="editcam-label">Fecha</label>
                        <input type="date"
                        className="editcam-input"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="editcam-group">
                        <label className="editcam-label">Camion</label>
                        <select name="id_camion" 
                        className="editcam-select"
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
                    <div className="editcam-group">
                        <label className="editcam-label">Ruta</label>
                        <select name="id_ruta" 
                        className="editcam-select"
                        value={form.id_ruta}
                        onChange={handleChange}
                        required>
                            <option value="">Seleccione un Ruta</option>
                            {ruta.map((r) => (
                                <option key={r.id_ruta} value={r.id_ruta}>
                                    {r.nombre} - {r.horario} - {r.zona.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="editcam-actions">

                        <button type="submit" 
                        className="editcam-btn-save"
                        disabled={loading}>
                        {loading ? "Actualizando..." : "Actualizar"}
                        </button>

                        <button
                        type="button"
                        className="editcam-btn-cancel"
                        onClick={() => navigate("/coord/camiones")}
                        >
                        Cancelar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditarAsignacion;