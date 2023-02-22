<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavigationBar from "./components/NavigationBar.vue";
import FooterBar from "./components/FooterBar.vue";
</script>

<template>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
  <RouterView />
</template>
