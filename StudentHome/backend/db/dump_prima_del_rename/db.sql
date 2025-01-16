-- Creazione del database
CREATE DATABASE StudentHome;

-- Utilizzo del database
USE StudentHome;

-- Tabella Utente
CREATE TABLE Utente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cognome VARCHAR(50),
    nome VARCHAR(50),
    mail VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    ruolo ENUM('admin', 'utente') DEFAULT 'utente',
    data_registrazione DATETIME,
    foto_profilo VARCHAR(255)
);

-- Tabella Annuncio
CREATE TABLE Annuncio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utente_id INT NOT NULL,
    id_quartiere INT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    prezzo DECIMAL(10, 2) NOT NULL,
    descrizione TEXT,
    locali INT,
    mq INT,
    piano INT,
    indirizzo VARCHAR(255),
    stato ENUM('attivo', 'non attivo') DEFAULT 'non attivo',
    foto_annuncio TEXT,
    FOREIGN KEY (utente_id) REFERENCES Utente(id) ON DELETE CASCADE
);

-- Tabella Stanza-Appartamento
CREATE TABLE StanzaAppartamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    annuncio_id INT NOT NULL,
    tipologia ENUM('stanza', 'appartamento') NOT NULL,
    numero_inquilini INT,
    contratto_min INT,
    contratto_max INT,
    FOREIGN KEY (annuncio_id) REFERENCES Annuncio(id) ON DELETE CASCADE
);

-- Tabella Servizi
CREATE TABLE Servizio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_servizio VARCHAR(50) UNIQUE NOT NULL
);

-- Tabella Ponte Annuncio-Servizi
CREATE TABLE AnnuncioServizio (
    annuncio_id INT NOT NULL,
    servizio_id INT NOT NULL,
    PRIMARY KEY (annuncio_id, servizio_id),
    FOREIGN KEY (annuncio_id) REFERENCES Annuncio(id) ON DELETE CASCADE,
    FOREIGN KEY (servizio_id) REFERENCES Servizio(id) ON DELETE CASCADE
);

-- Tabella Quartiere-Zona
CREATE TABLE QuartiereZona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_quartiere VARCHAR(100) UNIQUE NOT NULL,
    descrizione TEXT
);

-- Tabella News
CREATE TABLE News (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(255) NOT NULL,
    contenuto TEXT,
    data_pubblicazione DATETIME DEFAULT CURRENT_TIMESTAMP,
    link VARCHAR(255)
);
