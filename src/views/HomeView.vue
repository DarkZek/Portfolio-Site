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
import ContactMe from "../components/ContactMe.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import FlixrPage from "../components/project/FlixrPage.vue";
import MobingoPage from "../components/project/MobingoPage.vue";
import RustcraftPage from "../components/project/RustcraftPage.vue";

const route = useRoute()
const isHome = computed(() => route.path == "/")

watch(route, () => {
  if (route.name != "Home") {
    window.scrollTo(0, 0);
  }
})
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900&display=swap");

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

.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
