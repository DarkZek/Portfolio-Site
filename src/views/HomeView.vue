<template>
  <div :class="{ transition }">
    <div
      class="loader"
      :style="`opacity: ${!loaded ? 1 : 0}; pointer-events: none;`"
    >
      <video
        v-if="showLoading"
        src="/img/name.webm"
        autoplay
        muted
        @ended="loadedVideo"
      ></video>
    </div>
    <div class="page" :style="`opacity: ${loaded ? 1 : 0}`">
      <header-bar></header-bar>
      <about-me></about-me>
      <project-list></project-list>
      <qualification-list />
      <contact-me />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from "../components/HeaderBar.vue";
import AboutMe from "../components/AboutMe.vue";
import ProjectList from "../components/ProjectList.vue";
import ContactMe from "../components/ContactMe.vue";
import { ref } from "vue";

let loaded = ref(false);

let now = new Date();
let transition = ref(true);
let showLoading = ref(false);

window.addEventListener("load", () => {
  let msTaken = new Date() - now;

  if (msTaken < 250) {
    // Cached, no animation
    transition.value = false;

    loaded.value = true;
  }
});

setTimeout(() => (showLoading.value = true), 300);

function loadedVideo() {
  loaded.value = true;
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

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
