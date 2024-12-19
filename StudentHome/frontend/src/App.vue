<template>
  <header>
    <h1>StudentHome</h1>
  </header>
  <nav>
    <ul>
      <li><router-link to="/news">News</router-link></li>
      <li><router-link to="/guida-alla-ricerca-dell-allogio-ideale">Guida alla ricerca dell'allogio ideale</router-link></li>
      <li><router-link to="/chi-siamo">Chi siamo</router-link></li>
      <li><router-link to="/contatti">Contatti</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
  <footer>
    <p>Ingegneria dei Sistemi Web - A.A. 2024/2025</p>
  </footer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
