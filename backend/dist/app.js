// src/app.ts
import express from "express";
import cors from "cors";
import path3 from "path";
import { fileURLToPath as fileURLToPath3 } from "url";
import { dirname as dirname2 } from "path";
import history from "connect-history-api-fallback";

// src/routes/news-router.ts
import { Router } from "express";

// src/utils/db.ts
import { createConnection } from "mysql2/promise";
var connection = await createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "studenthome"
});
try {
  await connection.ping();
  console.log("Connessione al database riuscita!");
} catch (error) {
  console.error("Errore di connessione al database:", error);
}

// src/controllers/news-controller.ts
async function allNews(req, res) {
  const [results] = await connection.execute(
    `SELECT * 
      FROM news
      ORDER BY data_pubblicazione DESC`
  );
  res.json(results);
}
async function newsFromID(req, res) {
  const [results] = await connection.execute(
    `SELECT * 
     FROM news 
     WHERE id=?`,
    [req.params.id]
  );
  res.json(results);
}

// src/routes/news-router.ts
var router = Router();
router.get("/api/news", allNews);
router.get("/api/news/:id", newsFromID);
var news_router_default = router;

// src/routes/annunci-router.ts
import multer from "multer";
import path2 from "path";
import { Router as Router2 } from "express";
import { fileURLToPath as fileURLToPath2 } from "url";
import { dirname } from "path";

// src/utils/auth.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = "StudentHome";
var COOKIE_NAME = "studenthome-access-token";
var setUser = (req, res, user) => {
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" });
  res.cookie(COOKIE_NAME, accessToken, {
    maxAge: 864e5,
    // 1 giorno in millisecondi
    httpOnly: true,
    sameSite: true
    // secure: true
  });
  return accessToken;
};
var getUser = (req, res) => {
  const accessToken = req.cookies[COOKIE_NAME];
  if (!accessToken) return null;
  try {
    const user = jwt.verify(accessToken, JWT_SECRET);
    return user;
  } catch {
    return null;
  }
};
var unsetUser = (req, res) => {
  res.clearCookie(COOKIE_NAME);
};

// src/utils/file.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var deleteFile = (filename) => {
  const filePath = path.join(__dirname, "../../uploads", filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Errore durante l'eliminazione del file: ${filePath}`, err);
    } else {
      console.log(`File eliminato: ${filePath}`);
    }
  });
};

// src/controllers/annunci-controller.ts
async function allAnnunci(req, res) {
  try {
    const [results] = await connection.execute(
      `SELECT
        a.id,
        u.cognome,
        u.nome,
        u.mail,
        u.telefono,
        u.ruolo,
        u.foto_profilo,
        a.data,
        a.prezzo,
        a.descrizione,
        a.locali,
        a.mq,
        a.piano,
        a.indirizzo,
        a.foto_annuncio,
        qz.descrizione AS quartiere_zona_descrizione,
        GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
        da.contratto_max,
        da.contratto_min,
        da.numero_inquilini,
        t.nome AS tipologia
        FROM
                studenthome.annuncio a
        JOIN
            studenthome.utente u ON a.utente_id = u.id
        JOIN
            studenthome.quartierezona qz ON a.id_quartiere = qz.id
        JOIN
            studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
        JOIN
            studenthome.servizio s ON asv.servizio_id = s.id
        JOIN
            studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
        JOIN
            studenthome.tipologia t ON da.tipologia_id = t.id
        WHERE
            a.stato = "attivo"
        GROUP BY
            a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
            a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
            a.foto_annuncio, qz.descrizione, da.contratto_max, da.contratto_min,
            da.numero_inquilini, t.nome
        ORDER BY
            a.data DESC;
        `
    );
    res.json(results);
  } catch (error) {
    console.error("Errore in allAnnunci:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
}
async function AnnuncioDettaglio(req, res) {
  const id = req.params.id;
  if (!id) {
    res.status(400).send("ID annuncio mancante.");
    return;
  }
  try {
    const [results] = await connection.execute(
      `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      qz.id AS id_quartiere,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.id ORDER BY s.id ASC) AS id_servizi,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.tipologia_id AS id_tipologia,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
          studenthome.annuncio a
    JOIN
          studenthome.utente u ON a.utente_id = u.id
    JOIN
          studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
          studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
          studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
          studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
          studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
          a.id = ?
    GROUP BY
          a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
          a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
          a.foto_annuncio, qz.id, qz.descrizione, da.tipologia_id, da.contratto_max,
          da.contratto_min, da.numero_inquilini, t.nome;

    `,
      [id]
    );
    res.json(results);
  } catch (error) {
    console.error("Errore durante la query:", error);
    res.status(500).send("Errore del server.");
  }
}
async function lastAnnunci(req, res) {
  const [results] = await connection.execute(
    `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
        studenthome.annuncio a
    JOIN
        studenthome.utente u ON a.utente_id = u.id
    JOIN
        studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
        studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
        studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
        studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
        studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
        a.stato = "attivo"
    GROUP BY
        a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
        a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
        a.foto_annuncio, qz.descrizione, da.contratto_max, da.contratto_min,
        da.numero_inquilini, t.nome
    ORDER BY
        a.data DESC
    LIMIT 2;
    `
  );
  res.json(results);
}
async function allAnnunciPrezzo(req, res) {
  const prezzomax = req.params.prezzomax;
  const [results] = await connection.execute(
    `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      a.thumbnails,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
          studenthome.annuncio a
    JOIN
          studenthome.utente u ON a.utente_id = u.id
    JOIN
          studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
          studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
          studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
          studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
          studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
          a.stato = "attivo"
          AND a.prezzo < ?
    GROUP BY
          a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
          a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
          a.foto_annuncio, a.thumbnails, qz.descrizione, da.contratto_max, da.contratto_min,
          da.numero_inquilini, t.nome
    ORDER BY
          a.prezzo;
  `,
    [
      prezzomax
    ]
  );
  res.json(results);
}
async function allAnnunciTipo(req, res) {
  const tipo = req.params.tipo;
  const prezzomax = req.params.prezzomax;
  const [results] = await connection.execute(
    `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      a.thumbnails,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
        studenthome.annuncio a
    JOIN
        studenthome.utente u ON a.utente_id = u.id
    JOIN
        studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
        studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
        studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
        studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
        studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
        a.stato = "attivo"
        AND t.nome = ?
        AND a.prezzo < ?
    GROUP BY
        a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
        a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
        a.foto_annuncio, a.thumbnails, qz.descrizione, da.contratto_max, da.contratto_min,
        da.numero_inquilini, t.nome
    ORDER BY
        a.data DESC;
    `,
    [
      tipo,
      prezzomax
    ]
  );
  res.json(results);
}
async function allAnnunciQuartiere(req, res) {
  const id = req.params.id;
  const prezzomax = req.params.prezzomax;
  const [results] = await connection.execute(
    `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      a.thumbnails,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
          studenthome.annuncio a
    JOIN
          studenthome.utente u ON a.utente_id = u.id
    JOIN
          studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
          studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
          studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
          studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
          studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
          a.stato = "attivo"
          AND qz.id = ?
          AND a.prezzo < ?
    GROUP BY
          a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
          a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
          a.foto_annuncio, a.thumbnails, qz.descrizione, da.contratto_max, da.contratto_min,
          da.numero_inquilini, t.nome
    ORDER BY
          a.data DESC;`,
    [
      id,
      prezzomax
    ]
  );
  res.json(results);
}
async function allAnnunciFilter(req, res) {
  const tipo = req.params.tipo;
  const quartiere = req.params.quartiere;
  const prezzomax = req.params.prezzomax;
  const [results] = await connection.execute(
    `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      a.thumbnails,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
          studenthome.annuncio a
    JOIN
          studenthome.utente u ON a.utente_id = u.id
    JOIN
          studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
          studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
          studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
          studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
          studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
          a.stato = "attivo"
          AND t.nome = ?
          AND qz.id = ?
          AND a.prezzo < ?
    GROUP BY
          a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
          a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
          a.foto_annuncio, a.thumbnails, qz.descrizione, da.contratto_max, da.contratto_min,
          da.numero_inquilini, t.nome
    ORDER BY
          a.data DESC;
    `,
    [
      tipo,
      quartiere,
      prezzomax
    ]
  );
  res.json(results);
}
async function AnnunciNoAttivi(req, res) {
  const [results] = await connection.execute(
    `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      a.thumbnails,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
        studenthome.annuncio a
    JOIN
        studenthome.utente u ON a.utente_id = u.id
    JOIN
        studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
        studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
        studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
        studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
        studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
        a.stato = "non attivo"
    GROUP BY
        a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
        a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
        a.foto_annuncio, a.thumbnails, qz.descrizione, da.contratto_max, da.contratto_min,
        da.numero_inquilini, t.nome
    ORDER BY
        a.data DESC;
    `
  );
  res.json(results);
}
async function attivaAnnuncio(req, res) {
  const id = req.params.id;
  await connection.execute("UPDATE annuncio SET stato = 'attivo' WHERE id = ?", [id]);
  res.json({ success: true });
}
async function AnnunciUtente(req, res) {
  const [results] = await connection.execute(
    `SELECT
      a.id,
      u.cognome,
      u.nome,
      u.mail,
      u.telefono,
      u.ruolo,
      u.foto_profilo,
      a.data,
      a.prezzo,
      a.descrizione,
      a.locali,
      a.mq,
      a.piano,
      a.indirizzo,
      a.foto_annuncio,
      qz.descrizione AS quartiere_zona_descrizione,
      GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
      da.contratto_max,
      da.contratto_min,
      da.numero_inquilini,
      t.nome AS tipologia
    FROM
        studenthome.annuncio a
    JOIN
        studenthome.utente u ON a.utente_id = u.id
    JOIN
        studenthome.quartierezona qz ON a.id_quartiere = qz.id
    JOIN
        studenthome.annuncioservizio asv ON a.id = asv.annuncio_id
    JOIN
        studenthome.servizio s ON asv.servizio_id = s.id
    JOIN
        studenthome.dettagli_annuncio da ON a.id = da.annuncio_id
    JOIN
        studenthome.tipologia t ON da.tipologia_id = t.id
    WHERE
        a.stato = "attivo" AND u.mail = ?
    GROUP BY
        a.id, u.cognome, u.nome, u.mail, u.telefono, u.ruolo, u.foto_profilo,
        a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo,
        a.foto_annuncio, qz.descrizione, da.contratto_max, da.contratto_min,
        da.numero_inquilini, t.nome
    ORDER BY
        a.data DESC;
    `,
    [
      req.params.mail
    ]
  );
  res.json(results);
}
async function allTipiAnnuncio(req, res) {
  const [results] = await connection.execute("SELECT * FROM studenthome.tipologia");
  res.json(results);
}
async function allServizi(req, res) {
  const [results] = await connection.execute("SELECT * FROM studenthome.servizio");
  res.json(results);
}
async function allQuartieri(req, res) {
  const [results] = await connection.execute("SELECT * FROM studenthome.quartierezona");
  res.json(results);
}
async function addPreferito(req, res) {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const { annuncio_id } = req.body;
  await connection.execute("INSERT INTO preferiti (utente_id, annuncio_id) VALUES (?, ?)", [user.id, annuncio_id]);
  res.json({ success: true });
}
async function removePreferito(req, res) {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const { annuncio_id } = req.params;
  await connection.execute("DELETE FROM preferiti WHERE utente_id = ? AND annuncio_id = ?", [user.id, annuncio_id]);
  res.json({ success: true });
}
async function getPreferiti(req, res) {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const [results] = await connection.execute(
    `SELECT a.* FROM annuncio a
     JOIN preferiti p ON a.id = p.annuncio_id
     WHERE p.utente_id = ?`,
    [user.id]
  );
  res.json(results);
}
var createAnnuncio = async (req, res) => {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const {
    id_quartiere,
    prezzo,
    descrizione,
    locali,
    mq,
    piano,
    indirizzo,
    selectedServizi,
    tipologia,
    numero_inquilini,
    contratto_min,
    contratto_max
  } = req.body;
  const foto_annuncio = req.file ? req.file.filename : null;
  const [result] = await connection.execute(
    `INSERT INTO annuncio (
      utente_id,
      id_quartiere,
      prezzo,
      descrizione,
      locali,
      mq,
      piano,
      indirizzo,
      foto_annuncio
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.id,
      id_quartiere,
      prezzo,
      descrizione,
      locali,
      mq,
      piano,
      indirizzo,
      foto_annuncio
    ]
  );
  res.json({ success: true });
  const annuncioID = result.insertId;
  const servizi = JSON.parse(selectedServizi);
  for (const servizioID of servizi) {
    await connection.execute("INSERT INTO annuncioservizio (annuncio_id, servizio_id) VALUES (?, ?)", [
      annuncioID,
      servizioID
    ]);
  }
  await connection.execute("INSERT INTO dettagli_annuncio (annuncio_id, tipologia_id, numero_inquilini, contratto_min, contratto_max) VALUES (?, ?, ?, ?, ?)", [
    annuncioID,
    tipologia,
    numero_inquilini,
    contratto_min,
    contratto_max
  ]);
};
var updateAnnuncio = async (req, res) => {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const {
    id_quartiere,
    prezzo,
    descrizione,
    locali,
    mq,
    piano,
    indirizzo,
    selectedServizi,
    tipologia,
    numero_inquilini,
    contratto_min,
    contratto_max
  } = req.body;
  const foto_annuncio = req.file ? req.file.filename : null;
  const annuncioID = req.params.id;
  await connection.execute(
    `UPDATE annuncio SET
      id_quartiere = ?,
      prezzo = ?,
      descrizione = ?,
      locali = ?,
      mq = ?,
      piano = ?,
      indirizzo = ?,
      foto_annuncio = ?
    WHERE id = ? AND utente_id = ?`,
    [
      id_quartiere,
      prezzo,
      descrizione,
      locali,
      mq,
      piano,
      indirizzo,
      foto_annuncio,
      annuncioID,
      user.id
    ]
  );
  await connection.execute("DELETE FROM annuncioservizio WHERE annuncio_id = ?", [annuncioID]);
  const servizi = JSON.parse(selectedServizi);
  for (const servizioID of servizi) {
    await connection.execute("INSERT INTO annuncioservizio (annuncio_id, servizio_id) VALUES (?, ?)", [
      annuncioID,
      servizioID
    ]);
  }
  await connection.execute(
    `UPDATE dettagli_annuncio SET
      tipologia_id = ?,
      numero_inquilini = ?,
      contratto_min = ?,
      contratto_max = ?
    WHERE annuncio_id = ?`,
    [
      tipologia,
      numero_inquilini,
      contratto_min,
      contratto_max,
      annuncioID
    ]
  );
  res.json({ success: true });
};
var deleteAnnuncio = async (req, res) => {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const [annunci] = await connection.execute("SELECT * FROM annuncio WHERE id=?", [req.params.id]);
  if (!Array.isArray(annunci) || annunci.length == 0) {
    res.status(404).send("Annuncio non trovato.");
    return;
  }
  const annuncio = annunci[0];
  if (annuncio.utente_id != user.id && user.ruolo != "admin") {
    res.status(403).send("Non hai i permessi per eliminare questo post.");
    return;
  }
  if (annuncio.foto_annuncio) {
    deleteFile(annuncio.foto_annuncio);
  }
  await connection.execute("DELETE FROM annuncio WHERE id=?", [req.params.id]);
  res.json({ success: true });
};
var modificaAnnuncio = async (req, res) => {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const id = req.params.id;
  const {
    id_quartiere,
    prezzo,
    descrizione,
    locali,
    mq,
    piano,
    indirizzo,
    selectedServizi,
    tipologia,
    numero_inquilini,
    contratto_min,
    contratto_max
  } = req.body;
  const foto_annuncio = req.file ? req.file.filename : null;
  try {
    await connection.execute(
      `UPDATE annuncio
       SET id_quartiere = ?, prezzo = ?, descrizione = ?, locali = ?,
           mq = ?, piano = ?, indirizzo = ?, foto_annuncio = COALESCE(?, foto_annuncio)
       WHERE id = ?`,
      [id_quartiere, prezzo, descrizione, locali, mq, piano, indirizzo, foto_annuncio, id]
    );
    const servizi = JSON.parse(selectedServizi);
    await connection.execute("DELETE FROM annuncioservizio WHERE annuncio_id = ?", [id]);
    for (const servizioID of servizi) {
      await connection.execute(
        "INSERT INTO annuncioservizio (annuncio_id, servizio_id) VALUES (?, ?)",
        [id, servizioID]
      );
    }
    await connection.execute(
      `UPDATE dettagli_annuncio
       SET tipologia_id = ?, numero_inquilini = ?, contratto_min = ?, contratto_max = ?
       WHERE annuncio_id = ?`,
      [tipologia, numero_inquilini, contratto_min, contratto_max, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante la modifica dell'annuncio");
  }
};

// src/routes/annunci-router.ts
var router2 = Router2();
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname(__filename2);
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path2.join(__dirname2, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
var fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File non supportato. Carica solo immagini."), false);
  }
};
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
  // Limite di 5MB per file
});
var uploadMiddleware = (req, res, next) => {
  upload.single("foto_annuncio")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};
router2.get("/api/annunci", allAnnunci);
router2.get("/api/lastannunci", lastAnnunci);
router2.get("/api/annunci/:id", AnnuncioDettaglio);
router2.get("/api/annuncinoattivi", AnnunciNoAttivi);
router2.post("/api/annunci/attiva/:id", attivaAnnuncio);
router2.get("/api/annunci/prezzo/:prezzomax", allAnnunciPrezzo);
router2.get("/api/annunci/tipo/:tipo/:prezzomax", allAnnunciTipo);
router2.get("/api/annunci/quartiere/:id/:prezzomax", allAnnunciQuartiere);
router2.get("/api/annunci/filter/:tipo/:quartiere/:prezzomax", allAnnunciFilter);
router2.get("/api/annunci/utente/:mail", AnnunciUtente);
router2.get("/api/tipi-annuncio", allTipiAnnuncio);
router2.get("/api/servizi", allServizi);
router2.get("/api/quartieri", allQuartieri);
router2.post("/api/preferiti", addPreferito);
router2.delete("/api/preferiti/:annuncio_id", removePreferito);
router2.get("/api/preferiti", getPreferiti);
router2.post("/api/annunci/create", uploadMiddleware, createAnnuncio);
router2.post("/api/annunci/update/:id", uploadMiddleware, updateAnnuncio);
router2.delete("/api/annunci/delete/:id", deleteAnnuncio);
router2.post("/api/annunci/modifica/:id", modificaAnnuncio);
router2.get("/api/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path2.join(__dirname2, "../../uploads", filename);
  res.sendFile(filepath);
});
var annunci_router_default = router2;

// src/app.ts
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// src/routes/auth-router.ts
import { Router as Router3 } from "express";

// src/controllers/auth-controller.ts
import bcrypt from "bcrypt";
var register = async (req, res) => {
  const user = getUser(req, res);
  if (user) {
    res.status(401).send("Questa operazione richiede il logout.");
    return;
  }
  const { cognome, nome, mail, telefono, password } = req.body;
  if (!nome || !cognome || !telefono || !mail || !password) {
    res.status(400).send("Tutti i campi sono obbligatori.");
    return;
  }
  const [users] = await connection.execute("SELECT mail FROM utente WHERE mail=?", [
    mail
  ]);
  if (Array.isArray(users) && users.length > 0) {
    res.status(400).send("Mail gi\xE0 in uso.");
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await connection.execute("INSERT INTO utente (cognome, nome, mail, telefono, password) VALUES (?, ?, ?, ?, ?)", [
    cognome,
    nome,
    mail,
    telefono,
    passwordHash
  ]);
  const [results] = await connection.execute(
    "SELECT id, mail, ruolo FROM utente WHERE mail=?",
    [
      mail
    ]
  );
  const newUser = results[0];
  const token = setUser(req, res, newUser);
  res.json({
    message: "Registrazione effettuata con successo",
    token,
    user: {
      id: newUser.id,
      mail: newUser.mail,
      ruolo: newUser.ruolo
    }
  });
};
var login = async (req, res) => {
  const user = getUser(req, res);
  if (user) {
    res.status(401).send("Questa operazione richiede il logout.");
    return;
  }
  const { nome, cognome, telefono, mail, password } = req.body;
  const [results] = await connection.execute(
    "SELECT id, mail, password, ruolo FROM utente WHERE mail=?",
    [mail]
  );
  if (!Array.isArray(results) || results.length == 0) {
    res.status(400).send("Credenziali errate.");
    return;
  }
  const userData = results[0];
  const correctPassword = await bcrypt.compare(password, userData.password);
  if (!correctPassword) {
    res.status(400).send("Credenziali errate.");
    return;
  }
  delete userData.password;
  const token = setUser(req, res, userData);
  res.json({
    message: "Login effettuato con successo",
    token,
    user: {
      id: userData.id,
      mail: userData.mail,
      ruolo: userData.ruolo
    }
  });
};
var logout = async (req, res) => {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  unsetUser(req, res);
  res.json({ message: "Logout effettuato con successo" });
};
var getProfile = async (req, res) => {
  const user = getUser(req, res);
  res.json(user);
};

// src/routes/auth-router.ts
var router3 = Router3();
router3.post("/api/auth/register", register);
router3.post("/api/auth/login", login);
router3.post("/api/auth/logout", logout);
router3.get("/api/auth/profile", getProfile);
var auth_router_default = router3;

// src/app.ts
var __filename3 = fileURLToPath3(import.meta.url);
var __dirname3 = dirname2(__filename3);
var app = express();
var port = 3e3;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(auth_router_default);
app.use(news_router_default);
app.use(annunci_router_default);
app.use("/uploads", express.static(path3.join(__dirname3, "../../uploads")));
app.use(history());
app.use(express.static("public"));
app.use(express.static("dist-frontend"));
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Ops... Pagina non trovata");
});
app.listen(port, "0.0.0.0", function() {
  console.log(`Listening on http://localhost:${port}`);
});
