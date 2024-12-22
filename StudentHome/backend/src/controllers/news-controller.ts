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

