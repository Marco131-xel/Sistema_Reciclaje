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
        codigo_ciudadano: "",
        id_contenedor: ""
    })

    const limpiarFormulario = () => {
        setForm({
            cantidad: "",
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

    const contenedorSeleccionado =
        verde?.contenedores.find(
            (c) => c.id_contenedor === Number(form.id_contenedor)
        ) ?? null

    const capacidadContenedor = contenedorSeleccionado
        ? Number(contenedorSeleccionado.capacidad)
        : 0

    const porcentaje = contenedorSeleccionado
        ? Number(contenedorSeleccionado.porcentaje)
        : 0

    const usado = (capacidadContenedor * porcentaje) / 100

    const disponible = capacidadContenedor - usado

    useEffect(() => {
        cargarDatos()
    }, [])

    const addContiner = async (e: React.FormEvent) => {
        e.preventDefault()
        const cantidadNueva = Number(form.cantidad)

        if (cantidadNueva > disponible) {
            Swal.fire({
            title: "Capacidad excedida",
            text: `Solo quedan ${disponible.toFixed(2)} kg disponibles`,
            icon: "warning"
            })
            return
        }

        try {
            setLoading(true)

await api.post("/entrega", {
    cantidad: Number(form.cantidad),
    codigo_ciudadano: form.codigo_ciudadano,
    id_contenedor: Number(form.id_contenedor),
    fecha_hora: new Date().toISOString().slice(0,19).replace("T"," ")
})
            await Swal.fire({
            title: "Entrega creada",
            icon: "success"
            })
            
            limpiarFormulario()
            navigate("/ope/control")

        } catch (error) {
            Swal.fire({
            title: "Error",
            text: "No se pudo agregar contenido",
            icon: "error"
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
                        <label>Codigo Ciudadano</label>
                        <input 
                        type="text" 
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
                                Contenedor de {c.material.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* INFO DEL CONTENEDOR */}
                    {contenedorSeleccionado && (
                        <>
                    <div className="control-capacidad-info">
                        <p>
                        <strong>Material:</strong> {contenedorSeleccionado.material.nombre}
                        </p>

                        <p>
                        Capacidad total <b>{capacidadContenedor} kg</b>
                        </p>

                        <p>
                        Usado <b>{usado.toFixed(2)} kg</b>
                        </p>

                        <p>
                        Disponible <b style={{ color: "#1abc9c" }}>{disponible.toFixed(2)} kg</b>
                        </p>
                    </div>

                    <div className="control-crear-group">
                        <label>Cantidad (kg)</label>
                        <input 
                        type="number" 
                        name="cantidad"
                        className="control-crear-input"
                        value={form.cantidad}
                        onChange={handleChange}
                        min={1}
                        max={disponible}
                        required/>
                    </div>
                    </>
                    )}

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