import { Marker, Popup, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import type { Verde } from "../operador/types/PuntoVerde";

type Props = {
    verdes: Verde[]
    icon: Icon
    onVerMas: (verde: Verde) => void
}

function MarkersVerde({ verdes, icon, onVerMas}: Props) {
    return (
        <>
        {verdes.map((v) => (
            <Marker
            key={v.id_punto_verde}
            position={[v.latitud, v.longitud]}
            icon={icon}
            >
                <Tooltip direction="top">
                    Punto #{v.id_punto_verde}
                </Tooltip>

                <Popup>
                    <b>Punto #{v.id_punto_verde}</b> <br />
                    Nombre: {v.nombre} <br />
                    Lat: {v.latitud} <br />
                    Lng: {v.longitud} <br />
                    Capacidad: {v.capacidad} <br /> <br />
                    <button onClick={() => onVerMas(v)} className="btn-otro1">
                        Ver Mas
                    </button>
                </Popup>
            </Marker>
        ))}
        </>
    )
}

export default MarkersVerde