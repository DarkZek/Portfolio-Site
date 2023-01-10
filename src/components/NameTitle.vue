<template>
  <div>
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
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";

let text = [
  "M",
  "a",
  "r",
  "s",
  "h",
  "a",
  "l",
  "l",
  "\n",
  "S",
  "c",
  "o",
  "t",
  "t",
];

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
  [0, 280, 0],
  [0, 280, 0],
  [0, 280, 0],
  [0, 280, 0],
  [0, 280, 0],
]);

let charStyle = computed(() => {
  return offsets.value.map((offset, index) => {
    return `background-position-x: ${-offset[0]}px;background-position-y: ${
      -offset[1] - offset[2]
    }px;`;
  });
});

document.addEventListener("scroll", (e) => {
  offsets.value.forEach((offset, index) => {
    offset[2] = window.scrollY / 4;
  });
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

.title :deep(span) {
  color: transparent;
  position: unset;
  margin-top: 80px;
  animation: 1s ease-out;
  animation-timing-function: cubic-bezier(0.47, -0.08, 0.13, 0.99);
  background-image: url(./img/background.jpg);
  background-repeat: no-repeat;
  background-size: 1200px;
  font-size: 260px;
  font-weight: 600;
  line-height: 280px;
  background-clip: text;
  -webkit-background-clip: text;
  color: rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  display: inline-block;
  opacity: 0;
}

.title :deep(.done) {
  opacity: 1;
}

@for $i from 0 through 14 {
  .title :deep(span)[char="#{$i}"] {
    animation-delay: #{(0.05 * $i) + 1}s;
  }
}

@for $i from 0 through 8 {
  .title :deep(span)[char="#{$i}"] {
    animation-name: topAnimation;
  }
}

// Top row
@for $i from 9 through 14 {
  .title :deep(span)[char="#{$i}"] {
    animation-name: bottomAnimation;
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

@keyframes bottomAnimation {
  0% {
    transform: translateY(-100px);
    background-position-y: -180px;
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    background-position-y: -280px;
    opacity: 1;
  }
}
</style>
