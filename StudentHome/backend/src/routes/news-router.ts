import { Router } from "express"
import * as articoliController from "../controllers/news-controller"

const router: Router = Router()

router.get("/api/news", articoliController.allNews)
router.get("/api/news/:n", articoliController.lastNNews)

export default router