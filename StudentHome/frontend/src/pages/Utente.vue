<script lang="ts">
import { type PropType, defineComponent } from 'vue';
import axios from 'axios';
import { getImageUrl } from '../utils/metodiComuni'
import type { Annuncio, User } from '../types';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
  },
  data() {
    return {
      annunci: [] as Annuncio[],
    };
  },
  async created() {
    const userMail = this.user.mail as string;
    if (userMail) {
      const response = await axios.get(`/api/annunci/utente/${userMail}`);
      this.annunci = response.data;
    }
  },
  methods: {
    inserisciAnnuncio() {
      this.$router.push({ path: "/inserimento-annuncio" });
    },
    async deleteAnnuncio(annuncioID: number) {
      const confirmed = confirm("Sei sicuro di voler eliminare questo annuncio?");
      if (!confirmed) {
        return;
      }

      try {
        await axios.delete(`/api/annunci/delete/${annuncioID}`);
        this.$emit("delete")
        // Ricarica la pagina dopo aver eliminato l'annuncio
        location.reload();
      } catch (e: any) {
        if (e.response) {
          alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
        } else {
          alert(e.message)
        }
      }
    },
    getImageUrl,
  },
});
</script>

<template>
  <h1 class="p-2 my-4 bg-secondary-subtle text-center" style="color: #1E3A8A;">I miei annunci attivi</h1>
  <div class="mx-3">
    <button @click="inserisciAnnuncio" class="btn btn-primary mb-4">Inserisci nuovo annuncio</button>
    <div v-if="annunci.length === 0" class="h2 bg-secondary text-white-50 text-center mt-4">
      Non hai ancora pubblicato alcun annuncio!
    </div>
    <template v-else>
        <div v-for="annuncio in annunci" :key="annuncio.id" class="card mb-4 shadow-sm">
          <div class="row g-0">
              <!-- Sezione Immagini -->
              <div class="col-md-3">
                <img :src="getImageUrl(annuncio.foto_annuncio)" class="img-fluid rounded" alt="Immagine principale annuncio" />
              </div>
            <div class="card-body col-md-5">
                <h5 class="card-title">
                  <RouterLink :to="`/annunci/${annuncio.id}`">{{ annuncio.descrizione }}</RouterLink>
                </h5>
                <p class="card-text">{{ annuncio.prezzo }} €/mese</p>
                <p class="card-text">Locali: {{ annuncio.locali }}</p>
                <p class="card-text">MQ: {{ annuncio.mq }}</p>
                <p class="card-text">Piano: {{ annuncio.piano }}</p>
                <p class="card-text">Servizi: {{ annuncio.servizi }}</p>
              </div>
            </div>
            <div class="position-absolute top-0 end-0">
              <button class="btn btn-danger m-3" @click="deleteAnnuncio(annuncio.id)">Elimina</button>
            </div>
        </div>
    </template>
  </div>
</template>