<template>
  <div class="parent" :style="`aspect-ratio: ${videoAspect}`" ref="parentDom">
    <div id="name" :style="innerStyle"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed } from "vue";
// @ts-ignore
import { p5 } from "p5js-wrapper";

let displayed = ref(false);

document.addEventListener("keydown", () => {
  displayed.value = !displayed.value;
});

let parentWidth = ref(229);
let parentDom = ref(null);

nextTick(() => {
  new ResizeObserver((e) => {
    parentWidth.value = e[0].target.clientWidth;
  }).observe(parentDom.value);
});

let vid: any;

let padding = 80;
let doublePadding = padding * 2;

let videoPadding = 80;

let videoAspect = 1920 / 1080;

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

      vid = p.createVideo(
        "/content/rustcraft/video_nointro_1920x1080.mp4",
        () => {
          vid.elt.style.top = `${videoPadding}px`;
          vid.elt.style.left = `${videoPadding}px`;
        }
      );
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

      p.drawingContext.filter = "contrast(180%) blur(30px)";
      p.image(img, padding, padding); // redraws the video frame by frame in
    };
  }, "name");
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

#name {
  width: 900px;
  height: 500px;
  position: absolute;

  :deep(canvas) {
    transform: scaleX(0.95) scaleY(0.9);
  }

  :deep(video) {
    position: absolute;
    border-radius: 20px;
    overflow: hidden;
    transition: opacity 0.4s ease-in;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.parent {
  width: 100%;
}
</style>
