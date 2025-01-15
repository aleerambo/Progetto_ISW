<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      descrizione: '',
      prezzo: 0,
      locali: 0,
      mq: 0,
      piano: '',
      servizi: '',
    };
  },
  methods: {
    async inserisciAnnuncio() {
      const nuovoAnnuncio = {
        descrizione: this.descrizione,
        prezzo: this.prezzo,
        locali: this.locali,
        mq: this.mq,
        piano: this.piano,
        servizi: this.servizi,
      };
      await axios.post('/api/annunci', nuovoAnnuncio);
      this.$router.push({ path: '/utente' });
    },
  },
});
</script>

<template>
  <div>
    <h1>Inserisci nuovo annuncio</h1>
    <form @submit.prevent="inserisciAnnuncio">
      <div class="mb-3">
        <label for="descrizione" class="form-label">Descrizione</label>
        <input type="text" class="form-control" id="descrizione" v-model="descrizione" required>
      </div>
      <div class="mb-3">
        <label for="prezzo" class="form-label">Prezzo</label>
        <input type="number" class="form-control" id="prezzo" v-model="prezzo" required>
      </div>
      <div class="mb-3">
        <label for="locali" class="form-label">Locali</label>
        <input type="number" class="form-control" id="locali" v-model="locali" required>
      </div>
      <div class="mb-3">
        <label for="mq" class="form-label">Metri quadrati</label>
        <input type="number" class="form-control" id="mq" v-model="mq" required>
      </div>
      <div class="mb-3">
        <label for="piano" class="form-label">Piano</label>
        <input type="text" class="form-control" id="piano" v-model="piano" required>
      </div>
      <div class="mb-3">
        <label for="servizi" class="form-label">Servizi</label>
        <input type="text" class="form-control" id="servizi" v-model="servizi" required>
      </div>
      <button type="submit" class="btn btn-primary">Inserisci</button>
    </form>
  </div>
</template>