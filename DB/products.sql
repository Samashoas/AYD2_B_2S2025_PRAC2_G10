CREATE DATABASE IF NOT EXISTS products_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE products_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(6, 2) NOT NULL,
    category_id INT NOT NULL COMMENT 'Referencia externa al microservicio de categorías',
    active TINYINT(1) DEFAULT 1,
) ENGINE=InnoDB;

-- Datos de ejemplo
INSERT INTO products (name, description, price, category_id) VALUES
('Ensalada César', 'Lechuga romana, crutones, parmesano y aderezo César', 45.00, 1),
('Alitas BBQ', '10 alitas de pollo con salsa BBQ y aderezo ranch', 65.00, 1),
('Hamburguesa Clásica', 'Carne de res, queso cheddar, lechuga, tomate y cebolla', 85.00, 2),
('Pizza Margarita', 'Salsa de tomate, mozzarella y albahaca fresca', 120.00, 2),
('Tiramisú', 'Postre italiano con café, mascarpone y cacao', 55.00, 3),
('Cheesecake', 'Pastel de queso con base de galleta y coulis de frutos rojos', 60.00, 3);