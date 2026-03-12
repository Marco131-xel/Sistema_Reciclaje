import { Marker } from "react-leaflet";
import { Icon } from "leaflet";

type Props = {
  puntos: [number, number][];
  icon: Icon;
}

function MarkersPuntos({ puntos, icon }: Props) {

  return (
    <>
      {puntos.map((p, i) => (
        <Marker
          key={i}
          position={p}
          icon={icon}
        />
      ))}
    </>
  );
}

export default MarkersPuntos;