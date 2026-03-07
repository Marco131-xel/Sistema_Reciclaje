import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import type { Ruta } from "../../types/Ruta";
import MapView from "../../../components/MapView";

const Show: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ruta, setRuta] = useState<Ruta | null>(null);

    useEffect(() => {
        cargarRuta()
    }, [id]);

    const cargarRuta = async () => {
        try {
            const res = await api.get(`rutas/${id}`);
            setRuta(res.data);
        } catch (error) {
            console.log("Error cargando ruta", error);

            Swal.fire ({
                title: "Error",
                text: "No se pudo cargar la ruta",
                icon: "error"
            });

            navigate("coord/rutas")
        }
    }

    if (!ruta) return <p>Cargando...</p>;

    const inicioCoords = ruta.inicio_lat && ruta.inicio_lon
        ? [Number(ruta.inicio_lat), Number(ruta.inicio_lon)] as [number, number]
        : undefined

    const finCoords = ruta.fin_lat && ruta.fin_lon
        ? [Number(ruta.fin_lat), Number(ruta.fin_lon)] as [number, number]
        : undefined

    return (
        <div className="show-content">
            <div className="show-card">

                <div className="show-header">
                    <h2>Detalle de la Ruta</h2>
                    <span className="show-id">ID: {ruta.id_ruta}</span>
                </div>

                <div className="show-body">
                    {/* Contenedor de dos columnas */}
                    <div className="show-two-column-layout">
                        
                        {/* Columna izquierda - Datos */}
                        <div className="show-data-column">
                            <div className="show-row">
                                <span className="show-label">Nombre</span>
                                <span className="show-value">{ruta.nombre}</span>
                            </div>
                            <div className="show-map-info">
                                <div className="show-map-info-item">
                                    <span className="show-map-info-label">Inicio Latitud</span>
                                    <span className="show-map-info-value">{ruta.inicio_lat}</span>
                                </div>
                                <div className="show-map-info-item">
                                    <span className="show-map-info-label">Inicio Longitud</span>
                                    <span className="show-map-info-value">{ruta.inicio_lon}</span>
                                </div>
                                <div className="show-map-info-item">
                                    <span className="show-map-info-label">Fin Latitud</span>
                                    <span className="show-map-info-value">{ruta.fin_lat}</span>
                                </div>
                                <div className="show-map-info-item">
                                    <span className="show-map-info-label">Fin Longitud</span>
                                    <span className="show-map-info-value">{ruta.fin_lon}</span>
                                </div>
                            </div>
                            <div className="show-row">
                                <span className="show-label">Dias de Recoleccion</span>
                                <span className="show-value">{ruta.dias_recoleccion}</span>
                            </div>
                            <div className="show-row">
                                <span className="show-label">Horario</span>
                                <span className="show-value">{ruta.horario}</span>
                            </div>
                            <div className="show-row">
                                <span className="show-label">Tipo Residuo</span>
                                <span className="show-value">{ruta.tipo_residuo}</span>
                            </div>
                            <div className="show-row">
                                <span className="show-label">Distancia (km)</span>
                                <span className="show-value">{ruta.distancia_km}</span>
                            </div>
                            <div className="show-row">
                                <span className="show-label">Zona</span>
                                <span className="show-value">{ruta.zona ? ruta.zona.nombre : "Sin zona"}</span>
                            </div>
                        </div>

                        {/* Columna derecha - Mapa */}
                        <div className="show-map-column">
                            <div className="show-map-container">
                                <div className="show-map-wrapper">
                                    <MapView inicio={inicioCoords} fin={finCoords} onMapClick={() => {}} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="show-foot">
                    <button className="show-boton" onClick={() => navigate("/coord/rutas")}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default Show;