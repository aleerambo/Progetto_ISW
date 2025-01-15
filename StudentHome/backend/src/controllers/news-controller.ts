import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allNews(req: Request, res: Response) {
  const [results] = await connection.execute(
    `SELECT * 
      FROM news
      ORDER BY data_pubblicazione DESC`
  )
  res.json(results)
}

export async function newsFromID(req: Request, res: Response) {
  const [results] = await connection.execute(
    `SELECT * 
     FROM news 
     WHERE id=?`,
    [req.params.id]
  )
  res.json(results)
}