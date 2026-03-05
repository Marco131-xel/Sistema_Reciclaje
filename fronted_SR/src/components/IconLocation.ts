import * as L from "leaflet";
import punto from "../assets/punto.svg";

const IconLocation = L.icon({
  iconUrl: punto,
  iconRetinaUrl: punto,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  className: "leaflet-venue-icon",
});

export default IconLocation;