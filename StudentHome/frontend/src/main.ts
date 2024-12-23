import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import App from './App.vue'
import Home from "./pages/Home.vue"
import Contatti from "./pages/Contatti.vue"
import Login from "./pages/Login.vue"
import NotFound from "./pages/NotFound.vue"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: Home },
      { path: "/contatti", component: Contatti },
      { path: "/login", component: Login },
      { path: "/:pathMatch(.*)*", component: NotFound }
    ]
  })

createApp(App).use(router).mount('#app')
