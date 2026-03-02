export interface Rol {
    id_rol: number;
    nombre: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Rol[];
}