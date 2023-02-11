<template>
  <a class="title">
    <template v-for="(_, i) in 14" :key="i">
      <span
        :char="i"
        :style="charStyle[i]"
        @animationend="($event.target as any)?.classList.add('done')"
        v-if="text[i] != '\n'"
        >{{ text[i] }}</span
      >
      <br v-else />
    </template>
  </a>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";

let text = ["M", "a", "r", "s", "h", "a", "l", "l"];

// Static X, Static Y, Dynamic Y
let offsets = ref([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]);

let moveVelocity = 0;

let timeOffset = ref(0);
let prevScroll = 0;

setInterval(() => {
  timeOffset.value += moveVelocity;
  moveVelocity *= 0.98;
}, 1000 / 20);

let charStyle = computed(() => {
  return offsets.value.map((offset, index) => {
    return `background-position-x: ${-offset[0]}px;background-position-y: ${
      -offset[1] - offset[2] + timeOffset.value
    }px;`;
  });
});

document.addEventListener("scroll", (e) => {
  moveVelocity = Math.min(5, Math.max(-5, window.scrollY - prevScroll));
  prevScroll = window.scrollY;
});

nextTick(() => {
  document.fonts.ready.then(() => {
    for (let i = 0; i < 13; i++) {
      let object = document.querySelector(`span[char="${i}"]`) as any;
      if (object) {
        offsets.value[i][0] = object.offsetLeft;
      }
    }
  });
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

.title {
  height: 90px;
  display: block;
  margin-top: -10px;

  &:deep(span) {
    color: transparent;
    position: unset;
    animation: 1s ease-out;
    animation-timing-function: cubic-bezier(0.47, -0.08, 0.13, 0.99);
    background-image: url(./img/background_tiled.jpg);
    background-repeat: repeat-y;
    background-size: 1200px;
    font-size: 60px;
    font-weight: 600;
    background-clip: text;
    -webkit-background-clip: text;
    color: rgba(0, 0, 0, 0.2);
    font-family: "Poppins", sans-serif;
    display: inline-block;
    opacity: 0;
  }

  &:deep(.done) {
    opacity: 1;
  }
}

@for $i from 0 through 14 {
  .title :deep(span)[char="#{$i}"] {
    animation-delay: #{(0.05 * $i) + 1}s;
    animation-name: topAnimation;
  }
}

@keyframes topAnimation {
  0% {
    transform: translateY(-100px);
    background-position-y: 100px;
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    background-position-y: 0px;
    opacity: 1;
  }
}
</style>
