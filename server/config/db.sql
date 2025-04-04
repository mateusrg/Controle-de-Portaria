CREATE DATABASE controle_portaria;
USE controle_portaria;

CREATE TABLE Apartamentos (
    id_apartamento INT AUTO_INCREMENT PRIMARY KEY,
    bloco VARCHAR(1) NOT NULL,
    numeracao VARCHAR(3) NOT NULL 
);

CREATE TABLE Boxes (
    id_box INT AUTO_INCREMENT PRIMARY KEY,
    id_apartamento INT NOT NULL,
    FOREIGN KEY (id_apartamento) REFERENCES Apartamentos(id_apartamento)
);

CREATE TABLE Moradores (
    id_morador INT AUTO_INCREMENT PRIMARY KEY,
    id_apartamento INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status ENUM('Residente', 'Proprietário', 'Visitante') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_apartamento) REFERENCES Apartamentos(id_apartamento) ON DELETE CASCADE
);

CREATE TABLE Veiculos (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_morador INT NOT NULL,
    id_box INT UNIQUE,
    placa VARCHAR(7) NOT NULL UNIQUE,
    modelo VARCHAR(255) NOT NULL,
    cor VARCHAR(7) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_morador) REFERENCES Moradores(id_morador) ON DELETE CASCADE,
    FOREIGN KEY (id_box) REFERENCES Boxes(id_box) ON DELETE CASCADE
);

INSERT INTO Apartamentos (bloco, numeracao) VALUES

-- Bloco A (12 apartamentos, 3 por andar, 4 andares)
('A', '101'), ('A', '102'), ('A', '103'),
('A', '201'), ('A', '202'), ('A', '203'),
('A', '301'), ('A', '302'), ('A', '303'),
('A', '401'), ('A', '402'), ('A', '403'),

-- Bloco B (10 apartamentos, 2 por andar, 5 andares)
('B', '101'), ('B', '102'),
('B', '201'), ('B', '202'),
('B', '301'), ('B', '302'),
('B', '401'), ('B', '402'),
('B', '501'), ('B', '502'),

-- Bloco C (10 apartamentos, 2 por andar, 5 andares)
('C', '101'), ('C', '102'),
('C', '201'), ('C', '202'),
('C', '301'), ('C', '302'),
('C', '401'), ('C', '402'),
('C', '501'), ('C', '502'),

-- Bloco D (10 apartamentos, 2 por andar, 5 andares)
('D', '101'), ('D', '102'),
('D', '201'), ('D', '202'),
('D', '301'), ('D', '302'),
('D', '401'), ('D', '402'),
('D', '501'), ('D', '502'),

-- Bloco E (10 apartamentos, 2 por andar, 5 andares)
('E', '101'), ('E', '102'),
('E', '201'), ('E', '202'),
('E', '301'), ('E', '302'),
('E', '401'), ('E', '402'),
('E', '501'), ('E', '502'),

-- Bloco F (12 apartamentos, 3 por andar, 4 andares)
('F', '101'), ('F', '102'), ('F', '103'),
('F', '201'), ('F', '202'), ('F', '203'),
('F', '301'), ('F', '302'), ('F', '303'),
('F', '401'), ('F', '402'), ('F', '403');

INSERT INTO Boxes (id_apartamento) VALUES 
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
(11), (12), (13), (14), (15), (16), (17), (18), (19), (20),
(21), (22), (23), (24), (25), (26), (27), (28), (29), (30),
(31), (32), (33), (34), (35), (36), (37), (38), (39), (40),
(41), (42), (43), (44), (45), (46), (47), (48), (49), (50),
(51), (52), (53), (54), (55), (56), (57), (58), (59), (60),
(61), (62), (63), (64);