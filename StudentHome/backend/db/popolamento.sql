-- Inserimento nella tabella Utente
INSERT INTO Utente (cognome, nome, mail, telefono, password, ruolo, data_registrazione, foto_profilo)
VALUES
('Rossi', 'Marco', 'marco.rossi@studenthome.com', '3331112222', 'hashed_password1', 'utente', '2023-12-01 10:00:00', NULL),
('Bianchi', 'Luca', 'luca.bianchi@studenthome.com', '3332223333', 'hashed_password2', 'utente', '2023-12-10 14:30:00', NULL),
('Verdi', 'Anna', 'anna.verdi@studenthome.com', '3333334444', 'hashed_password3', 'admin', '2023-11-20 08:15:00', NULL);

-- Inserimento nella tabella QuartiereZona
INSERT INTO QuartiereZona (nome_quartiere, descrizione)
VALUES
('Centro', 'Quartiere centrale con tutti i servizi a portata di mano.'),
('Oltresavio', 'Zona residenziale tranquilla con ottimi collegamenti.'),
('Valle Savio', 'Area immersa nel verde, ideale per chi cerca pace.');

-- Inserimento nella tabella Annuncio
INSERT INTO Annuncio (utente_id, id_quartiere, data, prezzo, descrizione, locali, mq, piano, indirizzo, stato, foto_annuncio)
VALUES
(1, 1, '2023-12-15 09:00:00', 500.00, 'Camera singola vicino al centro.', 1, 20, 2, 'Via Roma 10, Cesena', 'attivo', '["camera1.jpg", "camera2.jpg"]'),
(2, 2, '2023-12-12 11:30:00', 800.00, 'Appartamento bilocale arredato.', 2, 60, 1, 'Via Milano 25, Cesena', 'attivo', '["appartamento1.jpg", "appartamento2.jpg"]'),
(1, 3, '2023-12-05 15:00:00', 300.00, 'Posto letto in stanza doppia.', 1, 15, 3, 'Via Firenze 18, Cesena', 'non attivo', '["postoletto.jpg"]');

-- Inserimento nella tabella StanzaAppartamento
INSERT INTO StanzaAppartamento (annuncio_id, tipologia, numero_inquilini, contratto_min, contratto_max)
VALUES
(1, 'stanza', 1, 6, 12),
(2, 'appartamento', 2, 12, 24),
(3, 'posto letto', 2, 3, 6);

-- Inserimento nella tabella Servizio
INSERT INTO Servizio (nome_servizio)
VALUES
('Wi-Fi'),
('Riscaldamento'),
('Ascensore'),
('Aria Condizionata');

-- Inserimento nella tabella AnnuncioServizio
INSERT INTO AnnuncioServizio (annuncio_id, servizio_id)
VALUES
(1, 1), -- Wi-Fi per il primo annuncio
(1, 2), -- Riscaldamento per il primo annuncio
(2, 1), -- Wi-Fi per il secondo annuncio
(2, 3), -- Ascensore per il secondo annuncio
(3, 1), -- Wi-Fi per il terzo annuncio
(3, 4); -- Aria Condizionata per il terzo annuncio

-- Inserimento nella tabella News
INSERT INTO News (titolo, contenuto, data_pubblicazione, link)
VALUES
('Nuovi appartamenti disponibili!', 'Scopri le ultime offerte vicino al centro.', '2023-12-20 10:00:00', 'https://studenthome.com/news1'),
('Promozione Natale', 'Sconti fino al 20% su alcune stanze per studenti.', '2023-12-18 09:30:00', 'https://studenthome.com/news2');
