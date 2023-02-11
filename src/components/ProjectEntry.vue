<template>
  <div class="project">
    <div
      class="background"
      style="background-image: url('/img/Rustcraft.webp')"
    ></div>
    <div class="row">
      <div class="info">
        <div class="row title">
          <img src="/content/rustcraft/logo_hd.png" />
          <a>Rustcraft</a>
        </div>
        <div class="tags">
          <div style="background-color: #ff000d38">ECS</div>
          <div style="background-color: #ff000d38">3D Rendering</div>
          <div style="background-color: #ff000d38">Rust</div>
          <div style="background-color: #ff000d38">High Performance</div>
        </div>
        <div class="description">
          <p>
            RustCraft is a from scratch modern alternative to the official
            Minecraft client. Written in Rust and using wgpu-rs it focuses on
            delivering high performance voxel rendering. It features an Entity
            Component System (ECS) based rendering system, threaded networking,
            mesh building, asset management, render engine and AABB physics
            engine providing blazing fast performance.
          </p>
        </div>
        <div class="button" style="background-color: #ff000d38">
          <a>View Mid Project Review</a>
        </div>
      </div>
      <div class="graphics">
        <project-slide
          url="/content/rustcraft/video_nointro_1920x1080.mp4"
        ></project-slide>
        <a href="https://github.com/darkzek/rustcraft" target="_blank"
          ><img src="/content/rustcraft/Github.png"
        /></a>
      </div>
    </div>
  </div>
  <div class="project">
    <div
      class="background"
      style="background-image: url('/img/Flixr.webp')"
    ></div>
    <div class="row">
      <div class="info">
        <div class="row title">
          <img src="/content/flixr/favicon.png" />
          <a>Flixrapp</a>
        </div>
        <div class="tags">
          <div style="background-color: rgba(119, 130, 210, 0.5)">Vue.JS</div>
          <div style="background-color: rgba(119, 130, 210, 0.5)">mySQL</div>
          <div style="background-color: rgba(119, 130, 210, 0.5)">Docker</div>
        </div>
        <div class="description">
          <p>
            Flixr started as a frustration with managing tv show notifications
            for so many different streaming platforms. It collates data from
            online API's to provide one succinct user interface. It uses a
            custom password-less authentication solution to accommodate
            frictionless on-boarding.
          </p>
        </div>
        <div class="button" style="background-color: rgba(119, 130, 210, 0.5)">
          <a href="https://gitlab.com/darkzek/flixr" target="_blank"
            >View Project GitHub</a
          >
        </div>
      </div>
      <div class="graphics">
        <project-slide url="/content/flixr/video_1920x1080.mp4"></project-slide>
        <a href="https://gitlab.com/darkzek/flixr" target="_blank"
          ><img src="/content/flixr/Cover.png"
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
  height: 650px;
  aspect-ratio: calc(1280 / 800);
  max-width: 100vw;

  > .row {
    position: relative;
    justify-content: space-between;
  }

  .background {
    position: fixed;
    z-index: -1;
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
    max-width: 800px;
    margin-top: 80px;
  }

  .graphics {
    width: 30vw;
    flex-grow: 1;
    max-width: 500px;
    padding-top: 30px;
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

    div {
      display: inline-block;
      color: white;
      backdrop-filter: blur(5px);
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

.button {
  margin-top: 20px;
  backdrop-filter: blur(5px);
  display: inline-block;
  padding: 10px 30px;
  border-radius: 30px;
  cursor: pointer;

  a {
    color: white;
    font-size: 18px;
    text-decoration: none;
  }
}
</style>
