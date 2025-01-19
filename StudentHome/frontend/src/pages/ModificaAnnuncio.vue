<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { Servizio, Quartiere, tipologiaAnnuncio, Annuncio } from '../types'

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
      selectedServizi: [] as number[],
      quartiere: 1, // Default to 'Centro'
      quartieri: [] as Quartiere[],
      file: null as File | null,
      errorMessage: "",

      annuncio: null as Annuncio | null,
    }
  },
  methods: {
    getAnnuncio() {
      const annuncioID = this.$route.params.id
      axios.get(`/api/annunci/${annuncioID}`)
        .then(response => {
          this.annuncio = response.data[0]
          if (this.annuncio) {
            // Popola i campi del form con i dati dell'annuncio
            this.descrizione = this.annuncio.descrizione
            this.indirizzo = this.annuncio.indirizzo
            this.prezzo = Number(this.annuncio.prezzo)
            this.locali = this.annuncio.locali ?? 0
            this.mq = this.annuncio.mq?.toString() || ""
            this.piano = this.annuncio.piano ?? 0
            this.tipologia = this.annuncio.id_tipologia
            this.numero_inquilini = this.annuncio.numero_inquilini
            this.contratto_min = this.annuncio.contratto_min
            this.contratto_max = this.annuncio.contratto_max
            this.selectedServizi = this.annuncio.id_servizi ? String(this.annuncio.id_servizi).split(',').filter(Boolean).map(Number) : []
            this.quartiere = this.annuncio.id_quartiere
          }
        })
        .catch(() => {
          this.errorMessage = "Errore nel recupero dell'annuncio"
        })
    },
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
    async modificaAnnuncio() {
      const annuncioID = this.$route.params.id
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
        await axios.post(`/api/annunci/update/${annuncioID}`, formData, {
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
    this.getAnnuncio()
    this.getTipiAnnuncio()
    this.getServizi()
    this.getQuartieri()
  },
})
</script>

<template>
  <h1 class="p-2 my-4 bg-secondary-subtle text-center" style="color: #1E3A8A;">Modifica Annuncio</h1>
  <div class="container mx-auto px-3 mt-4">
    <form @submit.prevent="modificaAnnuncio">
      <!-- Sezione Tipologia -->
      <div class="mb-3">
        <label for="tipologia" class="form-label fw-bold">Tipologia</label>
        <div class="d-flex flex-wrap gap-3">
          <div 
            v-for="t in tipiAnnuncio" 
            :key="t.id" 
            class="form-check">
            <input 
              class="form-check-input" 
              type="radio" 
              :value="t.id" 
              v-model="tipologia" 
              id="tipologia-{{ t.id }}"
              required>
            <label class="form-check-label" :for="'tipologia-' + t.id">
              {{ t.nome }}
            </label>
          </div>
        </div>
      </div>

      <!-- Input Generici -->
      <div class="row g-3">
        <div class="col-md-6">
          <label for="descrizione" class="form-label fw-bold">Descrizione</label>
          <input 
            type="text" 
            class="form-control" 
            id="descrizione" 
            v-model="descrizione" 
            required>
        </div>
        <div class="col-md-6">
          <label for="indirizzo" class="form-label fw-bold">Indirizzo</label>
          <input 
            type="text" 
            class="form-control" 
            id="indirizzo" 
            v-model="indirizzo" 
            required>
        </div>
      </div>

      <!-- Prezzo e Numero Inquilini -->
      <div class="row g-3 mt-3">
        <div class="col-md-6">
          <label for="prezzo" class="form-label fw-bold">Prezzo (€/mese)</label>
          <input 
            type="number" 
            class="form-control" 
            id="prezzo" 
            v-model="prezzo" 
            required>
        </div>
        <div class="col-md-6">
          <label for="numero_inquilini" class="form-label fw-bold">Numero inquilini</label>
          <input 
            type="number" 
            class="form-control" 
            id="numero_inquilini" 
            v-model="numero_inquilini" 
            required>
        </div>
      </div>

      <!-- Contratto -->
      <div class="row g-3 mt-3">
        <div class="col-md-6">
          <label for="contratto_min" class="form-label fw-bold">Contratto Minimo (mesi)</label>
          <input 
            type="number" 
            class="form-control" 
            id="contratto_min" 
            v-model="contratto_min" 
            required>
        </div>
        <div class="col-md-6">
          <label for="contratto_max" class="form-label fw-bold">Contratto Massimo (mesi)</label>
          <input 
            type="number" 
            class="form-control" 
            id="contratto_max" 
            v-model="contratto_max" 
            required>
        </div>
      </div>

      <!-- Locali e Metri Quadrati -->
      <div class="row g-3 mt-3">
        <div class="col-md-6">
          <label for="locali" class="form-label fw-bold">Locali</label>
          <input 
            type="number" 
            class="form-control" 
            id="locali" 
            v-model="locali" 
            required>
        </div>
        <div class="col-md-6">
          <label for="mq" class="form-label fw-bold">Metri Quadrati</label>
          <input 
            type="number" 
            class="form-control" 
            id="mq" 
            v-model="mq" 
            required>
        </div>
      </div>

      <!-- Piano -->
      <div class="mt-3">
        <label for="piano" class="form-label fw-bold">Piano</label>
        <input 
          type="number" 
          class="form-control" 
          id="piano" 
          v-model="piano" 
          required>
      </div>

      <!-- Servizi -->
      <div class="mt-3">
        <label for="servizi" class="form-label fw-bold">Servizi</label>
        <ul class="list-group">
          <li class="list-group-item" v-for="s in servizi" :key="s.id">
            <input 
              class="form-check-input me-1" 
              type="checkbox" 
              v-model="selectedServizi" 
              :value="s.id" 
              id="servizio-{{ s.id }}">
            <label class="form-check-label" :for="'servizio-' + s.id">
              {{ s.nome_servizio }}
            </label>
          </li>
        </ul>
      </div>

      <!-- Quartiere -->
      <div class="mt-3">
        <label for="quartiere" class="form-label fw-bold">Quartiere</label>
        <select 
          class="form-select form-select-lg" 
          id="quartiere" 
          v-model="quartiere" 
          required>
          <option v-for="q in quartieri" :key="q.id" :value="q.id">
            {{ q.nome_quartiere }}
          </option>
        </select>
      </div>

      <!-- Carica Immagine -->
      <div class="mt-3">
        <label for="foto_annuncio" class="form-label fw-bold">Carica Immagine</label>
        <input 
          type="file" 
          id="foto_annuncio" 
          @change="onFileChange" 
          class="form-control" 
          accept="image/*">
      </div>

      <!-- Pulsante di Invio -->
      <button type="submit" class="btn btn-primary mt-4 w-100">Salva modifiche</button>
    </form>

    <!-- Messaggio di Errore -->
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>