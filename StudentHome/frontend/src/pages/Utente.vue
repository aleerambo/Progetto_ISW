<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Annuncio } from '../types';

export default defineComponent({
  data() {
    return {
      annunci: [] as Annuncio[],
    };
  },
  async created() {
    const userMail = this.$route.query.mail as string;
    if (userMail) {
      const response = await axios.get(`/api/annunci/profilo/${userMail}`);
      this.annunci = response.data;
    }
  },
});
</script>

<template>
  <div>
    <h1>I miei annunci</h1>
    <div v-if="annunci.length === 0" class="h2 bg-secondary text-white-50 text-center">
      Non hai ancora pubblicato alcun annuncio!
    </div>
    <template v-else>
        <div v-for="annuncio in annunci" :key="annuncio.id" class="card mb-4 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">{{ annuncio.descrizione }}</h5>
                <p class="card-text">{{ annuncio.prezzo }} €/mese</p>
                <p class="card-text">{{ annuncio.locali }} locali</p>
                <p class="card-text">{{ annuncio.mq }} mq</p>
                <p class="card-text">{{ annuncio.piano }} piano</p>
                <p class="card-text">{{ annuncio.servizi }}</p>
            </div>
        </div>
    </template>
  </div>
</template>