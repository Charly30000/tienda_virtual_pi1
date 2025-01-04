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
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (3, 'Xbox Series X', 'Consola de videojuegos de alta gama', '', 14, 600, 499.99, true, 2);
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (4, 'Raspberry Pi 4', 'Mini computadora versátil', '', 3000, 3000, 35.99, false, 2);
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
-- Productos useruser
-- Shopping Cart ID: 1
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (1, 10, 23, 1);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (2, 3, 1, 1);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (3, 8, 12, 1);
-- Shopping Cart ID: 2
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (4, 7, 9, 2);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (5, 10, 13, 2);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (6, 15, 2, 2);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (7, 2, 7, 2);
-- Shopping Cart ID: 3
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (8, 2, 9, 3);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (9, 1, 24, 3);
-- Shopping Cart ID: 4
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (10, 12, 1, 4);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (11, 1, 3, 4);
INSERT INTO shopping_cart_products (id, quantity, product_id, shopping_cart_id) VALUES (12, 1, 26, 4);

-- Inyeccion de Labels
INSERT INTO labels (id, name) VALUES (1, 'Gaming');
INSERT INTO labels (id, name) VALUES (2, 'Portátil');
INSERT INTO labels (id, name) VALUES (3, 'Alta Gama');
INSERT INTO labels (id, name) VALUES (4, 'Innovador');
INSERT INTO labels (id, name) VALUES (5, 'Inteligente');
INSERT INTO labels (id, name) VALUES (6, 'Eficiente');
INSERT INTO labels (id, name) VALUES (7, 'Elegante');
INSERT INTO labels (id, name) VALUES (8, 'Compacto');
INSERT INTO labels (id, name) VALUES (9, 'Profesional');
INSERT INTO labels (id, name) VALUES (10, 'Potente');
INSERT INTO labels (id, name) VALUES (11, 'Confiable');
INSERT INTO labels (id, name) VALUES (12, 'Duradero');
INSERT INTO labels (id, name) VALUES (13, 'Económico');
INSERT INTO labels (id, name) VALUES (14, 'Inalámbrico');
INSERT INTO labels (id, name) VALUES (15, 'Fácil de Usar');
INSERT INTO labels (id, name) VALUES (16, 'Tecnología Avanzada');
INSERT INTO labels (id, name) VALUES (17, 'Alto Rendimiento');
INSERT INTO labels (id, name) VALUES (18, 'Eficiencia Energética');
INSERT INTO labels (id, name) VALUES (19, 'Entretenimiento');
INSERT INTO labels (id, name) VALUES (20, 'Diseño Innovador');
INSERT INTO labels (id, name) VALUES (21, 'Herramientas Creativas');
INSERT INTO labels (id, name) VALUES (22, 'Salud y Fitness');
INSERT INTO labels (id, name) VALUES (23, 'Lujo');
INSERT INTO labels (id, name) VALUES (24, 'Calidad de Audio');
INSERT INTO labels (id, name) VALUES (25, 'Accesorios Gaming');
INSERT INTO labels (id, name) VALUES (26, 'Fotografía');
INSERT INTO labels (id, name) VALUES (27, 'Almacenamiento Compacto');
INSERT INTO labels (id, name) VALUES (28, 'Experiencia Fluida');
INSERT INTO labels (id, name) VALUES (29, 'Streaming');
INSERT INTO labels (id, name) VALUES (30, 'Creación de Contenido');
INSERT INTO labels (id, name) VALUES (31, 'Productividad Móvil');
INSERT INTO labels (id, name) VALUES (32, 'Personalizable');
INSERT INTO labels (id, name) VALUES (33, 'Inmersivo');
INSERT INTO labels (id, name) VALUES (34, 'Multitarea');
INSERT INTO labels (id, name) VALUES (35, 'Calidad de Estudio');
INSERT INTO labels (id, name) VALUES (36, 'Ecológico');
INSERT INTO labels (id, name) VALUES (37, 'Seguro');
INSERT INTO labels (id, name) VALUES (38, 'Iluminación Inteligente');
INSERT INTO labels (id, name) VALUES (39, 'Diseño Robusto');
INSERT INTO labels (id, name) VALUES (40, 'Herramientas Profesionales');

-- Inyeccion de Categories
INSERT INTO categories (id, name) VALUES (1, 'Consolas');
INSERT INTO categories (id, name) VALUES (2, 'Portátiles');
INSERT INTO categories (id, name) VALUES (3, 'Smartphones');
INSERT INTO categories (id, name) VALUES (4, 'Wearables');
INSERT INTO categories (id, name) VALUES (5, 'Accesorios');
INSERT INTO categories (id, name) VALUES (6, 'Drones');
INSERT INTO categories (id, name) VALUES (7, 'Cámaras');
INSERT INTO categories (id, name) VALUES (8, 'Equipo de Audio');
INSERT INTO categories (id, name) VALUES (9, 'Almacenamiento');
INSERT INTO categories (id, name) VALUES (10, 'Periféricos Gaming');
INSERT INTO categories (id, name) VALUES (11, 'Domótica');
INSERT INTO categories (id, name) VALUES (12, 'Monitores');
INSERT INTO categories (id, name) VALUES (13, 'Teclados');
INSERT INTO categories (id, name) VALUES (14, 'Ratones');
INSERT INTO categories (id, name) VALUES (15, 'Procesadores');
INSERT INTO categories (id, name) VALUES (16, 'Tarjetas Gráficas');
INSERT INTO categories (id, name) VALUES (17, 'NAS');
INSERT INTO categories (id, name) VALUES (18, 'Redes');
INSERT INTO categories (id, name) VALUES (19, 'Salud y Bienestar');
INSERT INTO categories (id, name) VALUES (20, 'Componentes');
INSERT INTO categories (id, name) VALUES (21, 'Dispositivos de Entretenimiento');
INSERT INTO categories (id, name) VALUES (22, 'Computadoras Portátiles');
INSERT INTO categories (id, name) VALUES (23, 'Equipo de Fotografía');
INSERT INTO categories (id, name) VALUES (24, 'Dispositivos Inteligentes');
INSERT INTO categories (id, name) VALUES (25, 'Herramientas Creativas');
INSERT INTO categories (id, name) VALUES (26, 'Electrónica de Lujo');
INSERT INTO categories (id, name) VALUES (27, 'Productos Ecológicos');
INSERT INTO categories (id, name) VALUES (28, 'Iluminación Inteligente');
INSERT INTO categories (id, name) VALUES (29, 'Equipo Profesional');
INSERT INTO categories (id, name) VALUES (30, 'Equipo de Estudio');
INSERT INTO categories (id, name) VALUES (31, 'Almacenamiento Portátil');
INSERT INTO categories (id, name) VALUES (32, 'Computación en la Nube');
INSERT INTO categories (id, name) VALUES (33, 'Dispositivos de Streaming');
INSERT INTO categories (id, name) VALUES (34, 'Portátiles Gaming');
INSERT INTO categories (id, name) VALUES (35, 'Dispositivos Compactos');
INSERT INTO categories (id, name) VALUES (36, 'Dispositivos Seguros');
INSERT INTO categories (id, name) VALUES (37, 'Dispositivos Elegantes');
INSERT INTO categories (id, name) VALUES (38, 'Consolas Avanzadas');
INSERT INTO categories (id, name) VALUES (39, 'Accesorios de Escritorio');
INSERT INTO categories (id, name) VALUES (40, 'Accesorios Móviles');

-- Inyeccion de product_labels (Relaciones entre Productos y Labels)
INSERT INTO product_labels (product_id, label_id) VALUES (1, 1); -- Nintendo Switch -> Gaming
INSERT INTO product_labels (product_id, label_id) VALUES (1, 2); -- Nintendo Switch -> Portátil

INSERT INTO product_labels (product_id, label_id) VALUES (2, 1); -- PlayStation 5 -> Gaming
INSERT INTO product_labels (product_id, label_id) VALUES (2, 3); -- PlayStation 5 -> Alta Gama

INSERT INTO product_labels (product_id, label_id) VALUES (3, 10); -- Xbox Series X -> Potente
INSERT INTO product_labels (product_id, label_id) VALUES (3, 1); -- Xbox Series X -> Gaming

INSERT INTO product_labels (product_id, label_id) VALUES (4, 4); -- Raspberry Pi 4 -> Innovador
INSERT INTO product_labels (product_id, label_id) VALUES (4, 8); -- Raspberry Pi 4 -> Compacto

INSERT INTO product_labels (product_id, label_id) VALUES (5, 6); -- Arduino Uno -> Eficiente
INSERT INTO product_labels (product_id, label_id) VALUES (5, 12); -- Arduino Uno -> Duradero

INSERT INTO product_labels (product_id, label_id) VALUES (6, 3); -- iPhone 14 -> Alta Gama
INSERT INTO product_labels (product_id, label_id) VALUES (6, 5); -- iPhone 14 -> Inteligente

INSERT INTO product_labels (product_id, label_id) VALUES (7, 5); -- Samsung Galaxy S23 -> Inteligente
INSERT INTO product_labels (product_id, label_id) VALUES (7, 2); -- Samsung Galaxy S23 -> Portátil

INSERT INTO product_labels (product_id, label_id) VALUES (8, 9); -- MacBook Pro -> Profesional
INSERT INTO product_labels (product_id, label_id) VALUES (8, 3); -- MacBook Pro -> Alta Gama

INSERT INTO product_labels (product_id, label_id) VALUES (9, 9); -- Dell XPS 13 -> Profesional
INSERT INTO product_labels (product_id, label_id) VALUES (9, 7); -- Dell XPS 13 -> Elegante

INSERT INTO product_labels (product_id, label_id) VALUES (10, 9); -- Lenovo ThinkPad X1 -> Profesional
INSERT INTO product_labels (product_id, label_id) VALUES (10, 7); -- Lenovo ThinkPad X1 -> Elegante

INSERT INTO product_labels (product_id, label_id) VALUES (11, 5); -- Apple Watch Series 8 -> Inteligente
INSERT INTO product_labels (product_id, label_id) VALUES (11, 14); -- Apple Watch Series 8 -> Inalámbrico

INSERT INTO product_labels (product_id, label_id) VALUES (12, 5); -- Samsung Galaxy Watch 5 -> Inteligente
INSERT INTO product_labels (product_id, label_id) VALUES (12, 22); -- Samsung Galaxy Watch 5 -> Salud y Fitness

INSERT INTO product_labels (product_id, label_id) VALUES (13, 24); -- Sony WH-1000XM5 -> Calidad de Audio
INSERT INTO product_labels (product_id, label_id) VALUES (13, 14); -- Sony WH-1000XM5 -> Inalámbrico

INSERT INTO product_labels (product_id, label_id) VALUES (14, 24); -- Bose QuietComfort 45 -> Calidad de Audio
INSERT INTO product_labels (product_id, label_id) VALUES (14, 12); -- Bose QuietComfort 45 -> Duradero

INSERT INTO product_labels (product_id, label_id) VALUES (15, 19); -- GoPro HERO11 -> Entretenimiento
INSERT INTO product_labels (product_id, label_id) VALUES (15, 26); -- GoPro HERO11 -> Fotografía

INSERT INTO product_labels (product_id, label_id) VALUES (16, 26); -- DJI Mini 3 Pro -> Fotografía
INSERT INTO product_labels (product_id, label_id) VALUES (16, 6); -- DJI Mini 3 Pro -> Eficiente

INSERT INTO product_labels (product_id, label_id) VALUES (17, 33); -- Kindle Paperwhite -> Inmersivo
INSERT INTO product_labels (product_id, label_id) VALUES (17, 15); -- Kindle Paperwhite -> Fácil de Usar

INSERT INTO product_labels (product_id, label_id) VALUES (18, 5); -- Amazon Echo Dot -> Inteligente
INSERT INTO product_labels (product_id, label_id) VALUES (18, 19); -- Amazon Echo Dot -> Entretenimiento

INSERT INTO product_labels (product_id, label_id) VALUES (19, 5); -- Google Nest Hub -> Inteligente
INSERT INTO product_labels (product_id, label_id) VALUES (19, 38); -- Google Nest Hub -> Iluminación Inteligente

INSERT INTO product_labels (product_id, label_id) VALUES (20, 9); -- Logitech MX Master 3 -> Profesional
INSERT INTO product_labels (product_id, label_id) VALUES (20, 7); -- Logitech MX Master 3 -> Elegante

INSERT INTO product_labels (product_id, label_id) VALUES (21, 25); -- Corsair K95 RGB -> Accesorios Gaming
INSERT INTO product_labels (product_id, label_id) VALUES (21, 15); -- Corsair K95 RGB -> Fácil de Usar

INSERT INTO product_labels (product_id, label_id) VALUES (22, 14); -- Razer DeathAdder V3 -> Inalámbrico
INSERT INTO product_labels (product_id, label_id) VALUES (22, 28); -- Razer DeathAdder V3 -> Experiencia Fluida

INSERT INTO product_labels (product_id, label_id) VALUES (23, 33); -- MSI Optix MAG271CQR -> Inmersivo
INSERT INTO product_labels (product_id, label_id) VALUES (23, 17); -- MSI Optix MAG271CQR -> Alto Rendimiento

INSERT INTO product_labels (product_id, label_id) VALUES (24, 16); -- Asus ROG Swift PG259QNR -> Tecnología Avanzada
INSERT INTO product_labels (product_id, label_id) VALUES (24, 1); -- Asus ROG Swift PG259QNR -> Gaming

INSERT INTO product_labels (product_id, label_id) VALUES (25, 24); -- HyperX Cloud Alpha -> Calidad de Audio
INSERT INTO product_labels (product_id, label_id) VALUES (25, 33); -- HyperX Cloud Alpha -> Inmersivo

INSERT INTO product_labels (product_id, label_id) VALUES (26, 17); -- Acer Predator Helios 300 -> Alto Rendimiento
INSERT INTO product_labels (product_id, label_id) VALUES (26, 3); -- Acer Predator Helios 300 -> Alta Gama

INSERT INTO product_labels (product_id, label_id) VALUES (27, 17); -- NVIDIA GeForce RTX 4090 -> Alto Rendimiento
INSERT INTO product_labels (product_id, label_id) VALUES (27, 10); -- NVIDIA GeForce RTX 4090 -> Potente

INSERT INTO product_labels (product_id, label_id) VALUES (28, 17); -- AMD Ryzen 9 7950X -> Alto Rendimiento
INSERT INTO product_labels (product_id, label_id) VALUES (28, 12); -- AMD Ryzen 9 7950X -> Duradero

INSERT INTO product_labels (product_id, label_id) VALUES (29, 10); -- Intel Core i9-13900K -> Potente
INSERT INTO product_labels (product_id, label_id) VALUES (29, 17); -- Intel Core i9-13900K -> Alto Rendimiento

INSERT INTO product_labels (product_id, label_id) VALUES (30, 27); -- Samsung T7 Portable SSD -> Almacenamiento Compacto
INSERT INTO product_labels (product_id, label_id) VALUES (30, 12); -- Samsung T7 Portable SSD -> Duradero

INSERT INTO product_labels (product_id, label_id) VALUES (31, 17); -- WD Black SN850 -> Alto Rendimiento
INSERT INTO product_labels (product_id, label_id) VALUES (31, 27); -- WD Black SN850 -> Almacenamiento Compacto

INSERT INTO product_labels (product_id, label_id) VALUES (32, 11); -- Seagate IronWolf Pro -> Confiable
INSERT INTO product_labels (product_id, label_id) VALUES (32, 12); -- Seagate IronWolf Pro -> Duradero

INSERT INTO product_labels (product_id, label_id) VALUES (33, 38); -- Philips Hue Starter Kit -> Iluminación Inteligente
INSERT INTO product_labels (product_id, label_id) VALUES (33, 36); -- Philips Hue Starter Kit -> Ecológico

INSERT INTO product_labels (product_id, label_id) VALUES (34, 20); -- Nanoleaf Shapes -> Diseño Innovador
INSERT INTO product_labels (product_id, label_id) VALUES (34, 33); -- Nanoleaf Shapes -> Inmersivo

INSERT INTO product_labels (product_id, label_id) VALUES (35, 22); -- Theragun Elite -> Salud y Fitness
INSERT INTO product_labels (product_id, label_id) VALUES (35, 37); -- Theragun Elite -> Seguro


-- Inyeccion de product_labels (Relaciones entre Productos y Categories)
INSERT INTO product_categories (product_id, category_id) VALUES (1, 1); -- Nintendo Switch -> Consolas
INSERT INTO product_categories (product_id, category_id) VALUES (1, 24); -- Nintendo Switch -> Dispositivos Inteligentes

INSERT INTO product_categories (product_id, category_id) VALUES (2, 38); -- PlayStation 5 -> Consolas Avanzadas
INSERT INTO product_categories (product_id, category_id) VALUES (2, 21); -- PlayStation 5 -> Dispositivos de Entretenimiento

INSERT INTO product_categories (product_id, category_id) VALUES (3, 1); -- Xbox Series X -> Consolas
INSERT INTO product_categories (product_id, category_id) VALUES (3, 38); -- Xbox Series X -> Consolas Avanzadas

INSERT INTO product_categories (product_id, category_id) VALUES (4, 20); -- Raspberry Pi 4 -> Componentes
INSERT INTO product_categories (product_id, category_id) VALUES (4, 35); -- Raspberry Pi 4 -> Dispositivos Compactos

INSERT INTO product_categories (product_id, category_id) VALUES (5, 20); -- Arduino Uno -> Componentes
INSERT INTO product_categories (product_id, category_id) VALUES (5, 27); -- Arduino Uno -> Productos Ecológicos

INSERT INTO product_categories (product_id, category_id) VALUES (6, 3); -- iPhone 14 -> Smartphones
INSERT INTO product_categories (product_id, category_id) VALUES (6, 24); -- iPhone 14 -> Dispositivos Inteligentes

INSERT INTO product_categories (product_id, category_id) VALUES (7, 3); -- Samsung Galaxy S23 -> Smartphones
INSERT INTO product_categories (product_id, category_id) VALUES (7, 24); -- Samsung Galaxy S23 -> Dispositivos Inteligentes

INSERT INTO product_categories (product_id, category_id) VALUES (8, 2); -- MacBook Pro -> Portátiles
INSERT INTO product_categories (product_id, category_id) VALUES (8, 29); -- MacBook Pro -> Equipo Profesional

INSERT INTO product_categories (product_id, category_id) VALUES (9, 22); -- Dell XPS 13 -> Computadoras Portátiles
INSERT INTO product_categories (product_id, category_id) VALUES (9, 2); -- Dell XPS 13 -> Portátiles

INSERT INTO product_categories (product_id, category_id) VALUES (10, 34); -- Lenovo ThinkPad X1 -> Portátiles Gaming
INSERT INTO product_categories (product_id, category_id) VALUES (10, 2); -- Lenovo ThinkPad X1 -> Portátiles

INSERT INTO product_categories (product_id, category_id) VALUES (11, 4); -- Apple Watch Series 8 -> Wearables
INSERT INTO product_categories (product_id, category_id) VALUES (11, 19); -- Apple Watch Series 8 -> Salud y Bienestar

INSERT INTO product_categories (product_id, category_id) VALUES (12, 4); -- Samsung Galaxy Watch 5 -> Wearables
INSERT INTO product_categories (product_id, category_id) VALUES (12, 22); -- Samsung Galaxy Watch 5 -> Salud y Fitness

INSERT INTO product_categories (product_id, category_id) VALUES (13, 8); -- Sony WH-1000XM5 -> Equipo de Audio
INSERT INTO product_categories (product_id, category_id) VALUES (13, 29); -- Sony WH-1000XM5 -> Equipo Profesional

INSERT INTO product_categories (product_id, category_id) VALUES (14, 8); -- Bose QuietComfort 45 -> Equipo de Audio
INSERT INTO product_categories (product_id, category_id) VALUES (14, 30); -- Bose QuietComfort 45 -> Equipo de Estudio

INSERT INTO product_categories (product_id, category_id) VALUES (15, 7); -- GoPro HERO11 -> Cámaras
INSERT INTO product_categories (product_id, category_id) VALUES (15, 25); -- GoPro HERO11 -> Herramientas Creativas

INSERT INTO product_categories (product_id, category_id) VALUES (16, 6); -- DJI Mini 3 Pro -> Drones
INSERT INTO product_categories (product_id, category_id) VALUES (16, 26); -- DJI Mini 3 Pro -> Fotografía

INSERT INTO product_categories (product_id, category_id) VALUES (17, 23); -- Kindle Paperwhite -> Equipo de Fotografía
INSERT INTO product_categories (product_id, category_id) VALUES (17, 24); -- Kindle Paperwhite -> Dispositivos Inteligentes

INSERT INTO product_categories (product_id, category_id) VALUES (18, 21); -- Amazon Echo Dot -> Dispositivos de Entretenimiento
INSERT INTO product_categories (product_id, category_id) VALUES (18, 11); -- Amazon Echo Dot -> Domótica

INSERT INTO product_categories (product_id, category_id) VALUES (19, 11); -- Google Nest Hub -> Domótica
INSERT INTO product_categories (product_id, category_id) VALUES (19, 28); -- Google Nest Hub -> Iluminación Inteligente

INSERT INTO product_categories (product_id, category_id) VALUES (20, 14); -- Logitech MX Master 3 -> Ratones
INSERT INTO product_categories (product_id, category_id) VALUES (20, 5); -- Logitech MX Master 3 -> Accesorios

INSERT INTO product_categories (product_id, category_id) VALUES (21, 13); -- Corsair K95 RGB -> Teclados
INSERT INTO product_categories (product_id, category_id) VALUES (21, 10); -- Corsair K95 RGB -> Periféricos Gaming

INSERT INTO product_categories (product_id, category_id) VALUES (22, 14); -- Razer DeathAdder V3 -> Ratones
INSERT INTO product_categories (product_id, category_id) VALUES (22, 5); -- Razer DeathAdder V3 -> Accesorios

INSERT INTO product_categories (product_id, category_id) VALUES (23, 12); -- MSI Optix MAG271CQR -> Monitores
INSERT INTO product_categories (product_id, category_id) VALUES (23, 10); -- MSI Optix MAG271CQR -> Periféricos Gaming

INSERT INTO product_categories (product_id, category_id) VALUES (24, 12); -- Asus ROG Swift PG259QNR

INSERT INTO product_categories (product_id, category_id) VALUES (25, 8); -- HyperX Cloud Alpha -> Equipo de Audio
INSERT INTO product_categories (product_id, category_id) VALUES (25, 10); -- HyperX Cloud Alpha -> Periféricos Gaming

INSERT INTO product_categories (product_id, category_id) VALUES (26, 34); -- Acer Predator Helios 300 -> Portátiles Gaming
INSERT INTO product_categories (product_id, category_id) VALUES (26, 2); -- Acer Predator Helios 300 -> Portátiles

INSERT INTO product_categories (product_id, category_id) VALUES (27, 16); -- NVIDIA GeForce RTX 4090 -> Tarjetas Gráficas
INSERT INTO product_categories (product_id, category_id) VALUES (27, 20); -- NVIDIA GeForce RTX 4090 -> Componentes

INSERT INTO product_categories (product_id, category_id) VALUES (28, 15); -- AMD Ryzen 9 7950X -> Procesadores
INSERT INTO product_categories (product_id, category_id) VALUES (28, 20); -- AMD Ryzen 9 7950X -> Componentes

INSERT INTO product_categories (product_id, category_id) VALUES (29, 15); -- Intel Core i9-13900K -> Procesadores
INSERT INTO product_categories (product_id, category_id) VALUES (29, 20); -- Intel Core i9-13900K -> Componentes

INSERT INTO product_categories (product_id, category_id) VALUES (30, 9); -- Samsung T7 Portable SSD -> Almacenamiento
INSERT INTO product_categories (product_id, category_id) VALUES (30, 31); -- Samsung T7 Portable SSD -> Almacenamiento Portátil

INSERT INTO product_categories (product_id, category_id) VALUES (31, 9); -- WD Black SN850 -> Almacenamiento
INSERT INTO product_categories (product_id, category_id) VALUES (31, 20); -- WD Black SN850 -> Componentes

INSERT INTO product_categories (product_id, category_id) VALUES (32, 17); -- Seagate IronWolf Pro -> NAS
INSERT INTO product_categories (product_id, category_id) VALUES (32, 9); -- Seagate IronWolf Pro -> Almacenamiento

INSERT INTO product_categories (product_id, category_id) VALUES (33, 28); -- Philips Hue Starter Kit -> Iluminación Inteligente
INSERT INTO product_categories (product_id, category_id) VALUES (33, 11); -- Philips Hue Starter Kit -> Domótica

INSERT INTO product_categories (product_id, category_id) VALUES (34, 28); -- Nanoleaf Shapes -> Iluminación Inteligente
INSERT INTO product_categories (product_id, category_id) VALUES (34, 25); -- Nanoleaf Shapes -> Herramientas Creativas

INSERT INTO product_categories (product_id, category_id) VALUES (35, 19); -- Theragun Elite -> Salud y Bienestar
INSERT INTO product_categories (product_id, category_id) VALUES (35, 36); -- Theragun Elite -> Dispositivos Seguros
