import express, { Express } from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import history from "connect-history-api-fallback"
import newsRouter from "./routes/news-router"
import annunciRouter from "./routes/annunci-router"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth-router"

// Calcola __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express()
const port: number = 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors())

app.use(authRouter)
app.use(newsRouter)
app.use(annunciRouter)

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')))

app.use(history())
app.use(express.static("public"))
app.use(express.static("dist-frontend"))

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port,"0.0.0.0", function() {
  console.log(`Listening on http://localhost:${port}`)
})

//Finito il progetto esegui a tarminale "npm run build" per la conversione in js