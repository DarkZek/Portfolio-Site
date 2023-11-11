<template>
  <div
    class="parent"
    :style="`aspect-ratio: ${videoAspect}`"
    ref="parentDom"
    @click="pauseCommand = !pauseCommand"
  >
    <img :src="coverUrl" v-if="!displayed" />
    <div :id="uniqueId" class="inner" :style="innerStyle"></div>
    <div
      class="overlay"
      :style="`width: ${parentWidth}px; height: ${
        parentWidth / videoAspect
      }px;`"
    >
      <div class="progress" :style="`width: ${progress * 100}%;`"></div>
      <div v-if="paused" class="paused">
        <pause-icon :size="48" />
      </div>
      <div v-if="!displayed" class="paused" @click.stop="displayed = true">
        <pause-icon :size="48" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed, watch } from "vue";
// @ts-ignore
import { p5 } from "p5js-wrapper";
import PauseIcon from "vue-material-design-icons/Pause.vue";
import { isMobile } from "../composables/isMobile";

let uniqueId = Math.random().toString().substring(2);

let displayed = ref(false);

let props = defineProps<{
  url: string;
  coverUrl: string;
}>();

let parentWidth = ref(229);
let parentDom = ref<HTMLElement>();

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
  }
}

nextTick(() => {
  new ResizeObserver((e) => {
    parentWidth.value = e[0].target.clientWidth;
  }).observe(parentDom.value!);
  onScroll();
});


let pauseCommand = ref(false);
let paused = ref(false);

let vid: any;

let padding = 80;
let doublePadding = padding * 2;

let videoPadding = 80;
let videoAspect = 1920 / 1080;
let progress = ref(0);

let p5Instance: any;

let innerStyle = computed(() => {
  return `margin-top: -${padding}px; margin-left: -${padding}px;`;
});
watch(displayed, () => {

  if (!displayed.value) {
    return;
  }

  setTimeout(() => {
    let currentWidth = parentWidth.value;

    p5Instance = new p5((p: any) => {
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

        // If not visible dont start draw loop
        if (!visible.value) {
          p.noLoop();
        }
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

        let img;
        try {
          img = vid.get();
        } catch (e) {
          return;
        }
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

        // Continue drawing
        if (!visible.value) {
          p.noLoop();
        }
      };
    }, uniqueId);
  }, 200);
});

// Dont display by default on mobile
if (!isMobile()) {
  displayed.value = true;
}
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
  max-width: 800px;
  max-height: 100%;
  width: 100%;
  flex-grow: 1;
}

img {
  height: 100%;
  border-radius: 10px;
  position: absolute;
}
</style>
