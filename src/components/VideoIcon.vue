<template>
  <div
    class="icon"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
    tabindex="0"
    @focus="mouseover"
    @blur="mouseleave"
    @click="clicked"
    @keydown.enter="clicked"
  >
    <video
      tabindex="-1"
      ref="video_forwards"
      :src="props.src + '_for.webm'"
      muted
      @ended="playing = false"
      forwards
      v-show="!reversed"
    ></video>
    <video
      tabindex="-1"
      ref="video_reversed"
      :src="props.src + '_rev.webm'"
      muted
      @ended="playing = false"
      reversed
      v-show="reversed"
    ></video>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let props = defineProps<{
  src: String;
  link: String;
}>();

let playing = ref(false);
let reversed = ref(false);
let hovered = ref(false);

let video_reversed = ref<HTMLVideoElement>();
let video_forwards = ref<HTMLVideoElement>();

function play() {
  playing.value = true;
  if (reversed.value) {
    video_reversed.value?.play();
  } else {
    video_forwards.value?.play();
  }
}

function mouseover() {
  if (hovered.value) {
    return;
  }
  reversed.value = false;
  play();
  hovered.value = true;
}

function mouseleave() {
  if (!hovered.value) {
    return;
  }
  reversed.value = true;
  play();
  hovered.value = false;
}

function clicked() {
  window.open(props.link as string, "_blank");
}
</script>

<style scoped>
.icon {
  cursor: pointer;
}
video {
  width: 100%;
}
</style>
