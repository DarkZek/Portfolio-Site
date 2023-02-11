<template>
  <div class="project" ref="instance">
    <div
      class="background"
      :style="`background-image: url(${props.backgroundImg}); opacity: ${
        1 - distance
      };`"
    ></div>
    <div class="row">
      <div class="info">
        <div class="row title">
          <img :src="props.logoImg" />
          <a>{{ props.title }}</a>
        </div>
        <div class="tags">
          <div
            :style="`background-color: ${props.color}38`"
            v-for="tag of props.tags"
            :key="tag"
          >
            {{ tag }}
          </div>
        </div>
        <div class="description">
          <p>
            {{ props.description }}
          </p>
        </div>
        <div
          class="button"
          v-if="props.buttonTitle"
          @click="props.buttonCallback"
          :style="`background-color: ${props.color}38`"
        >
          <a>{{ props.buttonTitle }}</a>
        </div>
      </div>
      <div class="graphics">
        <project-slide :url="props.videoUrl"></project-slide>
        <a :href="props.pictureLink" target="_blank"
          ><img :src="props.pictureUrl"
        /></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import ProjectSlide from "./ProjectSlide.vue";

const props = defineProps<{
  backgroundImg: string;
  title: string;
  logoImg: string;
  tags: string[];
  description: string;
  buttonTitle?: string;
  buttonCallback: () => void;
  videoUrl: string;
  pictureUrl: string;
  pictureLink: string;
  color: string;
}>();

if (!props.color.startsWith("#") || props.color.length !== 7) {
  throw new Error("Color must be a hex string with no alpha channel.");
}

const instance = ref<HTMLElement>();

let targetScrollCenter = ref(0);
// How big an area the distance is calculated over
let scrollWidth = 300;

let scrollOffset = -30;

// Scale of 0-1 based on how close to targetScroll we are where 0 is at
let distance = ref(1);

function calculatePosition() {
  targetScrollCenter.value =
    window.pageYOffset +
    instance.value!.getBoundingClientRect().y +
    instance.value!.clientHeight / 2 +
    scrollOffset;
  calculateBackground();
}

window.addEventListener("resize", calculatePosition);

nextTick(() => {
  calculatePosition();
});

function calculateBackground() {
  const screenCenter = window.scrollY + window.innerHeight / 2;

  // How far away from the target scroll we are
  const absoluteDistance = Math.abs(targetScrollCenter.value - screenCenter);
  if (absoluteDistance > scrollWidth) {
    distance.value = 1;
    return;
  }
  distance.value = absoluteDistance / scrollWidth;

  distance.value = Math.min(1, distance.value);

  console.log({
    title: props.title,
    distance: distance.value,
    absoluteDistance,
    targetScrollCenter: targetScrollCenter.value,
    screenCenter,
  });
}

window.addEventListener("scroll", calculateBackground);
</script>

<style scoped lang="scss">
.project {
  width: 100vw;
  height: 650px;
  aspect-ratio: calc(1280 / 800);
  max-width: 100vw;

  > .row {
    position: relative;
    justify-content: space-between;
  }

  .background {
    position: fixed;
    z-index: -1;
    left: 0px;
    top: 0px;
    width: 100vw;
    opacity: 0.4;
    aspect-ratio: calc(1280 / 800);
    background-size: cover;
  }

  .info {
    width: 70%;
    padding: 0px 40px 0px 80px;
    max-width: 800px;
    margin-top: 80px;
  }

  .graphics {
    width: 30vw;
    flex-grow: 1;
    max-width: 500px;
    padding-top: 30px;
  }
}

.info {
  color: white;

  .title {
    font-size: 40px;
    margin-bottom: 20px;

    img {
      width: 60px;
      margin-right: 20px;
    }
  }

  .tags {
    margin-bottom: 20px;

    div {
      display: inline-block;
      color: white;
      backdrop-filter: blur(5px);
      padding: 3px 12px;
      border-radius: 20px;
      margin-right: 10px;
      word-wrap: none;
    }
  }

  .description {
    font-size: 22px;
  }
}

.graphics {
  padding-right: 60px;

  > * {
    margin-top: 50px;
    display: block;
  }

  img {
    width: 100%;
    border-radius: 10px;
  }
}

.button {
  margin-top: 20px;
  backdrop-filter: blur(5px);
  display: inline-block;
  padding: 10px 30px;
  border-radius: 30px;
  cursor: pointer;

  a {
    color: white;
    font-size: 18px;
    text-decoration: none;
  }
}
</style>
