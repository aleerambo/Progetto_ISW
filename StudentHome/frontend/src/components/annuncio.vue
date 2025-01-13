<template>
    <div class="container">
      <div class="h2 bg-secondary text-white-50 text-center" v-if="annunci.length===0">Annuncio non trovato con i filtri utilizzati!</div>
      <div v-for="annuncio in annunci" :key="annuncio.id" class="card mb-4 shadow-sm">
        <div class="row g-0">
          <!-- Sezione Immagini -->
          <div class="col-md-5">
            <img :src="'img/' + annuncio.foto_annuncio || 'img/placeholder.jpg'" class="img-fluid rounded-start" alt="Immagine principale" width="300px" height="300px"/>
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
              <h5 class="card-title"><RouterLink :to="`/annunci/${annuncio.id}`">{{ annuncio.descrizione }}</RouterLink></h5>
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
            <button type="button" class="btn btn-outline-danger btn-sm "></button>
         </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { ConvertiDataTesto, CreaUrlMaps } from '../utils/metodiComuni';
  
  interface Annuncio {
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
  }
  
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