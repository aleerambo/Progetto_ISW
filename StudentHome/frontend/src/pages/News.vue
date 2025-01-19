<script lang="ts">
import { defineComponent, type PropType } from "vue"
import axios from "axios"
import type { DettagliNews, User } from "../types";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
  data() {
    return {
      news: null as DettagliNews | null
    }
  },
  methods: {
    getNews() {
      axios.get("/api/news/" + this.$route.params.id)
      .then((response) => {
          if (response.data.length > 0) {
            this.news = response.data[0];
          } else {
            // Reindirizza alla pagina 404
            this.$router.push({ name: "NotFound" });
          }
        })
        .catch(() => {
          // In caso di errore (ad esempio, l'API non è raggiungibile)
          this.$router.push({ name: "NotFound" });
        });
    },
  },
  mounted() {
    this.getNews();
  },
});
</script>

<template>
    <h1 class="p-2 mb-2 bg-secondary-subtle text-center mt-4" style="color: #1E3A8A;">News</h1>
    <template v-if="news">
      <div class="container my-5">
        <h2>{{ news.titolo }}</h2>
        <p class="fs-6">{{ news.data_pubblicazione.slice(0, 10) }}</p>
        <div class="row align-items-center">
          <!-- Colonna per il testo -->
          <div class="col-12 col-md-6 order-2 order-md-1">
            <p class="fs-5">{{ news.contenuto }}</p>
          </div>
          <div class="col-12 col-md-6 order-1 order-md-2 text-center">
            <img :src="'/img/' + news.foto_news" class="img-fluid" alt="">
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      
    </template>
</template>