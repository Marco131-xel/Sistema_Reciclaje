import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
//import Swal from "sweetalert2";
import MapView from "../../components/MapView";
import { IconRecycle } from "../../components/IconRecycle";
import type { Verde } from "../types/PuntoVerde";
import "../style/registro.css"

function Registro( ){
    const [verde, setVerde] = useState<Verde[]>([]);
    const navigate = useNavigate();
    const [verdeSeleccionado, setVerdeSeleccionado] = useState<Verde | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const obtenerDatos = async (url:any, setState:any, mensajeError:any) => {
        try {
            const res = await api.get(url);
            setState(res.data);
        } catch (error) {
            console.error("Error cargando ",mensajeError, error);
        }
    }

    useEffect(() => {
        obtenerDatos("/punto-verde", setVerde, "Punto verdes ");
    }, []);

    const abrirModal = (verde: Verde) => {
        setVerdeSeleccionado(verde);
        setMostrarModal(true);
    }

    const cerrarModal = () => {
        setMostrarModal(false);
    }

    return (
        <div className="operador-container">
            <div className="operador-header">
                <h2>Puntos Verdes</h2>
                <button className="operador-btn-crear"
                onClick={() => navigate("crear")}>
                    crear
                </button>
            </div>

            <div className="operador-tabla-container">
                <div className="map-cuadro">
                    <div className="map-overlay-grid">
                        <MapView 
                        verdes={verde}
                        iconVerde={IconRecycle}
                        onMapClick={() => {}}
                        onVerMas={abrirModal}
                        />
                    </div>
                </div>
            </div>

            {mostrarModal && verdeSeleccionado && (
                <>
                <div className="modal-overlay">
                    <div className="modal-box">

                        <div className="modal-title">
                            Información del Punto Verde
                        </div>
                        <div className="modal-group">
                            <label className="modal-label">Nombre</label>
                            <div className="modal-value">{verdeSeleccionado.nombre}</div>
                        </div>
                        <div className="modal-group">
                            <label className="modal-label">Latitud y Longitud</label>
                            <div className="modal-value">{verdeSeleccionado.latitud - verdeSeleccionado.longitud}</div>
                        </div>
                        <div className="modal-group">
                            <label className="modal-label">Dirección</label>
                            <div className="modal-value">{verdeSeleccionado.direccion}</div>
                        </div>
                        <div className="modal-group">
                            <label className="modal-label">Capacidad</label>
                            <div className="modal-value">{verdeSeleccionado.capacidad}</div>
                        </div>
                        <div className="modal-group">
                            <label className="modal-label">Encargado</label>
                            <div className="modal-value">{verdeSeleccionado.encargado}</div>
                        </div>
                        <div className="modal-group">
                            <label className="modal-label">Horario</label>
                            <div className="modal-value">{verdeSeleccionado.horario}</div>
                        </div>

                        <div className="modal-actions">
                            <button className="modal-btn" onClick={cerrarModal}>Cerrar</button>
                        </div>

                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default Registro

