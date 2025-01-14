<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import type { DettagliNews } from "../types";

export default defineComponent({
  data() {
    return {
      news: null as DettagliNews | null
    }
  },
  methods: {
    getNews() {
      axios.get("/api/news/" + this.$route.params.id)
        .then(response => this.news = response.data[0])
    }
  },
  mounted() {
    this.getNews()
  }
})
</script>

<template>
    <h1 class="p-2 mb-2 bg-secondary-subtle text-center mt-4" style="color: #1E3A8A;">News</h1>
    <template v-if="news">
      <h2>{{ news.titolo }}</h2>
      <p class="fs-6">{{ news.data_pubblicazione.slice(0, 10) }}</p>
      <article>
        <div class="container my-5">
          <div class="row align-items-center">
            <!-- Colonna per il testo -->
            <div class="col-12 col-md-6 order-2 order-md-1">
              <p>{{ news.contenuto }}</p>
            </div>
            <div class="col-12 col-md-6 order-1 order-md-2 text-center">
              <img :src="'/img/' + news.foto_news" class="img-fluid" alt="">
            </div>
          </div>
        </div>
      </article>
    </template>
</template>