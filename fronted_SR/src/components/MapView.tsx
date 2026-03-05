import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./Markers";
import MapClick from "./MapClick";
import MapCenter from "./MapCenter";

type Props = {
  inicio?: [number, number];
  fin?: [number, number];
  onMapClick: (lat: number, lng: number) => void;
}

function MapView({ inicio, fin, onMapClick}: Props) {

  const center = inicio ?? [14.84444, -91.50139];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCenter position={inicio} />

      <Markers inicio={inicio} fin={fin} />

      <MapClick onMapClick={onMapClick} />

    </MapContainer>
  );
}

export default MapView;