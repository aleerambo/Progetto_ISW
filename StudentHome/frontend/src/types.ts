export interface User {
  id: number
  mail: string
  role: "admin" | "user"
}

export interface News {
  id: number
  titolo: string
  contenuto: string
  data_pubblicazione: string
  foto_news: string
}