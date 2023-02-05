<template>
  <div id="name"></div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
// @ts-ignore
import { p5 } from "p5js-wrapper";

let displayed = ref(false);

document.addEventListener("keydown", () => {
  displayed.value = !displayed.value;
});

let vid: any;

let padding = 80;
let doublePadding = padding * 2;

let videoPadding = 80;

let videoAspect = 1920 / 1080;

let size = 400;

setTimeout(() => {
  //const P5 = new p5(() => name);
  let sketch1 = new p5((p: any) => {
    p.setup = () => {
      p.createCanvas(size * videoAspect + doublePadding, size + doublePadding);

      vid = p.createVideo(
        "/content/rustcraft/video_nointro_1920x1080.mp4",
        () => {
          vid.elt.style.top = `${videoPadding}px`;
          vid.elt.style.left = `${videoPadding}px`;
        }
      );
      vid.volume(0);
      vid.loop();
      vid.size(size * videoAspect, size);
    };
    p.draw = () => {
      p.clear();

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

  :deep(canvas) {
    transform: scaleX(0.95) scaleY(0.9);
  }

  :deep(video) {
    position: absolute;
    border-radius: 20px;
    overflow: hidden;
    transition: opacity 0.4s ease-in;
  }
}
</style>
