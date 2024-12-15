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
INSERT INTO products (id, name, description, image, sold, quantity, price, is_blocked, user_owner_id) VALUES (1, 'PlayStation 5', 'Nueva consola de ultima generacion!', '', 300, 6000, 799.99, false, 2);