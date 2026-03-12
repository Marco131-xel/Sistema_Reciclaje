import { Marker, Popup, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import type { Punto_Recoleccion } from "../coordinador/types/Basura";

type Props = {
  puntos: Punto_Recoleccion[];
  icon: Icon;
}

function MarkersPuntos({ puntos, icon }: Props) {

  return (
    <>
      {puntos.map((p) => (
        <Marker
          key={p.id_punto}
          position={[p.latitud, p.longitud]}
          icon={icon}
        >

          <Tooltip direction="top">
            Punto #{p.id_punto}
          </Tooltip>

          <Popup>
            <b>Punto #{p.id_punto}</b> <br />
            Volumen: {p.volumen_estimado} kg <br />
            Lat: {p.latitud} <br />
            Lng: {p.longitud}
          </Popup>

        </Marker>
      ))}
    </>
  );
}

export default MarkersPuntos;