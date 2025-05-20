import { createConnection } from 'mysql2/promise';  

export const connection = await createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'StudentHome'
})
// Verifica la connessione al database
try {
  await connection.ping(); // Pinga il database per verificare la connessione
  console.log("Connessione al database riuscita!");
} catch (error) {
  console.error("Errore di connessione al database:", error);
}

