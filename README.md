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

## Introduzione
Benvenuti nel sito di StudentHome. Questa applicazione web è un servizio gratuito per gli studenti, ideata appunto per mettere in relazione studenti che hanno esigenza di affittare un appartamento, camera o solo un posto letto a prezzi concorrenziali con tutti i confort che si possono avere. Il tutto senza nessuna agenzia di intermediazione. Grazie al nostro sito potrete controllare la distanza dall’alloggio di vostro interesse al Campus dell’università di Cesena. Troviamo altre pagine che completano il sito come News sempre aggiornate in cui si trovano anche promozioni, una guida dettagliata di come trovare il miglior alloggio per chi è alle prime esperienze ma anche per chi sentisse il bisogno di avere un consiglio da amici, una pagina Chi siamo, una pagina con i contatti dei gestori del sito per domande e per eventuali segnalazioni su annunci e una sezione per l’autenticazione.

## Feature per utenti
 - Esplora gli annunci più recenti o filtra per tipologia, zona e prezzo massimo.
 - Un utente può visualizzare gli annunci e i dettagli in cui trova anche un link a Google Maps del percorso, distanza e tempi di percorrenza in bici verso il Campus.
 - Si può effettuare una registrazione per accedere a funzioni speciali.
 - Effettuando il login nella sezione dedicata si potrà:
    - inserire un'inserzione
    - modificare la propria inserzione
    - eliminare la propria inserzione
    - mettere tra i preferiti le inserzioni
    - visualizzare i contatti dell'inserzionista
 
## Feature per amministratori
 - Effettuare il login nella sezione dedicata
 - Eliminare qualsiasi annuncio
 - Abilitare gli annunci non attivi

## Tecnologie utilizzate
 - XAMPP per avviare il server mysql
 - Node.js per backend
 - Express per backend e API
 - npm per installazione di packages e avviare il server
 - Vue.js per frontend
 - TypeScript
 - Vue Router
 - Vite
 - Axios
 - Bootstrap per css

## Packages installati
-	connect-history-api-fallback
-	mysql2: otimizzato e compatibile con Promises, ideale per eseguire query asincrone in applicazioni Node.js
-	cookie-parser, jsonwebtoken e bcrypt: utilizzati per la parte di autenticazione. Grazie a questi pacchetti è possibile realizzare una crittografia delle password, gestire i JWT e il parsing dei cookie. Sono stati installati anche i tipi per TypeScript.
-	multer: middleware per gestire l'upload di file in Node.js, particolarmente utile per elaborare form multipart/form-data.

## Struttura del progetto
Suddiviso in frontend e backend realizzati rispettivamente con Vue.js e Express.

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
 - /api/annunci/attiva/:id

### DELETE
 - /api/preferiti/:annuncio_id
 - /api/annunci/delete/:id

## DATABASE
Per la creazione dell'applicazione abbiamo creato un database MySQL denominato "studenthome".
Sono memorizzati tutti i dati in nove tabelle collegate tra loro con le ForeignKeys. La tabella che memorizza i dati dell'utente contiene le password crittografate per una elevata sicurezza. Il file che contiene le direttive per il collegamento al database denominato db.ts è collocato nella backend\scr\utils\ 

## Installazione
1.	Clona il repository di github da: https://github.com/aleerambo/Progetto_ISW
2.	Eseguire il comando “npm i” in entrambe le cartelle backend e frontend per installare tutte le dipendenze e pacchetti
3.	Aprire XAMPP e eseguire il server MySQL, creare il DB con il file contenuto nella cartella backend->db
4.	Eseguire l’applicazione web con il comando “npm run dev” da eseguire in entrambe le cartelle frontend e backend. Utilizzare il link di vite per visitare l’app.

## Documentazione
-	Materiale didattico universitario
-	Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
-	NPM: ricerca dei pacchetti installati nel Progetto https://www.npmjs.com/
