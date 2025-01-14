<template>
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
            <li class="breadcrumb-item"><RouterLink to="/archivio-news">News</RouterLink></li>
            <li class="breadcrumb-item"><RouterLink to="/guida-alloggio">Guida alla ricerca dell allogio ideale</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Chi siamo</li>
        </ol>
    </nav>
    <h1 class="p-2 mb-2 bg-secondary-subtle text-center" style="color: #1E3A8A;">Chi siamo</h1>
    <div class="container my-5">
        <div class="row align-items-center">
            <!-- Colonna per il testo -->
            <div class="col-12 col-md-6 order-2 order-md-1 fs-5">
                <p>
                    Benvenuto su <span class="fw-bold">StudentHome</span>! 
                </p>
                <p>
                    Siamo una piattaforma creata da studenti per studenti, con l'obiettivo di semplificare la ricerca di alloggi universitari. Il nostro sogno? Creare un punto di riferimento unico per trovare appartamenti, camere e posti letto in modo rapido, sicuro e affidabile.
                </p>
                <p>
                    Su StudentHome troverai solo inserzioni pensate per le esigenze degli studenti, con offerte speciali e recensioni autentiche per aiutarti a fare la scelta giusta. Crediamo nel potere della condivisione e della trasparenza: per questo mettiamo al centro una community attiva, dove chi cerca casa e chi la offre può entrare in contatto diretto.
                </p>
                <p>
                    Che tu stia cercando il tuo primo appartamento o una stanza accogliente vicino all’università, siamo qui per rendere il processo semplice e senza stress. StudentHome è la tua nuova casa... prima della tua prossima casa!
                </p>
            </div>
            <!-- Colonna per l'immagine -->
            <div class="col-12 col-md-6 order-1 order-md-2 text-center">
                <img src="/img/scontornato.png" class="img-fluid" alt="Logo StudentHome">
                <h2 class="mt-3">StudentHome</h2>
            </div>
        </div>   
    </div>
</template>