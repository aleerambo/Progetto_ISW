import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allNews(req: Request, res: Response) {
    connection.execute(
      `SELECT * 
       FROM news`,
      [],
      function (err, results, fields) {
        res.json(results)
      }
    )
}

export async function lastNNews(req: Request, res: Response) {
    connection.execute(
      `SELECT * 
       FROM news
       ORDER BY data_pubblicazione DESC LIMIT ?`,
      [req.params.n],
      function (err, results, fields) {
        res.json(results)
      }
    )
}