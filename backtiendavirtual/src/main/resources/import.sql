-- Inyeccion de roles
INSERT INTO roles (id, name) VALUES (1, 'ROLE_ADMIN');
INSERT INTO roles (id, name) VALUES (2, 'ROLE_BUSSINESS');
INSERT INTO roles (id, name) VALUES (3, 'ROLE_USER');

-- Inyeccion de usuarios
INSERT INTO users (id, username, password, email, enabled) VALUES (1, 'useruser', '$2a$10$cQFJ5txH69G7VyI5Xt53KOg5CrTKAygXcyux35Y3gL7P5is/ju84S', 'useruser@email.com', true);
INSERT INTO users (id, username, password, email, enabled) VALUES (2, 'bussinessbussiness', '$2a$10$Ihwc5i0chA7M.a3Om2kZ7u5nOa4qV74Dq8F9xJOozio23Aw6haIGC', 'bussinessbussiness@email.com', true);
INSERT INTO users (id, username, password, email, enabled) VALUES (3, 'adminadmin', '$2a$10$rIp2a6J.SFMJWgwCkrf2jOc32vqkGUI03uPt0tvqih2Y8UnpJilEy', 'adminadmin@email.com', true);

-- Inyeccion de roles a los usuarios
-- Role User:
INSERT INTO users_roles (user_id, role_id) VALUES (1, 3);
-- Role Bussiness:
INSERT INTO users_roles (user_id, role_id) VALUES (2, 3);
INSERT INTO users_roles (user_id, role_id) VALUES (2, 2);
-- Role Admin:
INSERT INTO users_roles (user_id, role_id) VALUES (3, 3);
INSERT INTO users_roles (user_id, role_id) VALUES (3, 2);
INSERT INTO users_roles (user_id, role_id) VALUES (3, 1);

-- Inyeccion de productos de prueba
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (1, 'Nintendo Switch', 'Consola de videojuegos híbrida', '', 999, 1000, 299.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (2, 'PlayStation 5', 'Consola de videojuegos de última generación', '', 391, 500, 499.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (3, 'Xbox Series X', 'Consola de videojuegos de alta gama', '', 14, 600, 499.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (4, 'Raspberry Pi 4', 'Mini computadora versátil', '', 840, 3000, 35.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (5, 'Arduino Uno', 'Placa de desarrollo electrónica', '', 780, 5000, 22.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (6, 'iPhone 14', 'Smartphone de alta gama', '', 92, 100, 999.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (7, 'Samsung Galaxy S23', 'Smartphone Android de última generación', '', 103, 150, 899.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (8, 'MacBook Pro', 'Portátil profesional de Apple', '', 12, 50, 1999.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (9, 'Dell XPS 13', 'Ultrabook de alta gama', '', 67, 70, 1299.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (10, 'Lenovo ThinkPad X1', 'Laptop empresarial de alta calidad', '', 9, 80, 1399.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (11, 'Apple Watch Series 8', 'Reloj inteligente de Apple', '', 9, 200, 399.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (12, 'Samsung Galaxy Watch 5', 'Reloj inteligente con Android', '', 110, 250, 299.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (13, 'Sony WH-1000XM5', 'Auriculares con cancelación de ruido', '', 138, 300, 349.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (14, 'Bose QuietComfort 45', 'Auriculares inalámbricos de calidad', '', 200, 200, 329.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (15, 'GoPro HERO11', 'Cámara de acción resistente', '', 217, 400, 399.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (16, 'DJI Mini 3 Pro', 'Drone con cámara 4K', '', 27, 100, 749.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (17, 'Kindle Paperwhite', 'Lector de libros electrónicos', '', 395, 500, 129.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (18, 'Amazon Echo Dot', 'Altavoz inteligente con Alexa', '', 705, 800, 49.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (19, 'Google Nest Hub', 'Pantalla inteligente con Google Assistant', '', 283, 300, 99.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (20, 'Logitech MX Master 3', 'Ratón inalámbrico avanzado', '', 4, 400, 99.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (21, 'Corsair K95 RGB', 'Teclado mecánico para gaming', '', 36, 150, 199.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (22, 'Razer DeathAdder V3', 'Ratón para gaming de alta precisión', '', 224, 250, 69.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (23, 'MSI Optix MAG271CQR', 'Monitor curvo para gaming', '', 56, 100, 349.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (24, 'Asus ROG Swift PG259QNR', 'Monitor de gaming de 360Hz', '', 47, 50, 699.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (25, 'HyperX Cloud Alpha', 'Auriculares para gaming', '', 168, 300, 99.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (26, 'Acer Predator Helios 300', 'Laptop para gaming', '', 19, 80, 1499.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (27, 'NVIDIA GeForce RTX 4090', 'Tarjeta gráfica de alto rendimiento', '', 7, 20, 1599.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (28, 'AMD Ryzen 9 7950X', 'Procesador de alta gama', '', 55, 100, 699.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (29, 'Intel Core i9-13900K', 'Procesador de última generación', '', 119, 120, 749.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (30, 'Samsung T7 Portable SSD', 'Disco SSD portátil', '', 245, 300, 119.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (31, 'WD Black SN850', 'SSD NVMe para gaming', '', 173, 250, 229.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (32, 'Seagate IronWolf Pro', 'Disco duro para NAS', '', 37, 200, 149.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (33, 'Philips Hue Starter Kit', 'Kit de iluminación inteligente', '', 91, 150, 199.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (34, 'Nanoleaf Shapes', 'Paneles de iluminación decorativa', '', 3, 50, 179.99, false, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (35, 'Theragun Elite', 'Pistola de masaje avanzada', '', 93, 100, 399.99, false, 2);

-- Inyeccion de ShoppingCarts de prueba
INSERT INTO shopping_cart (id, is_active, date, user_id) VALUES (1, false, '2024-12-19 16:30:45.000000', 1);
INSERT INTO shopping_cart (id, is_active, date, user_id) VALUES (2, false, '2024-12-20 16:30:45.000000', 1);
INSERT INTO shopping_cart (id, is_active, date, user_id) VALUES (3, false, '2024-12-21 16:30:45.000000', 1);
INSERT INTO shopping_cart (id, is_active, date, user_id) VALUES (4, true, '2024-12-22 16:30:45.000000', 1);

-- Inyeccion de ShoppingCartProductos (Productos que tiene el usuario en su ShoppingCart)
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (1, 12, 1, 4);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (2, 1, 3, 4);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (3, 1, 26, 4);