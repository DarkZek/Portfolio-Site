<template>
  <div>
    <div ref="rustcraft">
      <project-entry
        background-img="/img/Rustcraft.webp"
        title="RustCraft"
        redirect-url="rustcraft"
        logo-img="/content/rustcraft/logo_hd.png"
        :tags="['ECS', '3D Rendering', 'Rust', 'High Performance']"
        description="RustCraft is a <u>from scratch</u> modern
  alternative to the official Minecraft client. Written in Rust and using
  wgpu-rs it focuses on delivering <u>high performance</u> voxel rendering. It features
  an Entity Component System (ECS) based rendering system, threaded networking,
  mesh building, asset management, <u>render engine</u> and AABB physics engine
  providing blazing fast performance."
        button-title="View Mid Project Review"
        :button-callback="
          () => {
            windowInstance.open('', '_blank');
          }
        "
        video-url="/content/rustcraft/video_nointro_1920x1080.mp4"
        cover-url="/content/rustcraft/Cover.webp"
        picture-link="https://github.com/darkzek/rustcraft"
        color="#ff000d"
      >
        <template v-slot:title>
          <rustcraft-title-animation />
        </template>
      </project-entry>
    </div>
    <br />
    <div ref="flixr">
      <project-entry
        background-img="/img/Flixr.webp"
        title="Flixrapp"
        redirect-url="flixr"
        :tags="['Vue.js', 'mySQL', 'Docker']"
        description="Flixr started as a frustration with managing tv show notifications
            for so many different streaming platforms. It collates data from
            <u>online API's</u> to provide one succinct user interface for subscribing to
            TV show release's. It uses a custom <u>password-less</u> authentication
            solution to accommodate frictionless on-boarding."
        button-title="View Project Gitlab"
        :button-callback="
          () => {
            windowInstance.open('https://gitlab.com/darkzek/flixr', '_blank');
          }
        "
        video-url="/content/flixr/video_1920x1080.mp4"
        cover-url="/content/flixr/Cover.webp"
        picture-link="https://gitlab.com/darkzek/flixr"
        color="#7782d2"
      >
        <template v-slot:title>
          <flixr-title-animation />
        </template>
      </project-entry>
    </div>
    <br />
    <div ref="mobingo">
      <project-entry
        background-img="/img/Mobingo.webp"
        title="Mobingo"
        redirect-url="mobingo"
        :tags="['Vue.js', 'Professional', 'Payment Providers']"
        description="Mobingo is a white-label Online Gaming Platform made for Alabama customers by Ruby Play Network. It is a <u>commercial level</u> application developed for an in person bingo hall. It supports accepting Donations through <u>Payment Providers</u>, faciliates online gaming, provides rewards and jackpots."
        button-title="View Project Writeup"
        :button-callback="
          () => {
            windowInstance.open('https://gitlab.com/darkzek/flixr', '_blank');
          }
        "
        video-url="/content/mobingo/video_1920x1080.mp4"
        cover-url="/content/mobingo/Cover.webp"
        picture-link="https://gitlab.com/darkzek/flixr"
        color="#f7941d"
      >
        <template v-slot:title>
          <mobingo-title-animation />
        </template>
      </project-entry>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProjectEntry from "./ProjectEntry.vue";
import RustcraftTitleAnimation from "./titles/RustcraftTitleAnimation.vue";
import FlixrTitleAnimation from "./titles/FlixrTitleAnimation.vue";
import MobingoTitleAnimation from "./titles/MobingoTitleAnimation.vue";
import { nextTick, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

let windowInstance = window;

const rustcraft = ref<HTMLElement>();
const flixr = ref<HTMLElement>();
const mobingo = ref<HTMLElement>();

const scrollOffset = -50;

function updateScroll() {
  switch (route.hash) {
    case "#rustcraft":
      // Scroll to rustcraft
      window.scrollTo(0, rustcraft.value!.getBoundingClientRect().y + scrollOffset);
      break;
    case "#flixr":
      window.scrollTo(0, flixr.value!.getBoundingClientRect().y + scrollOffset);
      break;
    case "#mobingo":
      window.scrollTo(0, mobingo.value!.getBoundingClientRect().y + scrollOffset);
      break;
  }
}

nextTick(() => {
  updateScroll();
});
</script>

<style scoped lang="scss"></style>
