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
    <img class="rounded mx-auto d-block mt-4" src="/img/img404.webp" alt="Immagine pagina 404" width="300" height="300" id="Img404">
    <p class="h2 text-center">Ops! Pagina non trovata</p>
</template>