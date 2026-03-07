import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import type { Ruta } from "../../types/Ruta";


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

    return (
        <div className="content">
            <div className="card">

                <div className="header">
                    <h2>Detalle de la Ruta</h2>
                    <span className="id">ID: {ruta.id_ruta}</span>
                </div>

                <div className="body">
                    
                    <div className="row">
                        <span className="label">Nombre</span>
                        <span className="value">{ruta.nombre}</span>
                    </div>
                    <div className="row">
                        <span className="label">Inicio Latitud</span>
                        <span className="value">{ruta.inicio_lat}</span>
                    </div>
                    <div className="row">
                        <span className="label">Inicio Longitud</span>
                        <span className="value">{ruta.inicio_lon}</span>
                    </div>
                    <div className="row">
                        <span className="label">Fin Latitud</span>
                        <span className="value">{ruta.fin_lat}</span>
                    </div>
                    <div className="row">
                        <span className="label">Fin Longitud</span>
                        <span className="value">{ruta.fin_lon}</span>
                    </div>
                    <div className="row">
                        <span className="label">Dias de Recoleccion</span>
                        <span className="value">{ruta.dias_recoleccion}</span>
                    </div>
                    <div className="row">
                        <span className="label">Horario</span>
                        <span className="value">{ruta.horario}</span>
                    </div>
                    <div className="row">
                        <span className="label">Tipo Residuo</span>
                        <span className="value">{ruta.tipo_residuo}</span>
                    </div>
                    <div className="row">
                        <span className="label">Distacion (km)</span>
                        <span className="value">{ruta.distancia_km}</span>
                    </div>
                    <div className="row">
                        <span className="label">Zona</span>
                        <span className="value">{ruta.zona ? ruta.zona.nombre : "Sin zona"}</span>
                    </div>
                </div>
                <div className="foot">
                    <button className="boton" onClick={() => navigate("/coord/rutas")}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default Show;