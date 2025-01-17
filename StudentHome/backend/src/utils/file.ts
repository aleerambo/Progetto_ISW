import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const deleteFile = (filename: string) => {
  const filePath = path.join(__dirname, '../../uploads', filename)
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Errore durante l'eliminazione del file: ${filePath}`, err)
    } else {
      console.log(`File eliminato: ${filePath}`)
    }
  })
}