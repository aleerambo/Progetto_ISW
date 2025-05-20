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
  id_tipologia: number;
  prezzo: string;
  dettagli: string;
  descrizione: string;
  data: string;
  servizi: string;
  foto_annuncio: string;
  locali?: number;
  mq?: number;
  piano?: number;
  contratto_min: number;
  contratto_max: number;
  numero_inquilini: number;
  id_quartiere: number;
  id_servizi: number[];
  distanza?: string;
  indirizzo: string;
  mail: string;
  telefono: string;
  isPreferito?: boolean;
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