<template>
  <div class="content">
    <div class="background"></div>
    <h1><img src="/content/flixr/favicon.png">Flixr</h1>
    <div class="demo" style="--size: 800px">
      <iframe src="https://flixrapp.com" ref="iframe"></iframe>
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

import { ref } from 'vue';

const iframe = ref<HTMLIFrameElement>();

function refresh() {
  if (iframe.value) {
    // eslint-disable-next-line no-self-assign
    iframe.value.src = iframe.value.src;
  }
}

</script>

<style scoped lang="scss">
$iphonePadding: 4.5%;
$iphonePaddingTop: 30%;
$aspectRatio: 1.72;
$scale: 0.5;

.content {
  padding: 0px 80px;
  max-width: 1160px;
  font-size: 24px;
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

    iframe {
      position: absolute;
      border: none;
      width: calc(78% / $scale);
      height: calc(81% / $scale);
      margin-left: 11%;
      margin-top: 4.5%;
      transform: scale($scale);
      -webkit-transform-origin: 0 0;
      background-color: white;
    }
  }

  .text {
    padding-left: 40px;
  }
}

h1 {
  text-align: center;
  margin-bottom: 150px;

  img {
    width: 50px;
    margin-bottom: -8px;;
    margin-right: 20px;
  }
}

.button {
  background-color: #FCA326;
  border-radius: 10px;
  padding: 8px 40px;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  .icon {
    font-size: 1.0rem;
    margin-bottom: 2px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    background-color: #FC6D26;
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
</style>
