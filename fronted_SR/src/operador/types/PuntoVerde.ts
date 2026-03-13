export interface Verde {
    id_punto_verde: number;
    nombre: string;
    direccion: string;
    latitud: number;
    longitud: number;
    capacidad: number;
    horario: string;
    encargado: string;
    contenedores: Contenedor[]
}

export interface Material {
    id_material: number;
    nombre: string;
}

export interface Contenedor {
    id_contenedor: number;
    capacidad: number;
    porcentaje: number;
    id_punto_verde: number;
    material: Material;
}