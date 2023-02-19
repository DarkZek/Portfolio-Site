<template>
  <a>Test</a>
  <div class="bg"></div>
  <div class="test" ref="linesParent">
    <div v-for="i in 10" :key="i">
      <video
        muted
        :id="`line-${id}-${i}`"
        :style="`opacity: ${displayingState[i] ? 1 : 0}`"
        @load="$event.target!.currentTime = 1"
      >
        <source src="/img/line.webm" type="video/webm" />
      </video>
      <video
        muted
        :id="`line-${id}-${i}-reverse`"
        :style="`opacity: ${displayingState[i] ? 0 : 1}`"
      >
        <source src="/img/line_reversed.webm" type="video/webm" />
      </video>
    </div>
    <!--
        
    <video muted loop autoplay v-for="i in 10" :key="i">
      <source src="/img/line.webm" type="video/webm" />
    </video>
    -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

let id = Math.random().toString().substring(2);

// Length of animation in millis
let animationLength = 1000;

let sectionHeight = 120;

let linesParent = ref<HTMLElement>();

let linesShowing = ref([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

let displayingState = ref([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

window.addEventListener("scroll", () => {
  const screenCenter = window.scrollY + window.innerHeight / 2;

  let parentPos =
    window.pageYOffset + linesParent.value!.getBoundingClientRect().y;

  let setActive = false;

  for (let i = 0; i < 10; i++) {
    let pos = parentPos + sectionHeight * i;

    if (screenCenter < pos && !setActive) {
      setActive = true;
      linesShowing.value[i] = true;
      console.log({ i, screenCenter, pos });
    } else {
      linesShowing.value[i] = false;
    }
  }
});

watch(
  linesShowing,
  (val) => {
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== displayingState.value[i]) {
        let line = document.getElementById(
          `line-${id}-${i}${val[i] ? "" : "-reverse"}`
        ) as HTMLVideoElement;

        line.currentTime = 0;
        displayingState.value[i] = val[i];
        line.play();
      } else {
        // line.pause();
      }
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.bg {
  min-height: 1800px;
  background-image: url("/img/Untitled.png");
  background-size: contain;
  opacity: 0.4;
  position: absolute;
  width: 100vw;
}
.test {
  display: flex;
  flex-direction: column;

  > div {
    height: 120px;
  }

  video {
    height: 120px;
    position: absolute;
  }
}
</style>
