import type { Camion, Ruta } from "./Ruta";

export interface Generar_Basura {
    id_generacion: number;
    cantidad_puntos: number;
    volumen_estimado: number;
    total_estimado: number;
    dia_semana: string;
    historial: string;
    ruta: Ruta;    
}

export interface Punto_Recoleccion {
    id_punto: number;
    latitud: number;
    longitud: number;
    volumen_estimado: number;
    generacion: Generar_Basura;
}

export interface Recoleccion {
    id_recoleccion: number;
    hora_inicio: string;
    hora_fin: string;
    basura_recolectada: number;
    observaciones: string;
    estado: string;
    ruta: Ruta;
    camion: Camion;
}

export interface Incidencia {
    id_incidencia: number;
    descripcion: string;
    fecha: string;
    recoleccion: Recoleccion;
}