import multer from "multer"
import path from "path"
import { Router } from "express"
import { fileURLToPath } from "url"
import { dirname } from "path"
import * as annunciController from "../controllers/annunci-controller"

const router: Router = Router()

// Calcola __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configura multer per salvare i file caricati
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

// Filtro per accettare solo file di immagine
const fileFilter = (req: any, file: any, cb: any) => {
  // Accetta solo file di tipo immagine
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('File non supportato. Carica solo immagini.'), false)
  }
}

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limite di 5MB per file
})

// Gestione degli errori di multer
const uploadMiddleware = (req: any, res: any, next: any) => {
  upload.single('foto_annuncio')(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // Errore di multer
      return res.status(400).json({ error: err.message })
    } else if (err) {
      // Altro errore
      return res.status(400).json({ error: err.message })
    }
    next()
  })
}

router.get("/api/annunci", annunciController.allAnnunci)
router.get("/api/lastannunci", annunciController.lastAnnunci) //per la home ha limit 2
router.get("/api/annunci/:id", annunciController.AnnuncioDettaglio) //per il dettaglio del singolo annuncio
router.get("/api/annuncinoattivi", annunciController.AnnunciNoAttivi) //per utente admin da attivare
router.get("/api/annunci/prezzo/:prezzomax", annunciController.allAnnunciPrezzo) //annunci per prezzo massimo
router.get("/api/annunci/tipo/:tipo/:prezzomax", annunciController.allAnnunciTipo) //annunci per tipo e prezzo massimo
router.get("/api/annunci/quartiere/:id/:prezzomax", annunciController.allAnnunciQuartiere) //annunci per quartiere e prezzo massimo
router.get("/api/annunci/filter/:tipo/:quartiere/:prezzomax", annunciController.allAnnunciFilter) //annunci per tipo, quartiere e prezzo massimo
router.get("/api/annunci/utente/:mail", annunciController.AnnunciUtente) //annunci per utente usando mail come parametro
router.get("/api/tipi-annuncio", annunciController.allTipiAnnuncio)
router.get("/api/servizi", annunciController.allServizi)
router.get("/api/quartieri", annunciController.allQuartieri)
router.post("/api/annunci/create", uploadMiddleware, annunciController.createAnnuncio)
router.delete("/api/annunci/delete/:id", annunciController.deleteAnnuncio)

// Rotta dedicata per servire le immagini
router.get('/api/uploads/:filename', (req, res) => {
    const filename = req.params.filename
    const filepath = path.join(__dirname, '../../uploads', filename)
    res.sendFile(filepath)
})

export default router