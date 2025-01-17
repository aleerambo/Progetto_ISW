<script lang="ts">
import { defineComponent } from 'vue';
import { ConvertiDataTesto, CreaUrlMaps } from '../utils/metodiComuni';
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
      } catch (error) {
        console.error('Errore durante il caricamento degli annunci:', error);
      }
    },
    ConvertiDataTesto,
    CreaUrlMaps,
  },
});
</script>

<template>
    <div class="h2 bg-secondary text-white-50 text-center" v-if="annunci.length === 0">
      Annuncio non trovato con i filtri utilizzati!
    </div>
    <div v-for="annuncio in annunci" :key="annuncio.id" class="card mb-4 shadow-sm">
      <div class="row g-0">
        <!-- Sezione Immagini -->
        <div class="col-md-5">
          <img :src="'img/' + annuncio.foto_annuncio || 'img/placeholder.jpg'" class="img-fluid rounded-start" alt="Immagine principale" width="300px" height="300px" />
          <!--
          <div class="d-flex mt-2">
            <img
              v-for="(thumb, index) in annuncio.thumbnails.split(',') || []"
              :key="index"
              :src="'img/' + thumb"
              class="img-thumbnail me-2"
              style="width: 60px; height: 60px; object-fit: cover;"
              alt="Immagine thumbnail"
            />
          </div>
          -->
        </div>

        <!-- Sezione Informazioni -->
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">
              <RouterLink :to="`/annunci/${annuncio.id}`">{{ annuncio.descrizione }}</RouterLink>
            </h5>
            <p class="card-text fs-4 fw-bold text-success">
              {{ annuncio.prezzo || '---' }} €/mese
            </p>
            <p class="card-text">
              Locali: {{ annuncio.locali }}
            </p>
            <p class="card-text">
              MQ: {{ annuncio.mq }}
            </p>
            <p class="card-text">
              Piano: {{ annuncio.piano }}
            </p>
            <p class="card-text">
              Servizi: {{ annuncio.servizi }}
            </p>
            <p class="card-text text-muted">
              Inserito {{ ConvertiDataTesto(annuncio.data) || 'di recente' }}
            </p>
          </div>
        </div>
      </div>
      <!-- Icona preferiti -->
      <div class="position-absolute top-0 end-0 p-2">
        <button type="button" class="btn btn-outline-danger btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>
        </button>
      </div>
    </div>
</template>