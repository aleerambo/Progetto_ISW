import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser } from "../utils/auth"
import { deleteFile } from "../utils/file"

export async function allAnnunci(req: Request, res: Response) {
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
  )
  res.json(results)
}

export async function AnnuncioDettaglio(req: Request, res: Response) {
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

export async function lastAnnunci(req: Request, res: Response) {
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
  )
  res.json(results)
}

export async function allAnnunciPrezzo(req: Request, res: Response) {
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
  `, [
    prezzomax
  ])
res.json(results)
}

export async function allAnnunciTipo(req: Request, res: Response) {
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
    `, [
        tipo,
        prezzomax
      ])
  res.json(results)
}

export async function allAnnunciQuartiere(req: Request, res: Response) {
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
          a.data DESC;`
    , [
        id,
        prezzomax
      ])
  res.json(results)
}

export async function allAnnunciFilter(req: Request, res: Response) {
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
    `, [
      tipo,
      quartiere,
      prezzomax
  ])
  res.json(results)
}

export async function AnnunciNoAttivi(req: Request, res: Response) {
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
  )
  res.json(results)
}

export async function attivaAnnuncio(req: Request, res: Response) {
  const id = req.params.id;
  await connection.execute("UPDATE annuncio SET stato = 'attivo' WHERE id = ?", [id]);
  res.json({ success: true });
}

export async function AnnunciUtente(req: Request, res: Response) {
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
    `, [
          req.params.mail
  ])
  res.json(results)
}

export async function allTipiAnnuncio(req: Request, res: Response) {
  const [results] = await connection.execute("SELECT * FROM studenthome.tipologia")
  res.json(results)
}

export async function allServizi(req: Request, res: Response) {
  const [results] = await connection.execute("SELECT * FROM studenthome.servizio")
  res.json(results)
}

export async function allQuartieri(req: Request, res: Response) {
  const [results] = await connection.execute("SELECT * FROM studenthome.quartierezona")
  res.json(results)
}

export async function addPreferito(req: Request, res: Response) {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }

  const { annuncio_id } = req.body;
  await connection.execute("INSERT INTO preferiti (utente_id, annuncio_id) VALUES (?, ?)", [user.id, annuncio_id]);
  res.json({ success: true });
}

export async function removePreferito(req: Request, res: Response) {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }

  const { annuncio_id } = req.params;
  await connection.execute("DELETE FROM preferiti WHERE utente_id = ? AND annuncio_id = ?", [user.id, annuncio_id]);
  res.json({ success: true });
}

export async function getPreferiti(req: Request, res: Response) {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.");
    return;
  }

  const [results] = await connection.execute(
    `SELECT a.* FROM annuncio a
     JOIN preferiti p ON a.id = p.annuncio_id
     WHERE p.utente_id = ?`, [user.id]);
  res.json(results);
}

export const createAnnuncio = async (req: Request, res: Response) => {
  // Verifica che l'utente abbia effettuato il login
  const user = getUser(req, res)
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.")
    return
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
  } = req.body

  const foto_annuncio = req.file ? req.file.filename : null;

  const [result]:any = await connection.execute(
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
    user.id,
    id_quartiere,
    prezzo,
    descrizione,
    locali,
    mq,
    piano,
    indirizzo,
    foto_annuncio
  ])
  res.json({ success: true })

  const annuncioID = result.insertId

  const servizi = JSON.parse(selectedServizi);

  for (const servizioID of servizi) {
    await connection.execute("INSERT INTO annuncioservizio (annuncio_id, servizio_id) VALUES (?, ?)", [
      annuncioID,
      servizioID
    ])
  }

  await connection.execute("INSERT INTO dettagli_annuncio (annuncio_id, tipologia_id, numero_inquilini, contratto_min, contratto_max) VALUES (?, ?, ?, ?, ?)", [
    annuncioID,
    tipologia,
    numero_inquilini,
    contratto_min,
    contratto_max
  ])
}

export const updateAnnuncio = async (req: Request, res: Response) => {
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
    WHERE id = ? AND utente_id = ?`, [
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
  ]);

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
    WHERE annuncio_id = ?`, [
    tipologia,
    numero_inquilini,
    contratto_min,
    contratto_max,
    annuncioID
  ]);

  res.json({ success: true });
}

export const deleteAnnuncio = async (req: Request, res: Response) => {
  // Verifica che l'utente abbia effettuato il login
  const user = getUser(req, res)
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.")
    return
  }

  // Verifica che l'annuncio esista
  const [annunci] = await connection.execute("SELECT * FROM annuncio WHERE id=?", [req.params.id])
  if (!Array.isArray(annunci) || annunci.length == 0) {
    res.status(404).send("Annuncio non trovato.")
    return
  }

  // Verifica che l'utente abbia i permessi per eliminare il post
  const annuncio = annunci[0] as any
  if (annuncio.utente_id != user.id && user.ruolo != "admin") {
    res.status(403).send("Non hai i permessi per eliminare questo post.")
    return
  }

  // Elimina l'immagine associata all'annuncio
  if (annuncio.foto_annuncio) {
    deleteFile(annuncio.foto_annuncio);
  }

  await connection.execute("DELETE FROM annuncio WHERE id=?", [req.params.id])
  res.json({ success: true })
  
}

export const modificaAnnuncio = async (req: Request, res: Response) => {
  const user = getUser(req, res)
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.")
    return
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
  } = req.body

  const foto_annuncio = req.file ? req.file.filename : null;

  try {
    // Aggiorna la tabella annuncio
    await connection.execute(
      `UPDATE annuncio 
       SET id_quartiere = ?, prezzo = ?, descrizione = ?, locali = ?, 
           mq = ?, piano = ?, indirizzo = ?, foto_annuncio = COALESCE(?, foto_annuncio)
       WHERE id = ?`,
      [id_quartiere, prezzo, descrizione, locali, mq, piano, indirizzo, foto_annuncio, id]
    )

    // Aggiorna i servizi
    const servizi = JSON.parse(selectedServizi);
    await connection.execute("DELETE FROM annuncioservizio WHERE annuncio_id = ?", [id])
    for (const servizioID of servizi) {
      await connection.execute(
        "INSERT INTO annuncioservizio (annuncio_id, servizio_id) VALUES (?, ?)",
        [id, servizioID]
      )
    }

    // Aggiorna i dettagli annuncio
    await connection.execute(
      `UPDATE dettagli_annuncio 
       SET tipologia_id = ?, numero_inquilini = ?, contratto_min = ?, contratto_max = ?
       WHERE annuncio_id = ?`,
      [tipologia, numero_inquilini, contratto_min, contratto_max, id]
    )

    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).send("Errore durante la modifica dell'annuncio")
  }
}