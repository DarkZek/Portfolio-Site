<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <NavigationBar></NavigationBar>

  <RouterView />

  <FooterBar></FooterBar>
</template>

<style scoped>

</style>
