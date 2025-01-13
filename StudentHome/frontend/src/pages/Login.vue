<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      mail: "",
      password: "",
    }
  },
  methods: {
    async onSubmit() {
      try {
        await axios.post("/api/auth/login", {
          mail: this.mail,
          password: this.password,
        })
        location.href = "/"
      } catch (e: any) {
        if (e.response) {
          alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
        } else {
          alert(e.message)
        }
      }
    },
  },
})
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li class="breadcrumb-item"><router-link to="/news">News</router-link></li>
        <li class="breadcrumb-item"><router-link to="/guidaalloggio">Guida alla ricerca dell allogio ideale</router-link></li>
        <li class="breadcrumb-item"><router-link to="/chisiamo">Chi siamo</router-link></li>
        <li class="breadcrumb-item"><router-link to="/contatti">Contatti</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Login</li>
    </ol>
  </nav>     
  <div class="prose dark:prose-invert">
    <h1>Login</h1>
    <form class="not-prose flex flex-col gap-3" @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="mail"
        class="rounded-lg bg-transparent border-zinc-200 dark:border-zinc-700"
        placeholder="Mail"
      />
      <input
        type="password"
        v-model="password"
        class="rounded-lg bg-transparent border-zinc-200 dark:border-zinc-700"
        placeholder="Password"
      />
      <button type="submit" class="btn btn-primary w-1/2 mx-auto mt-3">Accedi</button>
    </form>
    <p>Non sei ancora iscritto? Clicca qui e <RouterLink to="/registrazione">REGISTRATI</RouterLink></p>
  </div>
</template>
