<template>
  <header>
    <h1>StudentHome</h1>
  </header>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a class="nav-link" href="#">Features</a>
          <a class="nav-link" href="#">Pricing</a>
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </div>
      </div>
    </div>
  </nav>
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
