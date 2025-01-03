import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allAnnunci(req: Request, res: Response) {
    connection.execute(
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
          a.data DESC`,
      [],
      function (err, results, fields) {
        res.json(results)
      }
    )
}

export async function AnnunciN(req: Request, res: Response) {
    connection.execute(
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
      [req.params.n],
      function (err, results, fields) {
        res.json(results)
      }
    )
}

export async function lastAnnunci(req: Request, res: Response) {
      connection.execute(
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
        LIMIT 2`,
        [],
        function (err, results, fields) {
          res.json(results)
        }
      )
  }
  export async function allAnnunciTipo(req: Request, res: Response) {
    connection.execute(
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
      WHERE a.stato="attivo" AND sa.tipologia=?
      GROUP BY 
          a.id, a.data, a.prezzo, a.descrizione, a.locali, a.mq, a.piano, a.indirizzo, 
          a.foto_annuncio, qz.descrizione, sa.contratto_max, sa.contratto_min, sa.numero_inquilini, sa.tipologia
      ORDER BY 
          a.data DESC`,
      [req.params.tipo],
      function (err, results, fields) {
        res.json(results)
      }
    )
}
  export async function AnnunciNoAttivi(req: Request, res: Response) {
    connection.execute(
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
          a.data DESC`,
      [],
      function (err, results, fields) {
        res.json(results)
      }
    )
}

export async function AnnunciUtente(req: Request, res: Response) {
  connection.execute(
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
        a.data DESC`,
    [req.params.mail],
    function (err, results, fields) {
      res.json(results)
    }
  )
}
