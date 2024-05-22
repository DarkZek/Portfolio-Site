<template>
  <div class="rustcraft-title-animation">
    <div class="row">
      <div class="logo-parent">
        <video src="/img/flixr.webm" disableRemotePlayback muted ref="video"></video>
      </div>
      <div class="title">
        <span>Flixrapp</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let video = ref<HTMLVideoElement & HTMLElement>();

function tryPlayAnimation() {
  if (video.value === undefined) {
    return;
  }

  let distanceFromTop = video.value.getBoundingClientRect().top;
  let percentageFromTop = distanceFromTop / window.innerHeight;

  if (percentageFromTop < 0.70 && percentageFromTop > 0.15) {
    // Play
    video.value.play();
    document.removeEventListener('scroll', tryPlayAnimation);
  }
}

// Play when passed bottom 1/3 of screen
document.addEventListener('scroll', tryPlayAnimation, { passive: true });

</script>

<style lang="scss" scoped>
.logo-parent {
  width: 60px;
  height: 60px;
  margin-right: 20px;

  video {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
}
.title {
  font-size: 40px;
  margin-bottom: 20px;
}
</style>
