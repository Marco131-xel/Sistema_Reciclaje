import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import type { Verde } from "../../types/PuntoVerde";

function Add() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [verde, setVerde] = useState<Verde | null>(null)
    
    const [form, setForm] = useState({
        cantidad: "",
        fecha_hora: "",
        codigo_ciudadano: "",
        id_contenedor: ""
    })

    const limpiarFormulario = () => {
        setForm({
            cantidad: "",
            fecha_hora: "",
            codigo_ciudadano: "",
            id_contenedor: ""      
        })
    }

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

    useEffect(() => {
        cargarDatos()
    }, [])

    const addContiner = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            await api.post("/entrega", form)

            await Swal.fire({
                title: "Camión creado",
                text: "Se carga los datos",
                icon: "success",
                confirmButtonColor: "#1abc9c",
                background: "#051F20",
                color: "#fff"
            })
            limpiarFormulario()
            navigate("/ope/control")

        } catch (error: any) {
            console.error("Error agregando contenido", error)
    
            Swal.fire({
                title: "Error",
                text: "No se pudo agregar datos",
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

                <form onSubmit={addContiner} className="control-crear-form">

                    <div className="control-crear-group">
                        <label>Cantidad</label>
                        <input 
                        type="number" 
                        name="cantidad"
                        className="control-crear-input"
                        value={form.cantidad}
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="control-crear-group">
                        <label>Codigo Ciudadano</label>
                        <input 
                        type="number" 
                        name="codigo_ciudadano"
                        className="control-crear-input"
                        value={form.codigo_ciudadano}
                        onChange={handleChange}
                        required/>
                    </div>

                    <div className="control-crear-group">
                        <label>Contenedor</label>
                        <select name="id_contenedor" 
                        value={form.id_contenedor}
                        onChange={handleChange}
                        required>
                            <option value="">Seleccione un Contenedor</option>
                            {verde?.contenedores.map((c) => (
                                <option key={c.id_contenedor} value={c.id_contenedor}>
                                Contenedor {c.id_contenedor} - {c.material.nombre}
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

export default Add