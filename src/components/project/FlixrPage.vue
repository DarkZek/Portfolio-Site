<template>
  <div class="content">
    <div class="background"></div>
    <div>
      <div class="back" @click.stop="router.push('/#flixr')">
        <font-awesome-icon icon="fa-solid fa-chevron-left" class="icon" />
      </div>
      <h1><img src="/content/flixr/favicon.png">Flixr</h1>
    </div>
    <div class="demo" ref="demo" style="--size: 800px">
      <div class="browser">
        <img src="/content/flixr/page.jpeg" />
      </div>
      <img src="/img/macbook.png" />
      <a class="title">flixrapp.com</a>
    </div>
    <div class="text">
      <p>
        Flixr started as a frustration with managing new show notifications for
        so many different streaming platforms. I decided to solve that problem
        with a centralised repository for storing shows you've watched so that
        you can reminded each and every time a new season releases. It has
        since gained more functionality such as downloading wallpaper packs with
        screenshots from your content.
      </p>
      <a href="https://gitlab.com/darkzek/flixr" target="_blank" class="button">Check it out on GitLab
        <font-awesome-icon icon="fa-solid fa-chevron-right" class="icon" /></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const demo = ref<HTMLDivElement>();

function updateDemoSize() {
  if (demo.value) {
    let width = window.screen.width;

    width *= 0.8;

    if (width > 800) {
      width = 800;
    }

    demo.value.style.setProperty('--size', `${width}px`);
  }
}

nextTick(updateDemoSize);
window.addEventListener('resize', updateDemoSize);

</script>

<style scoped lang="scss">
$iphonePadding: 4.5%;
$iphonePaddingTop: 30%;
$aspectRatio: 1.72;

.content {
  padding: 0px 80px;
  max-width: 1160px;
  font-size: 18px;
  line-height: 1.6;
  color: white;
  margin: auto;
  margin-top: 180px;
  min-height: 50vh;
  display: flex;
  flex-direction: column;

  .demo {
    min-width: var(--size);
    max-width: var(--size);
    min-height: calc(var(--size) / $aspectRatio);
    max-height: calc(var(--size) / $aspectRatio);
    container-type: inline-size;
    align-self: center;

    img {
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      pointer-events: none;
    }

    .title {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      margin-top: 2.9%;
      color: #8b8b8b;
      text-align: center;
      font-size: .6cqw;
    }

    .browser {
      position: absolute;
      border: none;
      width: 78%;
      height: 81%;
      margin-left: 11%;
      margin-top: 4.5%;
      background-color: white;
      overflow-y: scroll;
    
      img {
        width: 100%;
      }
    }
  }

  .text {
    text-align: center;
  }
}

h1 {
  text-align: center;
  margin-bottom: 100px;

  img {
    width: 50px;
    margin-bottom: -8px;;
    margin-right: 20px;
  }
}

// When screen size is mobile
@media screen and (max-width: 800px) {
  .content {
    padding: 20px 20px;
  }
  .back {
    left: -5px;
  }
}

.button {
  border: 2px solid #FCA326;
  border-radius: 10px;
  align-self: center;
  padding: 8px 40px;
  color: white;
  text-decoration: none;
  transition: border-color 0.2s ease-in-out;

  .icon {
    font-size: 1.0rem;
    margin-bottom: 2px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    border-color: #FC6D26;
  }

  &:hover .icon {
    transform: translateX(5px);
  }
}

p {
  margin: 60px 0px;
}

.background {
  position:fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url("/content/flixr/Background.png");
  background-size: cover;
  z-index: -1;
}

@media screen and (max-width: 600px) {
  .back {
    display: none;
  }
}

.back {
  position: absolute;
  padding: 10px;
  border-radius: 40px;
  width: 60px;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.2s ease-in-out;
  top: 10px;

  &:hover {
    background-color: rgba(200, 200, 200, 0.15);
  }
}
</style>
