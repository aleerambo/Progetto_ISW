import { Router } from "express"
import * as annunciController from "../controllers/annunci-controller"

const router: Router = Router()

router.get("/api/annunci", annunciController.allAnnunci)
router.get("/api/lastannunci", annunciController.lastAnnunci) //per la home ha limit 2
router.get("/api/annunci/:n", annunciController.AnnunciN) //per il dettaglio del singolo annuncio
router.get("/api/annuncinoattivi", annunciController.AnnunciNoAttivi) //per utente admin da attivare
router.get("/api/annunci/tipo/:tipo", annunciController.allAnnunciTipo) //annunci per tipo
router.get("/api/annunci/utente/:mail", annunciController.AnnunciUtente) //annunci per utente usando mail come parametro
router.post("/api/annunci/create", annunciController.createAnnuncio)
router.delete("/api/annunci/:id", annunciController.deleteAnnuncio)

export default router