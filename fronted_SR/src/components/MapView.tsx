import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import Markers from "./Markers";
import MarkersPuntos from "./MarkersPuntos";
import MarkersVerde from "./MarkersVerde";
import MapClick from "./MapClick";
import MapCenter from "./MapCenter";

import type { Punto_Recoleccion } from "../coordinador/types/Basura";
import type { Verde } from "../operador/types/PuntoVerde";

type Props = {
  inicio?: [number, number];
  fin?: [number, number];

  puntos?: Punto_Recoleccion[];
  iconPuntos?: Icon;

  verdes?: Verde[];
  iconVerde?: Icon;

  onVerMas?: (verde: Verde) => void

  onMapClick: (lat: number, lng: number) => void;
}

function MapView({ 
  inicio, 
  fin, 
  puntos = [], 
  iconPuntos, 
  verdes = [], 
  iconVerde,
  onVerMas, 
  onMapClick }: Props) {

  const center =
    inicio ??
    (puntos.length > 0
      ? [puntos[0].latitud, puntos[0].longitud]
      : [14.84444, -91.50139]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCenter position={inicio} />

      {/* MARCADORES DE RUTA */}
      <Markers inicio={inicio} fin={fin} />

      {/* MARCADORES DE PUNTOS */}
      {puntos.length > 0 && iconPuntos && (
        <MarkersPuntos puntos={puntos} icon={iconPuntos} />
      )}

      {/* MARCADORES PARA PUNTOS VERDES */}
      {verdes.length > 0 && iconVerde && (
        <MarkersVerde verdes={verdes} icon={iconVerde} onVerMas={onVerMas} />
      )}
      <MapClick onMapClick={onMapClick} />

    </MapContainer>
  );
}

export default MapView;