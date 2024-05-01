<template>
  <div
    class="parent"
    @click="pause"
    ref="parentDom"
  >
    <div class="inner" :style="loading ? 'visibility: invisible; position: absolute' : undefined">
      <video :src="props.url" muted ref="blurVideoObj" class="blur" />
      <video :src="props.url" @loadeddata="startPlaying" muted ref="videoObj" />
    </div>
    <img :src="coverUrl" v-if="loading" />
    <div
      class="overlay"
    >
      <div v-if="paused || loading" class="paused">
        <sync-icon v-if="loading" :size="48" />
        <pause-icon v-else :size="48" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import PauseIcon from "vue-material-design-icons/Pause.vue";
import SyncIcon from "vue-material-design-icons/Sync.vue";

let paused = ref(true);
let videoObj = ref<HTMLVideoElement>();
let blurVideoObj = ref<HTMLVideoElement>()
let loading = ref(true);
let parentDom = ref<HTMLElement>();

let props = defineProps<{
  url: string;
  coverUrl: string;
}>();

watch(paused, (val) => {
  if (val) {
    videoObj.value?.pause();
    blurVideoObj.value?.pause();
  } else {
    videoObj.value?.play();
    blurVideoObj.value?.play();
  }
})

function startPlaying() {
  loading.value = false;
}

function pause() {
  paused.value = !paused.value;
}

let visible = ref(false);

document.addEventListener('scroll', onScroll)

function onScroll() {
  if (parentDom.value == undefined) {
    return;
  }
  let rect = parentDom.value!.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  if (visible.value != isVisible) {
    visible.value = isVisible;

    paused.value = !visible.value;
  }
}
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  border-radius: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
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

  .progress {
    background-color: rgba(0, 0, 0, 0.3);
    height: 4px;
    position: absolute;
    bottom: 0px;
  }

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
}

.blur {
  position: absolute;
  filter: blur(24px) contrast(180%);
}
</style>
