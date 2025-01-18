<script lang="ts">
import axios from 'axios';
import { defineComponent, type PropType } from 'vue';
import * as metodiComuni from '../utils/metodiComuni';
import type { Annuncio, User } from '../types';

export default defineComponent({
  name: 'AnnuncioDettaglio',
  props: {
    user: Object as PropType<User>,
  },
  data() {
    return {
      annuncio: null as Annuncio | null,
      mostraEmail: false,
      mostraTelefono: false,
      messaggioErrore: ''
    };
  },
  methods: {
  async fetchAnnuncio(id: string) {
    try {
      const response = await fetch(`/api/annunci/${id}`);
      const data = await response.json();
      this.annuncio = Array.isArray(data) ? data[0] : data;

      // Verifica se l'annuncio è nei preferiti
      const preferitiResponse = await axios.get('/api/preferiti');
      const preferiti = preferitiResponse.data;
      if (this.annuncio) {
        this.annuncio.isPreferito = preferiti.some((p: any) => p.id === this.annuncio!.id);
      }
    } catch (error) {
      console.error('Errore durante il caricamento dell\'annuncio:', error);
    }
  },
    mostraContatto(tipo: 'mail' | 'telefono') {
      if (!this.user) {
        this.messaggioErrore = 'Devi effettuare il login per visualizzare queste informazioni.';
        return;
      }
      this.messaggioErrore = '';
      if (tipo === 'mail') {
        this.mostraEmail = true;
      } else if (tipo === 'telefono') {
        this.mostraTelefono = true;
      }
    },
    async togglePreferito(annuncio: Annuncio) {
      if (!this.user) {
        alert('Devi effettuare il login per aggiungere ai preferiti.');
        return;
      }
      try {
        if (annuncio.isPreferito) {
          await axios.delete(`/api/preferiti/${annuncio.id}`);
          annuncio.isPreferito = false;
        } else {
          await axios.post('/api/preferiti', { annuncio_id: annuncio.id });
          annuncio.isPreferito = true;
        }
      } catch (error) {
        console.error('Errore durante la gestione dei preferiti:', error);
      }
    },
    ConvertiDataTesto: metodiComuni.ConvertiDataTesto,
    CreaUrlMaps: metodiComuni.CreaUrlMaps,
  },
  created() {
    const id = this.$route.params.n as string;
    if (typeof id === 'string') {
      this.fetchAnnuncio(id);
    } else {
      console.error('Invalid ID type:', typeof id);
    }
  },
});
</script>

<template>
  <div class="container-fluid">
    <div v-if="annuncio">
      <div class="card mt-4 shadow-sm">
        <div class="row g-3">
          <!-- Colonna immagine -->
          <div class="col-12 col-md-5">
            <img 
            :src="annuncio.foto_annuncio ? `/api/uploads/${annuncio.foto_annuncio}` : '/api/uploads/placeholder.jpg'" 
              class="img-fluid rounded" 
              alt="Immagine principale" />
          </div>

          <!-- Colonna dettagli annuncio -->
          <div class="col-12 col-md-7">
            <div class="card-body">
              <h5 class="card-title" style="max-width: 750px;">{{ annuncio.descrizione }}</h5>
              <p class="card-text fs-4 fw-bold text-success">
                Prezzo: {{ annuncio.prezzo || 'Non specificato' }} €
              </p>
              <p class="card-text">Locali: {{ annuncio.locali }}</p>
              <p class="card-text">MQ: {{ annuncio.mq }}</p>
              <p class="card-text">Piano: {{ annuncio.piano }}</p>
              <p class="card-text">Servizi: {{ annuncio.servizi }}</p>
              <p class="card-text text-muted">
                Inserito {{ ConvertiDataTesto(annuncio.data) || 'di recente' }}
              </p>
              <p class="card-text text-muted">
                Guarda su Maps 
                <a 
                  :href="CreaUrlMaps(annuncio.indirizzo)" 
                  target="_blank" 
                  class="text-decoration-none">
                  qui
                </a>
              </p>

              <!-- Bottoni contatto -->
              <div class="d-flex flex-column flex-md-row gap-2 mt-3">
                <button 
                  class="btn btn-primary d-flex align-items-center justify-content-center gap-2" 
                  @click="mostraContatto('mail')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                  </svg>
                  Contatta
                </button>

                <button 
                  class="btn btn-success d-flex align-items-center justify-content-center gap-2" 
                  @click="mostraContatto('telefono')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                  </svg>
                  Chiama
                </button>
              </div>

              <!-- Errori e contatti -->
              <p v-if="messaggioErrore" class="text-danger mt-3">{{ messaggioErrore }}</p>
              <p v-if="mostraEmail" class="mt-3">Email: {{ annuncio.mail }}</p>
              <p v-if="mostraTelefono" class="mt-3">Telefono: {{ annuncio.telefono }}</p>
            </div>
          </div>
        </div>
        <!-- Pulsante Preferiti -->
        <div class="position-absolute top-0 end-0 p-2">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="togglePreferito(annuncio)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" :class="annuncio.isPreferito ? 'bi-heart-fill text-danger' : 'bi-heart'" viewBox="0 0 16 16">
              <path v-if="annuncio.isPreferito" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              <path v-else d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
