import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory, type Router } from 'vue-router'
import Home from "./pages/Home.vue"
import News from "./pages/News.vue"
import ChiSiamo from "./pages/ChiSiamo.vue"
import Contatti from "./pages/Contatti.vue"
import Login from "./pages/Login.vue"
import NotFound from "./pages/NotFound.vue"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: Home },
      { path: "/news", component: News },
      { path: "/chi-siamo", component: ChiSiamo},
      { path: "/contatti", component: Contatti },
      { path: "/login", component: Login },
      { path: "/:pathMatch(.*)*", component: NotFound }
    ]
  })

createApp(App).use(router).mount('#app')
