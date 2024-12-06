-- Inyeccion de roles
INSERT INTO roles (id, name) VALUES (1, 'ROLE_ADMIN');
INSERT INTO roles (id, name) VALUES (2, 'ROLE_BUSSINESS');
INSERT INTO roles (id, name) VALUES (3, 'ROLE_USER');

-- Inyeccion de usuarios
INSERT INTO users (id, username, password, email, enabled) VALUES (1, 'testtest', '$2a$10$YZijYb1I/6B3PfkcMCVKwe13Br8UsoCSbJyH1dPiagA9M8bO57zQq', 'testtest@email.com', true);

-- Inyeccion de roles a los usuarios
INSERT INTO users_roles (user_id, role_id) VALUES (1, 3);