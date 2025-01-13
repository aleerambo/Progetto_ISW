import express, { Express } from "express"
import history from "connect-history-api-fallback"
import newsRouter from "./routes/news-router"
import annunciRouter from "./routes/annunci-router"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import authRouter from "./routes/auth-router"

const app: Express = express()
const port: number = 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.use(authRouter)
app.use(newsRouter)
app.use(annunciRouter)

app.use(history())
app.use(express.static("public"))
app.use(express.static("dist-frontend"))

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})

//Finito il progetto esegui a tarminale "npm run build" per la conversione in js