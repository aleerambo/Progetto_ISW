// src/utils/utils.ts
//funzione per convertire data in testo in un determinato range di tempo
export function ConvertiDataTesto(dateString: string): string {
  const announcementDate = new Date(dateString)
  const today = new Date()
  const diffDays = Math.floor((today.getTime() - announcementDate.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 30) return "recente"
  if (diffDays < 60) return "poco recente"
  return "meno recente"
}
// funzione per creare la url per google maps
export function CreaUrlMaps(indirizzo: string): string {
  const baseUrl = "https://www.google.com/maps/dir/?api=1&origin=";
  const destUrl = "Cesena+FC&destination=via+dell%27università%2B+50%2C+cesena%2C+FC&travelmode=bicycling";
  const encodeIndirizzo = encodeURIComponent(indirizzo)
      .replace(/%20/g, "+");
  return baseUrl + encodeIndirizzo + destUrl
}

export function getImageUrl(foto_annuncio: string | null): string {
  return foto_annuncio ? `/api/uploads/${foto_annuncio}` : 'img/placeholder.jpg'
}