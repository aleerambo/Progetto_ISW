<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import type { News } from "../types";

export default defineComponent({
  data() {
    return {
      datiNews: [] as News[]
    }
  },
  methods: {
    getArchivioNews() {
      axios.get("/api/news")
        .then(response => this.datiNews = response.data)
    }
  },
  mounted() {
    this.getArchivioNews()
  }
})
</script>

<template>
    <h1 class="p-2 mb-2 bg-secondary-subtle text-center mt-4" style="color: #1E3A8A;">News</h1>
    <!-- Aggiungi un container e una row -->
    <div class="container mt-3">
        <div class="row g-4"> <!-- g-4 aggiunge spazio tra le card -->
            <!-- Wrappa ogni card in una col -->
            <div class="col-sm-6 col-md-4 col-lg-3" v-for="news in datiNews">
                <div class="card h-100"> <!-- h-100 rende tutte le card della stessa altezza -->
                    <img :src="'/img/' + news.foto_news" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">{{ news.titolo }}</h5>
                        <RouterLink :to="'/news/' + news.id">Leggi tutto</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>