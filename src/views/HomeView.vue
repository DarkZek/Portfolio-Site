<template>
  <div>
    <div class="page">
      <header-bar></header-bar>
      <about-me v-if="isHome"></about-me>
      <project-list v-if="isHome"></project-list>
      <flixr-page v-if="route.name == 'Flixr'"/>
      <mobingo-page v-if="route.name == 'Mobingo'"/>
      <rustcraft-page v-if="route.name == 'Rustcraft'"/>
      <contact-me/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from "../components/HeaderBar.vue";
import AboutMe from "../components/AboutMe.vue";
import ProjectList from "../components/ProjectList.vue";
import ContactMe from "../components/ContactMe.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import FlixrPage from "../components/project/FlixrPage.vue";
import MobingoPage from "../components/project/MobingoPage.vue";
import RustcraftPage from "../components/project/RustcraftPage.vue";

const route = useRoute()
const isHome = computed(() => route.path == "/")
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900&display=swap");

.page {
  min-height: 200vh;
}

.transition > div {
  transition: opacity 1s ease-in;
}

.loader {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    max-width: 700px;
    margin-top: -8%;
    width: 90vw;
  }
}
</style>
