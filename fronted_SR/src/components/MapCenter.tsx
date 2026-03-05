import { useMap } from "react-leaflet";
import { useEffect } from "react";

type Props = {
  position?: [number, number];
};

export default function MapCenter({ position }: Props) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
}