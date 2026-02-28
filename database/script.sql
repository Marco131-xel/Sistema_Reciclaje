-- crear base de datos


CREATE DATABASE IF NOT EXISTS Sistema_SR
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE Sistema_SR;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT 1
) ENGINE=InnoDB;