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
    <h1 class="p-2 mb-2 bg-secondary-subtle text-center mt-4" style="color: #1E3A8A;">Contatti</h1>
    <div class="container my-5">
        <div class="row align-items-center">
            <!-- Colonna per il testo -->
            <div class="col-12 col-md-6 order-2 order-md-1 fs-5">
                <p>
                    Hai bisogno di assistenza o vuoi metterti in contatto con noi? Siamo qui per aiutarti!
                </p>
                <p>
                    Puoi scriverci una mail all’indirizzo:
                </p>
                <p>
                    <span class="fw-bold"><a href="mailto:studenthome@support.com">studenthome@support.com</a></span>
                </p>
                <p>
                    Oppure contattarci telefonicamente al numero:
                </p>
                <p>
                    <span class="fw-bold"><a href="tel:051526398">051 526398</a></span>
                </p>
                <p>
                    Il nostro team è disponibile per rispondere alle tue domande, chiarire dubbi e fornirti il supporto necessario per trovare la casa perfetta per i tuoi studi. 
                    Non esitare a contattarci, siamo al tuo fianco
                </p>
            </div>
            <!-- Colonna per l'immagine -->
            <div class="col-12 col-md-6 order-1 order-md-2 text-center">
                <img src="/img/undraw_active_support_re_b7sj.svg" class="img-fluid" alt="Logo StudentHome">
            </div>
        </div>   
    </div>
</template>