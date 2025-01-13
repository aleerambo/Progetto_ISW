<template>
  <header>
  <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <h1 class="text-primary">  
          <img class="float-start" src="/studenthome.jpg" alt="Logo di student home" width="150" height="100" id="LogoImg">
          <br/>
          <div id="LogoT">&nbsp;StudentHome</div>
          <br/>
        </h1>
      </router-link>
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
            <li class="nav-link active" aria-current="page"><router-link to="/">Home</router-link></li>
            <li class="nav-link" ><router-link to="/news">News</router-link></li>
            <li class="nav-link"><router-link to="/guidaalloggio">Guida alla ricerca dell'allogio ideale</router-link></li>
            <li class="nav-link"><router-link to="/chi-siamo">Chi siamo</router-link></li>
            <li class="nav-link"><router-link to="/contatti">Contatti</router-link></li>
            <li class="nav-link"><router-link to="/login">Login</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <router-view/>
  </main>

  <footer id="bottom" class="row text-center fixed-bottom">
    <div class="col-12">
      <p>Ingegneria dei Sistemi Web - A.A. 2024/2025</p>
    </div>
  </footer>
</template>
