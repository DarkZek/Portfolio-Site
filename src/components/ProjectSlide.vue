<template>
  <div
    class="parent"
    :style="`aspect-ratio: ${videoAspect}`"
    ref="parentDom"
    @click="pauseCommand = !pauseCommand"
  >
    <div :id="uniqueId" class="inner" :style="innerStyle"></div>
    <div
      class="overlay"
      :style="`width: ${parentWidth}px; height: ${
        parentWidth / videoAspect
      }px;`"
    >
      <div class="progress" :style="`width: ${progress * 100}%;`"></div>
      <div v-if="paused" class="paused">
        <pause-icon size="48px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed } from "vue";
// @ts-ignore
import { p5 } from "p5js-wrapper";
import PauseIcon from "vue-material-design-icons/Pause.vue";

let uniqueId = Math.random().toString().substring(2);

let displayed = ref(false);

let props = defineProps<{
  url: string;
}>();

document.addEventListener("keydown", () => {
  displayed.value = !displayed.value;
});

let parentWidth = ref(229);
let parentDom = ref<HTMLElement>();

nextTick(() => {
  new ResizeObserver((e) => {
    parentWidth.value = e[0].target.clientWidth;
  }).observe(parentDom.value!);
});

let pauseCommand = ref(false);

let paused = ref(false);

let vid: any;

let padding = 80;
let doublePadding = padding * 2;

let videoPadding = 80;

let videoAspect = 1920 / 1080;

let progress = ref(0);

let innerStyle = computed(() => {
  return `margin-top: -${padding}px; margin-left: -${padding}px;`;
});
setTimeout(() => {
  let currentWidth = parentWidth.value;

  //const P5 = new p5(() => name);
  let sketch1 = new p5((p: any) => {
    p.setup = () => {
      p.createCanvas(
        parentWidth.value + doublePadding,
        parentWidth.value / videoAspect + doublePadding
      );

      vid = p.createVideo(props.url, () => {
        vid.elt.style.top = `${videoPadding}px`;
        vid.elt.style.left = `${videoPadding}px`;
      });
      vid.volume(0);
      vid.loop();
      vid.size(parentWidth.value, parentWidth.value / videoAspect);
    };
    p.draw = () => {
      p.clear();

      if (currentWidth != parentWidth.value) {
        currentWidth = parentWidth.value;
        p.resizeCanvas(
          parentWidth.value + doublePadding,
          parentWidth.value / videoAspect + doublePadding
        );
        vid.size(parentWidth.value, parentWidth.value / videoAspect);
      }

      let img = vid.get();
      p.image(img, padding, padding); // redraws the video frame by frame in

      p.drawingContext.filter = "contrast(180%) blur(32px)";
      p.image(img, padding, padding); // redraws the video frame by frame in

      progress.value = vid.elt.currentTime / vid.elt.duration;

      if (pauseCommand.value != paused.value) {
        paused.value = pauseCommand.value;
        if (paused.value) {
          vid.pause();
        } else {
          vid.play();
        }
      }
    };
  }, uniqueId);
}, 200);
</script>

<style lang="scss" scoped>
video {
  width: 800px;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.inner {
  width: 900px;
  height: 500px;
  position: absolute;

  :deep(canvas) {
    transform: scaleX(0.95) scaleY(0.9);
    opacity: 0.8;
  }

  :deep(video) {
    position: absolute;
    border-radius: 10px;
    overflow: hidden;
    transition: opacity 0.4s ease-in;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
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
  max-width: min(100%, 400px);
  max-height: 100%;
  width: 100%;
  flex-grow: 1;
}
</style>
