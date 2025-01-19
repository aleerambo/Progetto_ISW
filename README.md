# Progetto Ingegneria dei Sistemi Web 2024/2025

Indice dei contenuti
---


 - Introduzione
 - Features per utenti
 - Features per amministratori
 - Tecnologie utilizzate
 - Pacchetti installati
 - Struttura del progetto
 - Installazione
 - API Endpoints
 - Color Accessibility
 - Documentazione

## Tecnologie utilizzate
 - XAMPP
 - Node.js
 - Vue
 - Vue Router
 - Vite
 - Axios
 - TypeScript
 - Express
 - Bootstrap

## Struttura del progetto

## Installazione

## API Endpoints
### GET
 - /api/news
 - /api/news/:id
 - /api/auth/profile
 - /api/annunci
 - /api/lastannunci
 - /api/annunci/:id
 - /api/annuncinoattivi
 - /api/annunci/prezzo/:prezzomax
 - /api/annunci/tipo/:tipo/:prezzomax
 - /api/annunci/quartiere/:id/:prezzomax
 - /api/annunci/filter/:tipo/:quartiere/:prezzomax
 - /api/annunci/utente/:mail
 - /api/tipi-annuncio
 - /api/servizi
 - /api/quartieri
 - /api/preferiti

### POST
 - /api/auth/register
 - /api/auth/login
 - /api/auth/logout
 - /api/preferiti
 - /api/annunci/create
 - /api/annunci/update/:id
 - /api/annunci/modifica/:id

### DELETE
 - /api/preferiti/:annuncio_id
 - /api/annunci/delete/:id