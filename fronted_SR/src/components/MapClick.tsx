import { useMapEvents } from "react-leaflet";

type Props = {
  onMapClick: (lat: number, lng: number) => void;
};

export default function MapClick({ onMapClick }: Props) {

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    }
  });

  return null;
}