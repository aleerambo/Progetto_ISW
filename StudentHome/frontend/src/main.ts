import axios from 'axios'
import { createApp } from 'vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'

import App from './App.vue'
import Home from "./pages/Home.vue"
import News from "./pages/News.vue"
import GuidaAlloggio from "./pages/GuidaAlloggio.vue"
import ChiSiamo from "./pages/ChiSiamo.vue"
import Contatti from "./pages/Contatti.vue"
import Login from "./pages/Login.vue"
import Registrazione from "./pages/Registrazione.vue"
import AnnuncioDettaglio from "./pages/annuncioDettaglio.vue"
import NotFound from "./pages/NotFound.vue"
import type { User } from "./types"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: "/", 
      component: Home 
    },
    { 
      path: "/news", 
      component: News 
    },
    { 
      path: "/guidaalloggio", 
      component: GuidaAlloggio
    },
    { 
      path: "/chi-siamo", 
      component: ChiSiamo
    },
    { 
      path: "/contatti", 
      component: Contatti 
    },
    {
      path: "/login",
      component: Login,
      // meta: { requireLogout: true }, // Segna che la rotta richiede il logout
      { path: "/annunci/:n", component: AnnuncioDettaglio },
    },
    {
      path: "/registrazione",
      component: Registrazione,
      // meta: { requireLogout: true }, // Segna che la rotta richiede il logout
    },
    { 
      path: "/:pathMatch(.*)*", 
      component: NotFound 
    },
  ]
})

// Funzione che viene eseguita prima di ogni navigazione del router
router.beforeEach(async (to) => {
  const res = await axios.get("/api/auth/profile")
  const user = res.data as User | null
  // Se la pagina richiede il login, ma l'utente non l'ha effettuato, lo rimanda alla pagina di login
  if (to.meta.requireLogin && !user) {
    return { path: "/login" }
  }
  // Se la pagina richiede il logout, ma l'utente ha effettuato l'accesso, lo rimanda alla home
  if (to.meta.requireLogout && user) {
    return { path: "/" }
  }
})

createApp(App).use(router).mount('#app')
