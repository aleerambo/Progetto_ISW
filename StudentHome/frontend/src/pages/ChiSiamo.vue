<template>
    <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item"><router-link to="/news">News</router-link></li>
            <li class="breadcrumb-item"><router-link to="/guidaalloggio">Guida alla ricerca dell allogio ideale</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Chi siamo</li>
        </ol>
    </nav>
    <div class="container my-5">
        <div class="row align-items-center">
            <!-- Colonna per il testo -->
            <div class="col-12 col-md-6 order-2 order-md-1">
                <h1 class="mb-4">Chi siamo</h1>
                <p>
                    Benvenuto su StudentHome! 

                    Siamo una piattaforma creata da studenti per studenti, con l'obiettivo di semplificare la ricerca di alloggi universitari. Il nostro sogno? Creare un punto di riferimento unico per trovare appartamenti, camere e posti letto in modo rapido, sicuro e affidabile.

                    Su StudentHome troverai solo inserzioni pensate per le esigenze degli studenti, con offerte speciali e recensioni autentiche per aiutarti a fare la scelta giusta. Crediamo nel potere della condivisione e della trasparenza: per questo mettiamo al centro una community attiva, dove chi cerca casa e chi la offre può entrare in contatto diretto.

                    Che tu stia cercando il tuo primo appartamento o una stanza accogliente vicino all’università, siamo qui per rendere il processo semplice e senza stress. StudentHome è la tua nuova casa... prima della tua prossima casa!
                </p>
            </div>
            <!-- Colonna per l'immagine -->
            <div class="col-12 col-md-6 order-1 order-md-2 text-center">
                <img src="..\..\public\img\scontornato.png" class="img-fluid" alt="...">
            </div>
        </div>   
    </div>
</template>