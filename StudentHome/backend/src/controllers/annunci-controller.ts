import { Request, Response } from "express"
import { connection } from "../utils/db"
import { getUser } from "../utils/auth"

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
        sa.contratto_max,
        sa.contratto_min,
        sa.numero_inquilini,
        sa.tipologia
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
        studenthome.stanzaappartamento sa ON a.id = sa.annuncio_id
    WHERE a.stato="attivo"
    GROUP BY 
        a.id, a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo, 
        a.foto_annuncio, qz.descrizione, sa.contratto_max, sa.contratto_min, sa.numero_inquilini, sa.tipologia
    ORDER BY 
        a.data DESC`
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
        qz.descrizione AS quartiere_zona_descrizione,
        GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
        sa.contratto_max,
        sa.contratto_min,
        sa.numero_inquilini,
        sa.tipologia
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
        studenthome.stanzaappartamento sa ON a.id = sa.annuncio_id
    WHERE a.id=? AND a.stato="attivo"
    GROUP BY 
        a.id, a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo, 
        a.foto_annuncio, qz.descrizione, sa.contratto_max, sa.contratto_min, sa.numero_inquilini, sa.tipologia
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
      sa.contratto_max,
      sa.contratto_min,
      sa.numero_inquilini,
      sa.tipologia
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
      studenthome.stanzaappartamento sa ON a.id = sa.annuncio_id
    WHERE a.stato="attivo"
    GROUP BY 
      a.id, a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo, 
      a.foto_annuncio, qz.descrizione, sa.contratto_max, sa.contratto_min, sa.numero_inquilini, sa.tipologia
    ORDER BY 
      a.data DESC
    LIMIT 2`
  )
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
      sa.contratto_max,
      sa.contratto_min,
      sa.numero_inquilini,
      sa.tipologia
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
      studenthome.stanzaappartamento sa ON a.id = sa.annuncio_id
    WHERE a.stato="attivo" AND sa.tipologia=? AND a.prezzo < ?
    GROUP BY 
      a.id, a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo, 
      a.foto_annuncio, a.thumbnails, qz.descrizione, sa.contratto_max, sa.contratto_min, sa.numero_inquilini, sa.tipologia
    ORDER BY 
      a.data DESC`, [
        tipo,
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
        qz.descrizione AS quartiere_zona_descrizione,
        GROUP_CONCAT(s.nome_servizio ORDER BY s.nome_servizio ASC) AS servizi,
        sa.contratto_max,
        sa.contratto_min,
        sa.numero_inquilini,
        sa.tipologia
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
        studenthome.stanzaappartamento sa ON a.id = sa.annuncio_id
    WHERE a.stato="non attivo"
    GROUP BY 
        a.id, a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo, 
        a.foto_annuncio, qz.descrizione, sa.contratto_max, sa.contratto_min, sa.numero_inquilini, sa.tipologia
    ORDER BY 
        a.data DESC`
  )
  res.json(results)
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
        sa.contratto_max,
        sa.contratto_min,
        sa.numero_inquilini,
        sa.tipologia
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
        studenthome.stanzaappartamento sa ON a.id = sa.annuncio_id
    WHERE a.stato="attivo" AND u.mail=?
    GROUP BY 
        a.id, a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo, 
        a.foto_annuncio, qz.descrizione, sa.contratto_max, sa.contratto_min, sa.numero_inquilini, sa.tipologia
    ORDER BY 
        a.data DESC`, [
          req.params.mail
  ])
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

export const createAnnuncio = async (req: Request, res: Response) => {
  // Verifica che l'utente abbia effettuato il login
  const user = getUser(req, res)
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.")
    return
  }

  const { id_quartiere, prezzo, descrizione, locali, mq, piano, indirizzo, selectedServizi } = req.body

  const [result]:any = await connection.execute("INSERT INTO annuncio (utente_id, id_quartiere, prezzo, descrizione, locali, mq, piano, indirizzo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
    user.id,
    id_quartiere,
    prezzo,
    descrizione,
    locali,
    mq,
    piano,
    indirizzo
  ])
  res.json({ success: true })

  const annuncioID = result.insertId
  console.log("annuncioID", annuncioID)

  for (const servizioID of selectedServizi) {
    await connection.execute("INSERT INTO annuncioservizio (annuncio_id, servizio_id) VALUES (?, ?)", [
      annuncioID,
      servizioID
    ])
  }
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

  await connection.execute("DELETE FROM annuncio WHERE id=?", [req.params.id])
  res.json({ success: true })
  
}