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
  <div class="w-100 vw-100">
    <!-- Sezione di ricerca -->
    <div class="row bg-body-secondary p-3">
      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-auto">
            <label class="form-label mb-0" for="cerco">Cerca:</label>
          </div>
          <div class="col-md-2">
            <select class="form-select form-select-sm bg-body-secondary" 
              aria-label="form-select-sm" 
              id="cerco"
              v-model="selectedCategory">
              <option value="" selected>Seleziona...</option>
              <option value="appartamento">Appartamento</option>
              <option value="stanza">Stanza</option>
              <option value="posto letto">Posto letto</option>
            </select>
          </div>
          <div class="col-auto">
            <label class="form-label mb-0" for="prezzo">Prezzo max:</label>
          </div>
          <div class="col-md-4">
            <input type="range" 
              class="form-control-range" 
              min="100" 
              max="1200" 
              step="50" 
              id="prezzo" 
              v-model="rangeValue"
              @input="updateRangeValue">
          </div>
          <div class="col-auto">
            <label id="rangeval">€ {{ rangeValue }}</label>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-secondary" @click="updateApiPath">Cerca</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sezione degli annunci -->
    <div class="row mt-4">
      <div class="col-12 px-4">
        <Annuncio :apiPath="apiPath" v-if="showAnnuncio" />
      </div>
    </div>
  </div>
</template>
