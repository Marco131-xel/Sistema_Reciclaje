import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import MapView from "../../components/MapView";
import { IconRecycle } from "../../components/IconRecycle";
import type { Verde } from "../types/PuntoVerde";
import "../style/registro.css"

function Registro( ){
    const [verde, setVerde] = useState<Verde[]>([]);
    const navigate = useNavigate();

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
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registro

