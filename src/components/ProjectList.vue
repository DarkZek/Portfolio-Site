<template>
  <div class="project">
    <div class="background"></div>
    <div class="row">
      <div class="info">
        <div class="row title">
          <img src="/content/rustcraft/logo_hd.png" />
          <a>Rustcraft</a>
        </div>
        <div class="tags">
          <a>ECS</a>
          <a>3D Rendering</a>
          <a>Rust</a>
          <a>High Performance</a>
        </div>
        <div class="description">
          <p>
            RustCraft is a from scratch modern alternative to the official
            minecraft client. Written in Rust and using wgpu-rs it focuses on
            delivering high performance voxel rendering. It features an Entity
            Component System (ECS) based rendering system, threaded networking,
            mesh building, asset management, render engine and AABB physics
            engine providing blazing fast performance.
          </p>
        </div>
        <div class="button">
          <a>View Mid Project Review</a>
        </div>
      </div>
      <div class="graphics">
        <project-slide></project-slide>
        <a href="https://github.com/darkzek/rustcraft" target="_blank"
          ><img src="/content/rustcraft/Github.png"
        /></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProjectSlide from "./ProjectSlide.vue";
</script>

<style scoped lang="scss">
.project {
  width: 100vw;
  height: 800px;
  aspect-ratio: calc(1280 / 800);
  max-width: 100vw;

  > .row {
    position: relative;
  }

  .background {
    background-image: url("/img/Rustcraft.webp");
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100vw;
    opacity: 0.4;
    aspect-ratio: calc(1280 / 800);
    background-size: cover;
  }

  .info {
    width: 70%;
    padding: 0px 40px 0px 80px;
    max-width: 1000px;
    margin-top: 80px;
  }

  .graphics {
    width: 30vw;
    flex-grow: 1;
    max-width: 600px;
  }
}

.info {
  color: white;

  .title {
    font-size: 40px;
    margin-bottom: 20px;

    img {
      width: 60px;
      margin-right: 20px;
    }
  }

  .tags {
    margin-bottom: 20px;

    a {
      color: white;
      background-color: red;
      padding: 3px 12px;
      border-radius: 20px;
      margin-right: 10px;
      word-wrap: none;
    }
  }

  .description {
    font-size: 22px;
  }
}

.graphics {
  padding-right: 60px;

  > * {
    margin-top: 50px;
    display: block;
  }

  img {
    width: 100%;
    border-radius: 10px;
  }
}
</style>
