-- crear base de datos


CREATE DATABASE IF NOT EXISTS Sistema_SR
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE Sistema_SR;

-- usuario
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT 1
) ENGINE=InnoDB;

-- rol
CREATE TABLE rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- usuario-rol
CREATE TABLE usuario_rol (
    id_usuario BIGINT UNSIGNED NOT NULL,
    id_rol INT NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    CONSTRAINT fk_usuario_rol_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_usuario_rol_rol
        FOREIGN KEY (id_rol)
        REFERENCES rol(id_rol)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;


-- zona
CREATE TABLE zona (
    id_zona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    densidad_poblacional DECIMAL(10,2)
) ENGINE=InnoDB;

-- ruta
CREATE TABLE ruta (
    id_ruta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    inicio_lat DECIMAL(10,6),
    inicio_lon DECIMAL(10,6),
    fin_lat DECIMAL(10,6),
    fin_lon DECIMAL(10,6),
    distancia_km DECIMAL(10,2),
    dias_recoleccion VARCHAR(50),
    horario VARCHAR(50),
    tipo_residuo VARCHAR(50),
    id_zona INT,
    CONSTRAINT fk_ruta_zona
        FOREIGN KEY (id_zona)
        REFERENCES zona(id_zona)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ruta_coordenada
CREATE TABLE ruta_coordenada (
    id_coord INT AUTO_INCREMENT PRIMARY KEY,
    latitud DECIMAL(10,6),
    longitud DECIMAL(10,6),
    orden INT,
    id_ruta INT NOT NULL,
    CONSTRAINT fk_ruta_coord_ruta
        FOREIGN KEY (id_ruta)
        REFERENCES ruta(id_ruta)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- camion
CREATE TABLE camion (
    id_camion INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    capacidad_ton DECIMAL(10,2),
    estado VARCHAR(30),
    conductor VARCHAR(100)
) ENGINE=InnoDB;

-- asignacion_camion
CREATE TABLE asignacion_camion (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    id_camion INT NOT NULL,
    id_ruta INT NOT NULL,
    CONSTRAINT fk_asig_camion_camion
        FOREIGN KEY (id_camion)
        REFERENCES camion(id_camion)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_asig_camion_ruta
        FOREIGN KEY (id_ruta)
        REFERENCES ruta(id_ruta)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;