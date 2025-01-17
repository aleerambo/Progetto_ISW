export interface User {
  nome: string
  cognome: string
  telefono: number
  id: number
  mail: string
  ruolo: "admin" | "utente"
}

export interface News {
  id: number
  titolo: string
  contenuto: string
  data_pubblicazione: string
  foto_news: string
}

export interface DettagliNews {
  id: number
  titolo: string
  contenuto: string
  data_pubblicazione: string
  foto_news: string
}

export interface Annuncio {
  id: number;
  prezzo: string;
  dettagli: string;
  descrizione: string;
  data: string;
  servizi: string;
  foto_annuncio: string;
  //thumbnails: string | string[];
  locali?: number;
  mq?: number;
  piano?: number;
  distanza?: string;
  indirizzo: string;
  mail: string;
  telefono: string;
}

export interface Quartiere {
  id: number;
  nome_quartiere: string;
  descrizione: string;
}

export interface Servizio {
  id: number;
  nome_servizio: string;
}

export interface tipologiaAnnuncio {
  id: number;
  nome: string;
}