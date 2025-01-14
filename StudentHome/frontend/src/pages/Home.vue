<script lang="ts">
import { defineComponent } from 'vue';
import Annuncio from '../components/annuncio.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Annuncio,
  },
  data() {
    return {
      rangeValue: 100, // Default value for the range input
      selectedCategory: '', // Default value for the select
      apiPath: '/api/lastannunci', // Default API path
      showAnnuncio: true, // Flag per montare/smontare il componente
    };
  },
  methods: {
    updateRangeValue() {
      //console.log('Range value updated:', this.rangeValue);
      // Puoi aggiungere ulteriori logiche qui, se necessario
    },
    updateApiPath() {
      const rangeFilter = `${Number(this.rangeValue) + 1}`; // Incrementa di 1 il valore di rangeValue

      //console.log(rangeFilter);

      const categoryFilter = this.selectedCategory
        ? `api/annunci/tipo/${this.selectedCategory}/${rangeFilter}`
        : '/api/lastannunci';

      this.apiPath = `${categoryFilter}`;

      // Forzare il ricaricamento del componente
      this.showAnnuncio = false;
      this.$nextTick(() => {
        this.showAnnuncio = true;
      });
    }
  }
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
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">Home</li>
    </ol>
  </nav>
  <div class="container bg-body-secondary">
    <div class="row align-items-start">
    <div class="col-1"></div>
    <div class="col-1">
      <label class="form-label" for="cerco">Cerco:</label>
    </div>
    <div class="col-2">
      <!-- bg-body-secondary -->
      <select class="form-select form-select-sm bg-body-secondary" 
       aria-label=".form-select-sm example" 
       id="cerco"
       v-model="selectedCategory">
        <option value="" selected>Seleziona...</option>
        <option value="appartamento">Appartamento</option>
        <option value="stanza">Stanza</option>
        <option value="posto letto">Posto letto</option>
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
