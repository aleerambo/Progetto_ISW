<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      nome: "",
      cognome: "",
      telefono: "",
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
          nome: this.nome,
          cognome: this.cognome,
          telefono: this.telefono,
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
  <!-- Titolo della pagina -->
  <h1 class="p-2 mb-2 bg-secondary-subtle text-center mt-4" style="color: #1E3A8A;">Registrazione</h1>

  <!-- Contenitore principale -->
  <div class="container">
    <div class="row">
      <!-- Colonna destra: Form di registrazione -->
      <div class="col-md-4 order-1 order-md-2 mb-4">
        <div class="card shadow p-4">
          <img 
            src="/img/undraw_secure_login_pdn4.svg" 
            alt="Computer con lucchetto per rappresentare sicurezza" 
            class="img-fluid mb-3 rounded"
          />
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <input 
                type="text" 
                v-model="nome" 
                class="form-control" 
                placeholder="Nome" 
                aria-label="Nome"
                required 
              />
            </div>
            <div class="mb-3">
              <input 
                type="text" 
                v-model="cognome" 
                class="form-control" 
                placeholder="Cognome" 
                aria-label="Cognome"
                required 
              />
            </div>
            <div class="mb-3">
              <input 
                type="tel" 
                pattern="[0-9]{10}" 
                v-model="telefono" 
                class="form-control" 
                placeholder="Telefono (es. 3337779911)" 
                aria-label="Telefono"
                required 
              />
            </div>
            <div class="mb-3">
              <input 
                type="email" 
                v-model="mail" 
                class="form-control" 
                placeholder="Email" 
                aria-label="Email"
                required 
              />
            </div>
            <div class="mb-3">
              <input 
                type="password" 
                v-model="password" 
                class="form-control" 
                placeholder="Password" 
                aria-label="Password"
                required 
              />
            </div>
            <div class="mb-3">
              <input 
                type="password" 
                v-model="confirmPassword" 
                class="form-control" 
                placeholder="Conferma password" 
                aria-label="Conferma password"
                required 
              />
            </div>
            <button type="submit" class="btn btn-primary w-100 fw-bold">Registrati</button>
          </form>
          <p class="mt-3 text-center">
            Sei già iscritto? Clicca qui e 
            <RouterLink to="/login">ACCEDI</RouterLink>
          </p>
        </div>
      </div>

      <!-- Colonna sinistra: Testo descrittivo -->
      <div class="col-md-8 order-2 order-md-1 mt-3">
        <h2>Perché iscriversi</h2>
        <div class="fs-5">
          <p>
            StudentHome è la piattaforma creata pensando alle esigenze di chi studia e cerca un alloggio ideale. Accedendo alla tua area personale, potrai esplorare un'ampia selezione di appartamenti e stanze in affitto, con soluzioni pensate su misura per studenti come te.
          </p>
          <p>Iscrivendoti, avrai accesso a funzionalità esclusive:</p>
          <ul>
            <li>Ricerca rapida e personalizzata: filtra gli alloggi in base alle tue preferenze e trova quello perfetto in pochi clic.</li>
            <li>Consigli e supporto: ricevi suggerimenti pratici e assistenza dedicata durante tutta la tua ricerca.</li>
            <li>Un mondo di opportunità: scopri offerte esclusive e soluzioni abitative che combinano comodità, qualità e convenienza.</li>
          </ul>
          <p>
            Non lasciare che trovare casa diventi una fonte di stress: StudentHome è qui per rendere il processo semplice e veloce.
            Iscriviti subito e fai il primo passo verso il tuo alloggio ideale.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
