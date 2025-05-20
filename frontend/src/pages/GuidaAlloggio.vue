<script lang="ts">
import { defineComponent, type PropType } from "vue"
import type { User } from "../types";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
})

</script>

<template>
    <h1 class="p-2 mb-2 bg-secondary-subtle text-center mt-4" style="color: #1E3A8A;">Guida alla ricerca dell'alloggio ideale</h1>
    <div class="container my-5">
        <div class="row align-items-center">
            <!-- Colonna per il testo -->
            <div class="col-12 col-md-6 order-2 order-md-1">
                <p class="fs-5">
                    Trovare l’alloggio perfetto può sembrare una sfida, ma con alcuni consigli mirati puoi semplificare il processo e fare la scelta giusta per le tue esigenze. <br/>
                    Noi di StudentHome, siamo qui per aiutarti a trovare la tua prossima casa con facilità.
                </p>
                <h2>1. Definisci le tue priorità</h2>
                <p class="fs-5">
                    Prima di iniziare, elenca le tue necessità: vicinanza all’università, budget, numero di coinquilini e servizi indispensabili (es. Wi-Fi, lavatrice, aria condizionata).
                </p>
                <h2>2. Esplora le opzioni</h2>
                <p class="fs-5">
                    Le foto e le descrizioni dettagliate ti aiuteranno a farti un’idea chiara.
                </p>
                <h2>3. Valuta il quartiere</h2>
                <p class="fs-5">
                    Scegli un quartiere sicuro e ben collegato con i mezzi pubblici. Leggi le recensioni degli altri studenti per avere un’idea della zona.
                </p>
                <h2>4. Visita di persona (se puoi)</h2>
                <p class="fs-5">
                    Le foto sono utili, ma una visita dal vivo ti permetterà di verificare ogni dettaglio e percepire l’atmosfera del luogo. Non trascurare aspetti come la luminosità, lo stato degli arredi e l’isolamento acustico.
                </p>
                <h2>5. Prendi una decisione consapevole</h2>
                <p class="fs-5">
                    Una volta trovato l’alloggio che risponde alle tue esigenze, non aspettare troppo a lungo. Il mercato degli affitti per studenti è molto dinamico, e la tua futura casa potrebbe andare via velocemente!
                </p>
            </div>
            <!-- Colonna per l'immagine -->
            <div class="col-12 col-md-6 order-1 order-md-2 text-center">
                <img src="/img/undraw_sweet_home_dkhr.svg" class="img-fluid" alt="Una persona stilizzata che si avvicina ad una casa stilizzata">
            </div>
        </div>   
    </div>
</template>