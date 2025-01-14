<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      mail: "",
      password: "",
      confirmPassword: "",
    }
  },
  methods: {
    async onSubmit() {
      if (this.password != this.confirmPassword) {
        alert("Le due password non coincidono.")
        return
      }
      try {
        await axios.post("/api/auth/register", {
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
  <h1 class="p-2 my-4 bg-secondary-subtle text-center" style="color: #1E3A8A;">Registrazione</h1>
  <div class="container">
    <div class="row">
      <!-- Colonna del testo (8/12 = circa 2/3) -->
      <div class="col-md-8 mt-3">
        <h2>Perché iscriversi</h2>
        <div class="fs-5">
          <p>
            StudentHome è la piattaforma creata pensando alle esigenze di chi studia e cerca un alloggio ideale. Accedendo alla tua area personale, potrai esplorare un'ampia selezione di appartamenti e stanze in affitto, con soluzioni pensate su misura per studenti come te.
          </p>
          <p>
          Iscrivendoti, avrai accesso a funzionalità esclusive:
          </p>
          <ul>
            <li>Ricerca rapida e personalizzata: filtra gli alloggi in base alle tue preferenze e trova quello perfetto in pochi clic.</li>
            <li>Consigli e supporto: ricevi suggerimenti pratici e assistenza dedicata durante tutta la tua ricerca.</li>
            <li>Un mondo di opportunità: scopri offerte esclusive e soluzioni abitative che combinano comodità, qualità e convenienza.</li>
          </ul>
          <p>
            Non lasciare che trovare casa diventi una fonte di stress: StudentHome è qui per rendere il processo semplice e veloce.
            Iscriviti subito e fai il primo passo verso il tuo alloggio ideale
          </p>
        </div>
      </div>

      <!-- Colonna del form (4/12 = circa 1/3) -->
      <div class="col-md-4">
        <div class="card p-3">
          <img src="/img/undraw_secure_login_pdn4.svg" alt="Computer con lucchetto per rappresentare sicurezza" class="img-fluid mb-3">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <input
                type="text"
                v-model="mail"
                class="form-control"
                placeholder="Mail"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                placeholder="Conferma password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Registrati</button>
          </form>
          <p class="mt-3 text-center">
            Sei già iscritto? Clicca qui e 
            <RouterLink to="/login">ACCEDI</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>