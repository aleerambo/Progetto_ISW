import { Router } from "express"
import * as articoliController from "../controllers/news-controller"

const router: Router = Router()

router.get("/api/articoli", articoliController.allNews)
router.get("/api/articoli/:n", articoliController.lastNNews)

export default router