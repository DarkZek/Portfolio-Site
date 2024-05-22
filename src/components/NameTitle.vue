<template>
  <a
    class="title"
    @click.prevent="router.push('/')"
    @keydown.enter="router.push('/')"
    tabindex="0"
    href="/"
    aria-label="Marshall Scott"
  >
    <template v-for="(_, i) in 14" :key="i">
      <span :char="i" :style="charStyle[i]" v-if="splitText[i] != '\n'">{{
        splitText[i]
      }}</span>
      <br v-else />
    </template>
  </a>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let props = defineProps<{
  fontSize?: number;
  text: string;
}>();

let splitText = computed(() => props.text.split(""));

// X positions of letters to align them to background
let offsets = ref(new Array(props.text.length).fill(0).map(() => 0));

let charStyle = computed(() => {
  return offsets.value.map((offset) => {
    return `
      background-position-x: ${-offset}px;
      font-size: ${props.fontSize ?? 60}px;`;
  });
});

function updateHorizontalOffset() {
  for (let i = 0; i < props.text.length; i++) {
    let object = document.querySelector(`span[char="${i}"]`) as any;
    if (object) {
      offsets.value[i] = object.offsetLeft;
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
@property --css-vertical-offset {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}

.title {
  display: block;
  cursor: pointer;

  &:deep(span) {
    color: transparent;
    position: unset;
    animation: topAnimation 1s ease-out;
    animation-timing-function: cubic-bezier(0.47, -0.08, 0.13, 0.99);
    background-image: url(/img/name_background.webp);
    background-repeat: repeat-y;
    background-size: 500px;
    font-weight: 600;
    background-clip: text;
    -webkit-background-clip: text;
    color: rgba(0, 0, 0, 0.2);
    font-family: "Poppins", sans-serif;
    display: inline-block;
    filter: saturate(1.1);
    opacity: 0;
    animation-fill-mode: forwards;
    white-space: pre;
  }

  &:hover :deep(span) {
    filter: saturate(1.2);
    text-shadow: 0px 0px 15px rgba(236, 236, 236, 0.274);
  }
}

@for $i from 0 through 50 {
  .title :deep(span)[char="#{$i}"] {
    animation-delay: #{(0.03 * $i) + 0.2}s;
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
    transform: translateY(-100px) translatez(0);
    background-position-y: 0px;
    opacity: 0;
  }
  100% {
    transform: translateY(0px) translatez(0);
    background-position-y: -100px;
    opacity: 1;
  }
}
</style>
