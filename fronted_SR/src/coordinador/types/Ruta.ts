export interface Zona {
  id_zona: number;
  nombre: string;
}

export interface Ruta {
  id_ruta: number;
  nombre: string;
  inicio_lat: string;
  inicio_lon: string;
  fin_lat: string;
  fin_lon: string;
  dias_recoleccion: string;
  horario: string;
  tipo_residuo: string;
  distancia_km: number;
  zona: Zona;
}

export interface Coordenada {
  id_coord: number;
  latitud: string;
  longitud: string;
  orden: number;
  ruta: Ruta;
}

export interface Camion {
  id_camion: number;
  placa: string;
  capacidad_ton: number;
  estado: string;
  conductor: string;
}

export interface Asig_Camion {
  id_asignacion: number;
  fecha: string;
  camion: Camion;
  ruta: Ruta;
}