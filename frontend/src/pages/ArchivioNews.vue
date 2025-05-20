<script lang="ts">
import { defineComponent, type PropType } from "vue"
import axios from "axios"
import type { News, User } from "../types";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
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
                <RouterLink :to="'/news/' + news.id" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                    <div class="card h-100"> <!-- h-100 rende tutte le card della stessa altezza -->
                        <img :src="'/img/' + news.foto_news" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">{{ news.titolo }}</h5>
                            <p>{{ news.data_pubblicazione.slice(0, 10) }}</p>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>