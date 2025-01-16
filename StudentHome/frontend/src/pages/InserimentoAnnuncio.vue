<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { Servizio, Quartiere, tipologiaAnnuncio } from '../types'

export default defineComponent({
  data() {
    return {
      descrizione: "",
      indirizzo: "",
      prezzo: 0,
      locali: 0,
      mq: "",
      piano: 0,
      tipiAnnuncio: [] as tipologiaAnnuncio[],
      tipologia: 1,
      numero_inquilini: 0,
      contratto_min: 0,
      contratto_max: 0,
      servizi: [] as Servizio[],
      selectedServizi: [],
      quartiere: 1, // Default to 'Centro'
      quartieri: [] as Quartiere[],
      file: null as File | null,
      errorMessage: "",
    }
  },
  methods: {
    getTipiAnnuncio() {
      axios.get('/api/tipi-annuncio')
        .then(response => this.tipiAnnuncio = response.data)
    },
    getServizi() {
      axios.get('/api/servizi')
        .then(response => this.servizi = response.data)
    },
    getQuartieri() {
      axios.get('/api/quartieri')
        .then(response => this.quartieri = response.data)
    },
    async inserisciAnnuncio() {
      const formData = new FormData()
      formData.append('id_quartiere', this.quartiere.toString())
      formData.append('prezzo', this.prezzo.toString())
      formData.append('descrizione', this.descrizione)
      formData.append('locali', this.locali.toString())
      formData.append('mq', this.mq)
      formData.append('piano', this.piano.toString())
      formData.append('indirizzo', this.indirizzo)
      formData.append('selectedServizi', JSON.stringify(this.selectedServizi))
      formData.append('tipologia', this.tipologia.toString())
      formData.append('numero_inquilini', this.numero_inquilini.toString())
      formData.append('contratto_min', this.contratto_min.toString())
      formData.append('contratto_max', this.contratto_max.toString())
      if (this.file) {
        formData.append('foto_annuncio', this.file)
      }

      try {
        await axios.post('/api/annunci/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.$router.push({ path: '/utente' })
      } catch (error: any) {
        if (error.response) {
          this.errorMessage = error.response.data.error
        } else {
          this.errorMessage = error.message
        }
      }
    },
    onFileChange(event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        this.file = target.files[0]
      }
    },
  },
  mounted() {
    this.getTipiAnnuncio()
    this.getServizi()
    this.getQuartieri()
  },
})
</script>

<template>
  <div class="mx-3">
    <h1>Inserisci nuovo annuncio</h1>
    <form @submit.prevent="inserisciAnnuncio">
      <div class="mb-3">
        <label for="tipologia" class="form-label">Tipologia</label>
        <div v-for="t in tipiAnnuncio" :key="t.id" class="form-check">
          <input class="form-check-input" type="radio" :value="t.id" v-model="tipologia">
          <label class="form-check-label">
            {{ t.nome }}
          </label>
        </div>
      </div>
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
        <label for="numero_inquilini" class="form-label">Numero inquilini</label>
        <input type="number" class="form-control" id="numero_inquilini" v-model="numero_inquilini" required>
      </div>
      <div class="mb-3">
        <label for="contratto_min" class="form-label">Contratto minimo (mesi)</label>
        <input type="number" class="form-control" id="contratto_min" v-model="contratto_min" required>
      </div>
      <div class="mb-3">
        <label for="contratto_max" class="form-label">Contratto massimo (mesi)</label>
        <input type="number" class="form-control" id="contratto_max" v-model="contratto_max" required>
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
        <input type="number" class="form-control" id="piano" v-model="piano" required>
      </div>
      <div class="mb-3">
        <label for="servizi" class="form-label">Servizi</label>
        <ul class="list-group">
          <li class="list-group-item" v-for="s in servizi" required>
            <input class="form-check-input me-1" type="checkbox" v-model="selectedServizi" :key="s.id" :value="s.id">
            <label class="form-check-label">{{ s.nome_servizio }}</label>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="quartiere" class="form-label">Quartiere</label>
        <select class="form-select" id="quartiere" v-model="quartiere" required>
          <option v-for="q in quartieri" :key="q.id" :value="q.id">{{ q.nome_quartiere }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="foto_annuncio">Carica Immagine</label>
        <input type="file" id="foto_annuncio" @change="onFileChange" class="form-control" accept="image/*" />
      </div>
      <button type="submit" class="btn btn-primary">Inserisci</button>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>