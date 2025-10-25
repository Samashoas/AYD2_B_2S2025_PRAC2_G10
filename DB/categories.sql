CREATE DATABASE IF NOT EXISTS categories_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE categories_db;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

-- Datos de ejemplo
INSERT INTO categories (name, description) VALUES
('Entradas', 'Platillos ligeros para iniciar la comida'),
('Platos Fuertes', 'Platos principales del menú'),
('Postres', 'Dulces y postres para finalizar'),
('Bebidas', 'Refrescos, jugos y bebidas especiales');