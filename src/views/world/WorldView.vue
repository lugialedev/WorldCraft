<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main>
    <h1>Mon Univers</h1>

    <p>Univers : {{ route.params.worldId }}</p>
  </main>
</template>
