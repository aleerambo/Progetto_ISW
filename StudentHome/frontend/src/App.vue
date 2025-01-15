<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import UserInfo from "./components/user-info.vue"
import type { User } from "./types";

export default defineComponent({
  components: { UserInfo },
  data() {
    return {
      user: null as User | null,
    }
  },
  methods: {
    async getUser() {
      const res = await axios.get("/api/auth/profile")
      this.user = res.data
    },
  },
  mounted() {
    this.getUser()
  },
})
</script>

<template>
  <header>
    <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">
          <h1 class="text-primary">  
            <img class="float-start" src="/img/scontornato.png" alt="Logo di StudentHome" width="200" id="LogoImg">
            <br/>
            <div id="LogoT">&nbsp;StudentHome</div>
            <br/>
          </h1>
        </RouterLink>
    </div>
  </header>
  <nav class="navbar navbar-expand-lg bg-dark-subtle">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div>
          <ul class="navbar-nav">
            <li class="nav-link active" aria-current="page"><RouterLink to="/" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Home</RouterLink></li>
            <li class="nav-link"><RouterLink to="/archivio-news" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">News</RouterLink></li>
            <li class="nav-link"><RouterLink to="/guida-alloggio" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Guida alla ricerca dell'allogio ideale</RouterLink></li>
            <li class="nav-link"><RouterLink to="/chi-siamo" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Chi siamo</RouterLink></li>
            <li class="nav-link"><RouterLink to="/contatti" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Contatti</RouterLink></li>
            <UserInfo v-if="user" :user="user" />
            <template v-else>
              <li class="nav-link"><RouterLink to="/login" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Login</RouterLink></li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <!-- Passa l'utente come prop a tutte le pagine del router -->
    <RouterView :user="user" />
  </main>

  <footer id="bottom" class="row text-center fixed-bottom">
    <div class="col-12">
      <p>Ingegneria dei Sistemi Web - A.A. 2024/2025</p>
    </div>
  </footer>
</template>
