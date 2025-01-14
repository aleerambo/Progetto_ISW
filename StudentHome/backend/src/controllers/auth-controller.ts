import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { getUser, setUser, unsetUser, User } from "../utils/auth"
import { connection } from "../utils/db"

export const register = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente ha già effettuato il login
  const user = getUser(req, res)
  if (user) {
    res.status(401).send("Questa operazione richiede il logout.")
    return
  }

  // Estrae mail e password dal body della richiesta
  const { mail, password } = req.body

  // Verifica che la mail sia disponibile
  const [users]:any = await connection.execute("SELECT mail FROM utente WHERE mail=?", [
    mail,
  ])

  if (Array.isArray(users) && users.length > 0) {
    res.status(400).send("Mail già in uso.")
    return
  }

  // Crea l'hash della password per non salvarla in chiaro
  const passwordHash = await bcrypt.hash(password, 10)

  // Inserisce l'utente nel database
  await connection.execute("INSERT INTO utente (mail, password) VALUES (?, ?)", [
    mail,
    passwordHash,
  ])

  // Estrae i dati per il nuovo utente
  const [results]:any = await connection.execute(
    "SELECT id, mail, ruolo FROM utente WHERE mail=?", [
      mail
  ])
  const newUser = (results as User[])[0]

  // Crea un JWT contenente i dati dell'utente e lo imposta come cookie
  setUser(req, res, newUser)

  res.json({ message: "Registrazione effettuata con successo" })
}

export const login = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente ha già effettuato il login
  const user = getUser(req, res)
  if (user) {
    res.status(401).send("Questa operazione richiede il logout.")
    return
  }

  // Estrae mail e password dal body della richiesta
  const { mail, password } = req.body

  // Esegue la query al database per ottenere i dati dell'utente in base alla mail
  const [results]:any = await connection.execute(
    "SELECT id, mail, password, ruolo FROM utente WHERE mail=?",
    [mail]
  )

  // Errore se l'utente non è stato trovato
  if (!Array.isArray(results) || results.length == 0) {
    res.status(400).send("Credenziali errate.")
    return
  }

  const userData = results[0] as any

  // Confronta l'hash della password fornita con quello nel database
  const correctPassword = await bcrypt.compare(password, userData.password)

  // Errore se la password è errata
  if (!correctPassword) {
    res.status(400).send("Credenziali errate.")
    return
  }

  // Importante! Rimuove la password dall'oggetto utente in modo da non inserirla nel JWT
  delete userData.password

  // Crea un JWT contenente i dati dell'utente e lo imposta come cookie
  setUser(req, res, userData)

  res.json({ message: "Login effettuato con successo" })
}

export const logout = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente non ha effettuato il login
  const user = getUser(req, res)
  if (!user) {
    res.status(401).send("Questa operazione richiede l'autenticazione.")
    return
  }

  // Cancella il cookie contenente l'access token
  unsetUser(req, res)

  res.json({ message: "Logout effettuato con successo" })
}

export const getProfile = async (req: Request, res: Response) => {
  // Decodifica il contenuto dell'access token, che contiene il dati dell'utente, e lo invia in risposta
  const user = getUser(req, res)
  res.json(user)
}
