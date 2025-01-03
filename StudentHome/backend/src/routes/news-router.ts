import { Router } from "express"
import * as newsController from "../controllers/news-controller"

const router: Router = Router()

router.get("/api/news", newsController.allNews)
router.get("/api/news/:n", newsController.lastNNews)

export default router