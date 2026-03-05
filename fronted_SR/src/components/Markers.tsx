import { Marker } from "react-leaflet";
import iconLocation from "./IconLocation";

type Props = {
  inicio?: [number, number];
  fin?: [number, number];
}


function Markers({ inicio, fin }: Props) {
  return (
    <>
      {inicio && (
        <Marker position={inicio} icon={iconLocation} />
      )}

      {fin && (
        <Marker position={fin} icon={iconLocation} />
      )}

    </>
  )
}

export default Markers;