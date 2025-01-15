import { createConnection } from 'mysql2/promise';  

export const connection = await createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'StudentHome'
})
// Verifica la connessione al database
try {
  await connection.ping(); // Pinge il database per verificare la connessione
  console.log("Connessione al database riuscita!");
} catch (error) {
  console.error("Errore di connessione al database:", error);
}

// Ricorda di chiudere la connessione quando non serve più
//connection.end(); //non l'ho chiusa perchè poi non accedevo più al db, pensare dove chiudere
