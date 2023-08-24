<template>
  <div class="content">
    <div class="demo" style="--size: 400px">
      <iframe src="https://flixrapp.com" ref="iframe"></iframe>
      <img src="/img/iphone.png" />
      <a class="title">flixrapp.com</a>
      <div class="refresh" tabindex="0" @click="refresh"></div>
    </div>
    <div class="text">
      <h1>Flixr</h1>
      <p>
        Flixr started as a frustration with managing new show notifications for
        so many different streaming platforms. I decided to solve that problem
        with a centralised repository for storing shows you've watched so that
        you can reminded each and every time a new season releases. It has
        since gained more functionality such as downloading wallpaper packs with
        screenshots from your content.
      </p>
      <h4>Tech Stack</h4>
      <ul>
        <li>mySQL</li>
        <li>PHP 7.0</li>
        <li>Laravel Framework</li>
        <li>Nginx</li>
        <li>Docker</li>
        <li>Rust</li>
        <li>VueJS</li>
      </ul>
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
  flex-direction: row;

  .demo {
    min-width: var(--size);
    max-width: var(--size);
    min-height: calc(var(--size) / 0.48733153638);
    max-height: calc(var(--size) / 0.48733153638);
    container-type: inline-size;

    img {
      width: 100%;
      position: absolute;
      left: 0px;
      pointer-events: none;
    }

    .title {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      margin-top: 18.5%;
      color: #0f0f0f;
      text-align: center;
      font-size: 4.6cqw;
    }

    .refresh {
      position: absolute;
      position: absolute;
      right: 8%;
      top: 0px;
      margin-top: 18.5%;
      width: 7%;
      aspect-ratio: 1;
      border-radius: 100%;
      cursor: pointer;
    }

    iframe {
      border: none;
      border-radius: 0 0 10% 10%;
      overflow: hidden;
      width: calc(100% - ($iphonePadding * 2));
      height: calc(100% - $iphonePaddingTop / 2);
      margin-left: $iphonePadding;
      margin-top: $iphonePaddingTop;
      overflow: hidden;

      &::-webkit-scrollbar {
        width: 10px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: rgb(41, 41, 41);
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #474747;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #5a5a5a;
      }
    }
  }

  .text {
    padding-left: 40px;
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
</style>
