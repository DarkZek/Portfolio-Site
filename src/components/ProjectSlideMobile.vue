<template>
  <div class="parent" @click="pause">
    <div
      class="inner"
      v-if="displayed || loading"
      :style="loading ? 'visibility: invisible; position: absolute' : undefined"
    >
      <video
        :src="props.url"
        @playing="startPlaying"
        autoplay
        muted
        loop
        ref="videoObj"
      />
    </div>
    <img :src="coverUrl" v-if="!displayed" :alt="props.alt" />
    <div class="overlay">
      <div v-if="paused || loading" class="paused">
        <loading-icon v-if="loading" style="width: 64px" />
        <pause-icon v-else :size="48" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import PauseIcon from "vue-material-design-icons/Pause.vue";
import LoadingIcon from "./LoadingIcon.vue";

let displayed = ref(false);
let paused = ref(true);
let videoObj = ref<HTMLVideoElement>();
let loading = ref(false);

let props = defineProps<{
  url: string;
  coverUrl: string;
  alt: string;
}>();

watch(paused, (val) => {
  if (val) {
    videoObj.value?.pause();
  } else {
    videoObj.value?.play();
  }
});

function startPlaying() {
  loading.value = false;
  paused.value = false;
  displayed.value = true;
}

function pause() {
  if (!displayed.value) {
    loading.value = true;
    return;
  }

  paused.value = !paused.value;
}
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  border-radius: 10px;
}

.inner {
  display: flex;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  transition: opacity 0.4s ease-in;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  .paused {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;

    span {
      color: rgba(255, 255, 255, 0.6);
      user-select: none;
    }
  }
}

.parent {
  max-width: 800px;
  max-height: 100%;
  width: 100%;
}

img {
  width: 100%;
  border-radius: 10px;
  display: flex;
}
</style>
