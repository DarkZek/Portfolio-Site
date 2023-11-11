<template>
  <a class="title" @click="router.push('/')" @keydown.enter="router.push('/')" tabindex="0">
    <template v-for="(_, i) in 14" :key="i">
      <span
        :char="i"
        :style="charStyle[i]"
        @animationend="($event.target as any)?.classList.add('done')"
        v-if="splitText[i] != '\n'"
        >{{ splitText[i] }}</span
      >
      <br v-else />
    </template>
  </a>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter();

let props = defineProps<{
  fontSize?: number;
  text: string;
}>();

let splitText = computed(() => props.text.split(""));

// Static X, Static Y, Dynamic Y
let offsets = ref(new Array(props.text.length).fill(0).map(() => [0,0,0]));

let moveVelocity = 0;

// How much we will scroll the background this frame
let timeOffset = ref(0);
let prevScroll = window.scrollY;

setInterval(() => {
  if (Math.abs(moveVelocity) > 0.1) {
    timeOffset.value += moveVelocity / 5;
    moveVelocity *= 0.9995;
  } else {
    moveVelocity = 8;;
  }
}, 1000 / 30);

let charStyle = computed(() => {
  return offsets.value.map((offset, index) => {
    return `
      background-position-x: ${-offset[0]}px;
      background-position-y: ${-offset[1] - offset[2] + timeOffset.value}px;
      font-size: ${props.fontSize ?? 60}px;`;
  });
});

document.addEventListener("scroll", (e) => {
  moveVelocity = Math.min(10, Math.max(-10, window.scrollY - prevScroll));
  prevScroll = window.scrollY;
});

function updateHorizontalOffset() {
  for (let i = 0; i < props.text.length; i++) {
    let object = document.querySelector(`span[char="${i}"]`) as any;
    if (object) {
      offsets.value[i][0] = object.offsetLeft;
    }
  }
}

watch(
  () => props.fontSize,
  () => {
    updateHorizontalOffset();
  }
);

nextTick(() => {
  document.fonts.ready.then(() => {
    updateHorizontalOffset();
  });
});
</script>

<style scoped lang="scss">
.title {
  display: block;
  cursor: pointer;

  &:deep(span) {
    color: transparent;
    position: unset;
    animation: 1s ease-out;
    animation-timing-function: cubic-bezier(0.47, -0.08, 0.13, 0.99);
    background-image: url(/img/background_tiled.jpg);
    background-repeat: repeat-y;
    background-size: 1000px;
    font-weight: 600;
    background-clip: text;
    -webkit-background-clip: text;
    color: rgba(0, 0, 0, 0.2);
    font-family: "Poppins", sans-serif;
    display: inline-block;
    opacity: 0;
    white-space: pre;
  }

  &:deep(span:not(.done)) {
    animation-name: topAnimation;
  }

  &:deep(.done) {
    opacity: 1;
  }

  &:hover :deep(span) {
    animation: hueRotate 1s ease-out infinite;
  }
}

@for $i from 0 through 50 {
  .title :deep(span)[char="#{$i}"] {
    animation-delay: #{(0.05 * $i) + 0.2}s;
  }
}

@keyframes hueRotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
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
