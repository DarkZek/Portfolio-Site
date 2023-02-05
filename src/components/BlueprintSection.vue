<template>
  <div class="section">
    <div class="background" :style="`background-position-y: ${scroll}px`"></div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let scroll = ref(0);

window.addEventListener("scroll", () => {
  scroll.value = window.scrollY;
});
</script>

<style lang="scss" setup>
.section {
  width: 500px;
  aspect-ratio: calc(357 / 332);
  background-image: url("/img/BlueprintBackground.png");
  background-size: cover;
  position: absolute;
  right: 0px;
  top: 40vh;

  .background {
    background-image: url("/img/BlueprintGrid.png");
    width: 100%;
    height: 100%;
    opacity: 0.2;
    -webkit-mask-image: url("/img/BlueprintBackground.png");
    -webkit-mask-size: cover;
    position: absolute;
  }

  .content {
    background-image: url("/img/BlueprintContent.svg");
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
