<script lang="ts">
import { defineComponent } from 'vue';
//import { useRoute } from 'vue-router';
import * as metodiComuni from '../utils/metodiComuni';
import type { Annuncio } from '../types'

export default defineComponent({
  name: 'AnnuncioDettaglio',
  data(): { annuncio: Annuncio | null } {
    return {
      annuncio: null,
    };
  },
  methods: {
    async fetchAnnuncio(id: string) {
      try {
        console.log("sono in metodo fetchAnnuncio e id è: " + id);
        const response = await fetch(`/api/annunci/${id}`);
        console.log(`HTTP status: ${response.status}`);
        if (!response.ok) {
          console.log("qualcosa non va");
        }
        else{
          console.log("response è ok")
        }
        const data= await response.json();
        this.annuncio = Array.isArray(data) ? data[0] : data;
        console.log('Received data:', this.annuncio);
      } catch (error) {
        console.error('Errore durante il caricamento dell\'annuncio:', error);
      }
    },
    ConvertiDataTesto: metodiComuni.ConvertiDataTesto,
    CreaUrlMaps: metodiComuni.CreaUrlMaps,
  },

  created() {
  const id = this.$route.params.n as string;
  console.log('Component created, route params:', this.$route.params);
  console.log("questo è id:" + id)
  if (typeof id === 'string') {
      this.fetchAnnuncio(id);
    } else {
      console.error('Invalid ID type:', typeof id);
    }
  },
});
</script>

<template>
  <div class="mt-4" v-if="annuncio">
    <div class="container">
      <div class="card mb-4 shadow-sm">
        <div class="row g-0">
          <div class="col-md-5">
            <img :src="'/img/' + annuncio.foto_annuncio || 'img/placeholder.jpg'" alt="Immagine annuncio" width="400" height="400" />
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">{{ annuncio.descrizione }}</h5>
              <p class="card-text fs-4 fw-bold text-success">
                Prezzo: {{ annuncio.prezzo || 'Non specificato' }} €
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
              <p class="card-text text-muted">
                Guarda su maps <a :href="CreaUrlMaps(annuncio.indirizzo)" target="_blank">qui</a>
              </p>
              <div class="d-flex">
                <button class="btn btn-primary me-2">📨 Contatta</button>
                <button class="btn btn-success">📞 Chiama</button>
              </div>
            </div>
          </div>
        </div>              
      </div>
    </div>
  </div>    
</template>