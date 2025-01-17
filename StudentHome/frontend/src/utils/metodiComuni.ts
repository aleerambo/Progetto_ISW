// src/utils/utils.ts

export function ConvertiDataTesto(dateString: string): string {
    const announcementDate = new Date(dateString);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - announcementDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return "recente";
    if (diffDays < 60) return "poco recente";
    return "meno recente";
  }
  
export function CreaUrlMaps(indirizzo: string): string {
    const baseUrl = "https://www.google.com/maps/dir/?api=1&origin=";
    const destUrl = "Cesena+FC&destination=via+dell%27università%2B+50%2C+cesena%2C+FC&travelmode=bicycling";
    const encodeIndirizzo = encodeURIComponent(indirizzo)
        .replace(/%20/g, "+"); 
    /*const encodeIndirizzo=indirizzo
    //.replace(/\s/g, "+")
    //.replace(/%20/g, "+")
    .replace(/,/g, "%2C")
    .replace(/'/g, "%27")
    .replace(/à/g, "%C3%A0")      // à
    .replace(/è/g, "%C3%A8")      // è
    .replace(/é/g, "%C3%A9")      // é
    .replace(/ì/g, "%C3%AC")      // ì
    .replace(/ò/g, "%C3%B2")      // ò
    .replace(/ù/g, "%C3%B9");      // ù
    */
    return baseUrl + encodeIndirizzo + destUrl
  }