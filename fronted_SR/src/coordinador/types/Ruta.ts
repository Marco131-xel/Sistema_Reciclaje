export interface Zona {
  id_zona: number;
  nombre: string;
}

export interface Ruta {
  id_ruta: number;
  nombre: string;
  dias_recoleccion: string;
  horario: string;
  tipo_residuo: string;
  distancia_km: number;
  zona: Zona;
}