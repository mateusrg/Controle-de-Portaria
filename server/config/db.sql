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
    telefone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('Residente', 'Proprietário', 'Visitante') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_apartamento) REFERENCES Apartamentos(id_apartamento) ON DELETE CASCADE
);

CREATE TABLE Veiculos (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_morador INT NOT NULL,
    id_box INT NOT NULL,
    placa VARCHAR(7) NOT NULL UNIQUE,
    modelo VARCHAR(255) NOT NULL,
    cor VARCHAR(30) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_morador) REFERENCES Moradores(id_morador) ON DELETE CASCADE,
    FOREIGN KEY (id_box) REFERENCES Boxes(id_box) ON DELETE CASCADE
);