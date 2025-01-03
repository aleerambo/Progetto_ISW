import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory, type Router } from 'vue-router'
import Home from "./pages/Home.vue"
import Contatti from "./pages/Contatti.vue"
import Login from "./pages/Login.vue"
import News from "./pages/News.vue"
import NotFound from "./pages/NotFound.vue"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: Home },
      { path: "/contatti", component: Contatti },
      { path: "/login", component: Login },
      { path: "/news", component: News },
      { path: "/:pathMatch(.*)*", component: NotFound }
    ]
  })

createApp(App).use(router).mount('#app')
