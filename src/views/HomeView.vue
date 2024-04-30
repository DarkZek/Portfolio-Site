<template>
  <div>
    <div class="page">
      <header-bar></header-bar>
      <transition>
        <about-me v-if="isHome"></about-me>
      </transition>
      <transition>
        <project-list v-if="isHome"></project-list>
      </transition>
      <transition>
        <project-carousel v-if="isHome && false"></project-carousel>
      </transition>
      <transition>
        <flixr-page v-if="route.name == 'Flixr'"/>
      </transition>
      <transition>
        <mobingo-page v-if="route.name == 'Mobingo'"/>
      </transition>
      <transition>
        <rustcraft-page v-if="route.name == 'Rustcraft'"/>
      </transition>
      <contact-me/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from "../components/HeaderBar.vue";
import AboutMe from "../components/AboutMe.vue";
import ProjectList from "../components/ProjectList.vue";
import ProjectCarousel from "../components/ProjectCarousel.vue";
import ContactMe from "../components/ContactMe.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import FlixrPage from "../components/project/FlixrPage.vue";
import MobingoPage from "../components/project/MobingoPage.vue";
import RustcraftPage from "../components/project/RustcraftPage.vue";

const route = useRoute()
const isHome = computed(() => route.path == "/");

watch(route, () => {
  if (route.name != "Home") {
    window.scrollTo(0, 0);
  }
})
</script>

<style scoped lang="scss">

.transition > div {
  transition: opacity 1s ease-in;
}

.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
