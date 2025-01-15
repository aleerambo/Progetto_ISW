import mysql, { Connection } from 'mysql2'

export const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'StudentHome'
})

// Tentativo di connessione
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Ricorda di chiudere la connessione quando non serve più
//connection.end(); //non l'ho chiusa perchè poi non accedevo più al db, pensare dove chiudere
