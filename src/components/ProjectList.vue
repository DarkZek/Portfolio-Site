<template>
  <project-entry
    background-img="/img/Rustcraft.webp"
    title="RustCraft"
    logo-img="/content/rustcraft/logo_hd.png"
    :tags="['ECS', '3D Rendering', 'Rust', 'High Performance']"
    description="RustCraft is a from scratch modern
  alternative to the official Minecraft client. Written in Rust and using
  wgpu-rs it focuses on delivering high performance voxel rendering. It features
  an Entity Component System (ECS) based rendering system, threaded networking,
  mesh building, asset management, render engine and AABB physics engine
  providing blazing fast performance."
    button-title="View Mid Project Review"
    :button-callback="
      () => {
        windowInstance.open('', '_blank');
      }
    "
    video-url="/content/rustcraft/video_nointro_1920x1080.mp4"
    picture-url="/content/rustcraft/Github.png"
    picture-link="https://github.com/darkzek/rustcraft"
    color="#ff000d"
  />
  <project-entry
    background-img="/img/Flixr.webp"
    title="Flixrapp"
    logo-img="/content/flixr/favicon.png"
    :tags="['Vue.js', 'mySQL', 'Docker']"
    description="Flixr started as a frustration with managing tv show notifications
            for so many different streaming platforms. It collates data from
            online API's to provide one succinct user interface. It uses a
            custom password-less authentication solution to accommodate
            frictionless on-boarding."
    button-title="View Project Gitlab"
    :button-callback="
      () => {
        windowInstance.open('https://gitlab.com/darkzek/flixr', '_blank');
      }
    "
    video-url="/content/flixr/video_1920x1080.mp4"
    picture-url="/content/flixr/Cover.png"
    picture-link="https://gitlab.com/darkzek/flixr"
    color="#7782d2"
  />
</template>

<script lang="ts" setup>
import ProjectEntry from "./ProjectEntry.vue";

let windowInstance = window;
</script>

<style scoped lang="scss"></style>
