import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import type { Material, Verde } from "../../types/PuntoVerde";

function CrearContenedor() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [verde, setVerde] = useState<Verde | null>(null)
    const [material, setMaterial] = useState<Material[]>([]);
    
    const [form, setForm] = useState({
        capacidad: "",
        porcentaje: "",
        id_material: ""
    })

    const limpiarFormulario = () => {
        setForm({
            capacidad: "",
            porcentaje: "",
            id_material: ""    
        })
    }

    const capacidadUsada = verde?.contenedores.reduce(
        (total, c) => total + Number(c.capacidad),
        0
        ) ?? 0

    const capacidadDisponible = verde
        ? Number(verde.capacidad) - capacidadUsada
        : 0

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        })
    }

    const cargarDatos = async () => {
        try {
            const res = await api.get(`/punto-verde/${id}`)
            setVerde(res.data)
        } catch (error) {
            console.error("Error cargar Datos", error)
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los datos",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#111",
                color: "#fff"
            })  
        }
    }

    const cargarMaterial = async () => {
        try {
            const res = await api.get("/material")
            setMaterial(res.data)
        } catch (error) {
            console.error("Error cargar Material", error)
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los Materiales",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#111",
                color: "#fff"
            })  
        }
    }

    useEffect(() => {
        cargarDatos()
        cargarMaterial()
    }, [])

    const createContiner = async (e: React.FormEvent) => {
        e.preventDefault()

        const capacidadNueva = Number(form.capacidad)

        if (capacidadNueva > capacidadDisponible) {
            Swal.fire({
            title: "Capacidad excedida",
            text: `Solo quedan ${capacidadDisponible} kg disponibles`,
            icon: "warning",
            confirmButtonColor: "#e74c3c",
            background: "#051F20",
            color: "#fff"
            })
            return
        }

        try {
            setLoading(true)

            await api.post("/contenedor", {
            capacidad: capacidadNueva,
            porcentaje: 0,
            id_punto_verde: Number(id),
            id_material: Number(form.id_material),
            background: "#051F20",
            color: "#fff"
            })

            await Swal.fire({
            title: "Contenedor creado",
            icon: "success",
            confirmButtonColor: "#1abc9c",
            background: "#051F20",
            color: "#fff"
            })
            
            limpiarFormulario()
            navigate("/ope/control")

        } catch (error) {

            Swal.fire({
            title: "Error",
            text: "No se pudo crear el contenedor",
            icon: "error",
            confirmButtonColor: "#e74c3c",
            background: "#051F20",
            color: "#fff"
            })

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="control-crear-page">
            <div className="control-crear-container">
                <h2 className="control-crear-title">Agregar Contenido</h2>
                {verde && (
                <div className="control-capacidad-info">
                    <p><strong>Punto Verde:</strong> {verde.nombre}</p>

                    <p>
                    Capacidad total: <b>{verde.capacidad} kg</b>
                    </p>

                    <p>
                    Usado: <b>{capacidadUsada} kg</b>
                    </p>

                    <p>
                    Disponible: 
                    <b style={{color:"#1abc9c"}}> {capacidadDisponible} kg</b>
                    </p>
                </div>
                )}
                <form onSubmit={createContiner} className="control-crear-form">

                    <div className="control-crear-group">
                        <label>Capacidad</label>
                        <input 
                        type="number" 
                        name="capacidad"
                        className="control-crear-input"
                        value={form.capacidad}
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="control-crear-group">
                        <label>Material</label>
                        <select name="id_material" 
                        value={form.id_material}
                        onChange={handleChange}
                        required>
                            <option value="">Seleccione un Contenedor</option>
                            {material.map((m) => (
                                <option key={m.id_material} value={m.id_material}>
                                    {m.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="control-crear-buttons">
                        <button type="submit"
                        className="control-crear-btn-guardar"
                        disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </button>

                        <button type="button"
                        className="control-crear-btn-cancelar"
                        onClick={() => navigate(-1)}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CrearContenedor