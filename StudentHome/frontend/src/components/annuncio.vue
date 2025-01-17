<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { ConvertiDataTesto, CreaUrlMaps, getImageUrl } from '../utils/metodiComuni';
import type { Annuncio } from '../types';

export default defineComponent({
  name: 'Annuncio',
  props: {
    apiPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      annunci: [] as Annuncio[],
    };
  },
  created() {
    this.fetchAnnunci();
  },
  methods: {
    async fetchAnnunci() {
      try {
        const response = await fetch(this.apiPath);
        this.annunci = await response.json();
        // Ottieni i preferiti dell'utente
        const preferitiResponse = await axios.get('/api/preferiti');
        const preferiti = preferitiResponse.data;
        // Imposta la proprietà isPreferito per ogni annuncio
        this.annunci.forEach(annuncio => {
          annuncio.isPreferito = preferiti.some((p: any) => p.id === annuncio.id);
        });
      } catch (error) {
        console.error('Errore durante il caricamento degli annunci:', error);
      }
    },
    async togglePreferito(annuncio: Annuncio) {
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
    ConvertiDataTesto,
    CreaUrlMaps,
    getImageUrl,
  },
});
</script>

<template>
  <div>
    <div class="h2 bg-secondary text-white-50 text-center" v-if="annunci.length === 0">
      Annuncio non trovato con i filtri utilizzati!
    </div>
    <div v-for="annuncio in annunci" :key="annuncio.id" class="card mb-4 shadow-sm">
      <div class="row g-0">
        <!-- Sezione Immagini -->
        <div class="col-md-3">
          <img :src="getImageUrl(annuncio.foto_annuncio)" class="img-fluid rounded" alt="Immagine principale annuncio" />
        </div>
        <div class="card-body col-md-5">
          <h5 class="card-title text-truncate" style="max-width: 600px;">
            <RouterLink :to="`/annunci/${annuncio.id}`">{{ annuncio.descrizione }}</RouterLink>
          </h5>
          <p class="card-text">{{ annuncio.prezzo }} €/mese</p>
          <p class="card-text">Locali: {{ annuncio.locali }}</p>
          <p class="card-text">MQ: {{ annuncio.mq }}</p>
          <p class="card-text">Piano: {{ annuncio.piano }}</p>
          <p class="card-text">Servizi: {{ annuncio.servizi }}</p>
          <div class="position-absolute top-0 end-0 p-2">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="togglePreferito(annuncio)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" :class="annuncio.isPreferito ? 'bi-heart-fill text-danger' : 'bi-heart'" viewBox="0 0 16 16">
                <path v-if="annuncio.isPreferito" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                <path v-else d="M8 2.748-.717-3.737C5.6-1.522 8 1.314 8 1.314s2.4-2.837 8.717-5.051C16.717 1.522 8 2.748 8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.171C12.721-3.04 23.333 4.868 8 15z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>