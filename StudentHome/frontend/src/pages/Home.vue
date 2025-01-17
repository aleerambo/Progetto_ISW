<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import Annuncio from '../components/annuncio.vue';
import type { tipologiaAnnuncio, Quartiere } from '../types';

export default defineComponent({
  name: 'Home',
  components: {
    Annuncio,
  },
  data() {
    return {
      rangeValue: 100, // Default value for the range input
      tipiAnnuncio: [] as tipologiaAnnuncio[], // Array per memorizzare i tipi di annuncio
      selectedCategory: '', // Default value for the select
      apiPath: '/api/lastannunci', // Default API path
      showAnnuncio: true, // Flag per montare/smontare il componente
      quartieri: [] as Quartiere[],
      selectedQuartiere: '',
    };
  },
  methods: {
  updateRangeValue() {
    //console.log('Range value updated:', this.rangeValue);
    // Puoi aggiungere ulteriori logiche qui, se necessario
  },
  updateApiPath() {
    const rangeFilter = `${Number(this.rangeValue) + 1}`; // Incrementa di 1 il valore di rangeValue

    let apiPath = '';

    if (this.selectedCategory && this.selectedQuartiere) {
      // Filtra per tipologia, quartiere e prezzo
      apiPath = `/api/annunci/filter/${this.selectedCategory}/${this.selectedQuartiere}/${rangeFilter}`;
    } else if (this.selectedCategory) {
      // Filtra per tipologia e prezzo
      apiPath = `/api/annunci/tipo/${this.selectedCategory}/${rangeFilter}`;
    } else if (this.selectedQuartiere) {
      // Filtra per quartiere e prezzo
      apiPath = `/api/annunci/quartiere/${this.selectedQuartiere}/${rangeFilter}`;
    } else {
      // Filtra per solo prezzo
      apiPath = `/api/annunci/prezzo/${rangeFilter}`;
    }

    this.apiPath = apiPath;

    // Forzare il ricaricamento del componente
    this.showAnnuncio = false;
    this.$nextTick(() => {
      this.showAnnuncio = true;
    });
  },
  getTipiAnnuncio() {
    axios.get('/api/tipi-annuncio')
      .then(response => this.tipiAnnuncio = response.data);
  },
  getQuartieri() {
    axios.get('/api/quartieri')
      .then(response => this.quartieri = response.data)
  }
},
  mounted() {
    this.getTipiAnnuncio();
    this.getQuartieri();
  },
})
</script>

<style scoped>
h1 {
  color: blue;
}
.form-control-range {
  width: 100%;
  margin-top: 10px;
}
</style>
 
<template>
  <div class="container bg-body-secondary mt-3">
    <div class="row align-items-start">
    <div class="col-1 mt-1">
      <label class="form-label" for="cerco">Cerca:</label>
    </div>
    <div class="col-2">
      <!-- bg-body-secondary -->
      <select class="form-select form-select-sm bg-body-secondary" 
       aria-label=".form-select-sm example" 
       id="cerco"
       v-model="selectedCategory">
        <option value="" selected>Seleziona...</option>
        <option v-for="t in tipiAnnuncio" :value="t.nome">{{ t.nome }}</option>
      </select>
    </div>
    <div class="col-1 mt-1">
      <label class="form-label" for="cerco">Zona:</label>
    </div>
    <div class="col-2">
      <!-- bg-body-secondary -->
      <select class="form-select form-select-sm bg-body-secondary" 
       aria-label=".form-select-sm example" 
       id="cerco"
       v-model="selectedQuartiere">
        <option value="" selected>Seleziona...</option>
        <option v-for="q in quartieri" :key="q.id" :value="q.id">{{ q.nome_quartiere }}</option>
      </select>
    </div>
    <div class="col-1"></div>
    <div class="col-2">
      <label class="form-label" for="prezzo">Prezzo max:</label>
    </div>
    <div class="col-3">
      <input type="range" 
        class="form-control-range" 
        min="100" 
        max="1200" 
        step="50" 
        id="prezzo" 
        v-model="rangeValue"
        @input="updateRangeValue">
    </div>
    <div class="col-1"><label id="rangeval">€ {{ rangeValue }}</label></div>
    <div class="col-1"><button type="button" class="btn btn-secondary" @click="updateApiPath">Cerca</button></div>
  </div>
  </div>
  <br/>
 
  <br/>
  <div>
    <!-- Inclusione del componente Annuncio -->
    <Annuncio :apiPath= "apiPath" v-if="showAnnuncio" />
  </div>
</template>
