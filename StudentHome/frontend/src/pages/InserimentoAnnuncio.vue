<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Servizio, Quartiere } from '../types';

export default defineComponent({
  data() {
    return {
      descrizione: "",
      indirizzo: "",
      prezzo: 0,
      locali: 0,
      mq: 0,
      piano: 0,
      servizi: [] as Servizio[],
      selectedServizi: [],
      quartiere: 1, // Default to 'Centro'
      quartieri: [] as Quartiere[],
    };
  },
  methods: {
    getServizi() {
      axios.get('/api/servizi')
        .then(response => this.servizi = response.data);
    },
    getQuartieri() {
      axios.get('/api/quartieri')
        .then(response => this.quartieri = response.data);
    },
    async inserisciAnnuncio() {
      const nuovoAnnuncio = {
        quartiereId: this.quartiere,
        prezzo: this.prezzo,
        descrizione: this.descrizione,
        locali: this.locali,
        mq: this.mq,
        piano: this.piano,
        indirizzo: this.indirizzo,
        selectedServizi: this.selectedServizi,
      };
      await axios.post('/api/annunci/create', {nuovoAnnuncio});
      this.$router.push({ path: '/utente' });
    },
  },
  mounted() {
    this.getServizi();
    this.getQuartieri();
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
        <label for="indirizzo" class="form-label">Indirizzo</label>
        <input type="text" class="form-control" id="indirizzo" v-model="indirizzo" required>
      </div>
      <div class="mb-3">
        <label for="prezzo" class="form-label">Prezzo (€/mese)</label>
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
        <ul class="list-group">
          <li class="list-group-item" v-for="s in servizi" required>
            <input class="form-check-input me-1" type="checkbox" v-model="selectedServizi" :key="s.id" :value="s.id" id="s.id">
            <label class="form-check-label" for="s.id">{{ s.nome_servizio }}</label>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="quartiere" class="form-label">Quartiere</label>
        <select class="form-select" id="quartiere" v-model="quartiere" required>
          <option v-for="q in quartieri" :key="q.id" :value="q.id">{{ q.nome_quartiere }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Inserisci</button>
    </form>
  </div>
</template>