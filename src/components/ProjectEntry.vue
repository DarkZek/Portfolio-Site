<template>
  <div class="project" ref="instance">
    <div
      class="background"
      :style="`background-image: url(${props.backgroundImg}); opacity: ${
        (1 - distance) * 0.3
      };`"
    ></div>
    <div class="row">
      <div
        :class="{ info: true, mobile: isMobile() }"
        @click="router.push('/' + props.redirectUrl)"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" class="more_info" />
        <div style="min-height: 58px">
          <slot name="title" v-if="animateInEffectShown">
            <div class="row title">
              <img :src="props.logoImg" />
              <span>{{ props.title }}</span>
            </div>
          </slot>
        </div>
        <div class="tags">
          <div
            :style="`background-color: ${props.color}42`"
            v-for="tag of props.tags"
            :key="tag"
          >
            {{ tag }}
          </div>
        </div>
        <div class="description">
          <p v-html="props.description"></p>
        </div>
      </div>
      <div class="graphics" v-if="!isMobile()">
        <project-slide
          :url="props.videoUrl"
          :cover-url="props.coverUrl"
          :alt="`${props.title} Cover Image`"
        ></project-slide>
      </div>
      <div class="graphics mobile" v-else>
        <project-slide-mobile
          :url="props.videoUrl"
          :cover-url="props.coverUrl"
          :alt="`${props.title} Cover Image`"
        ></project-slide-mobile>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { defineAsyncComponent } from "vue";
import ProjectSlideLoading from "./ProjectSlideLoading.vue";
import { isMobile } from '../composables/isMobile'

const ProjectSlide = defineAsyncComponent({
  loader: () => {
    return import("./ProjectSlide.vue")
  },
  loadingComponent: ProjectSlideLoading,
  delay: 0,
});

const ProjectSlideMobile = defineAsyncComponent({
  loader: () => {
    return import("./ProjectSlideMobile.vue")
  },
  loadingComponent: ProjectSlideLoading,
  delay: 0,
});

const router = useRouter();

const props = defineProps<{
  backgroundImg?: string;
  title: string;
  logoImg?: string;
  redirectUrl: string;
  tags: string[];
  description: string;
  buttonTitle?: string;
  buttonCallback: () => void;
  videoUrl: string;
  color: string;
  coverUrl: string;
}>();

if (!props.color.startsWith("#") || props.color.length !== 7) {
  throw new Error("Color must be a hex string with no alpha channel.");
}

const instance = ref<HTMLElement>();

let targetScrollCenter = ref(0);
// How many px the image falloff will be
let scrollWidth = 250;

let scrollOffset = -30;

// Scale of 0-1 based on how close to targetScroll we are where 0 is at
let distance = ref(1);

// How large the area of the project is in pixels
let entrySize = 100;

// Min distance from top of screen that we can start showing backgrounds
let topOverride = 100;

// Fade out of top of the screen override
let topFade = 200;

let animateInEffectShown = ref(false);

function calculatePosition() {
  if (instance.value == undefined) {
    window.removeEventListener("resize", calculatePosition);
    return;
  }
  targetScrollCenter.value =
    window.pageYOffset +
    instance.value!.getBoundingClientRect().y +
    instance.value!.clientHeight / 2 +
    scrollOffset;
  entrySize = instance.value!.getBoundingClientRect().height * 0.5;
  calculateBackground();
}

window.addEventListener("resize", calculatePosition);

nextTick(() => {
  calculatePosition();
});

function calculateBackground() {
  const screenCenter = window.scrollY + window.innerHeight / 2;

  // How far away from the target scroll we are
  let absoluteDistance = Math.abs(targetScrollCenter.value - screenCenter);
  absoluteDistance = Math.max(0, absoluteDistance - entrySize / 2);
  if (absoluteDistance > scrollWidth) {
    distance.value = 1;
    return;
  }

  if (!animateInEffectShown.value) {
    animateInEffectShown.value = true;
    showUnderlines();
  }

  if (window.scrollY < topOverride) {
    // 0 when at top and 1 when > topFade
    let mix = Math.min(1, (topOverride - window.scrollY) / topFade);
    absoluteDistance += mix * 500;
  }

  distance.value = absoluteDistance / scrollWidth;

  distance.value = Math.min(1, distance.value);
}

window.addEventListener("scroll", calculateBackground);

function showUnderlines() {
  let i = 0;

  const underlines = instance.value!.querySelectorAll("u");

  // Stagger underlines
  function staggerOutline() {
    if (underlines[i]) {
      underlines[i].classList.add("staggered");
      i++;
    }

    setTimeout(staggerOutline, 500);
  }

  setTimeout(staggerOutline, 2000);
}
</script>

<style scoped lang="scss">
.project {
  width: 100vw;
  max-width: 1500px;
  margin: auto;
  z-index: 2;

  > .row {
    position: relative;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .background {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    aspect-ratio: calc(1280 / 800);
    background-size: cover;
    height: 100%;
    background-position: center;
    filter: blur(3px);
    pointer-events: none;
    transition: opacity 0.6s ease-out;
  }

  .graphics {
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.info {
  color: white;
  margin: auto;
  padding: 30px 40px 30px 40px;
  max-width: min(70vw, 1000px);
  margin-top: 80px;
  min-width: min(400px, 100vw);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 30px;

  &:hover,
  &.mobile {
    background-color: rgba(50, 50, 50, 0.4);

    .more_info {
      opacity: 0.4;
      transform: translateX(10px);
    }
  }

  .more_info {
    opacity: 0;
    position: absolute;
    right: -40px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    transition: all 0.2s ease-in-out;
    font-size: 40px;
    backdrop-filter: blur(10px) opacity(0);
  }

  .title {
    font-size: 40px;
    margin-bottom: 20px;

    img {
      width: 60px;
      margin-right: 20px;
    }
  }

  .tags {
    div {
      display: inline-block;
      color: white;
      backdrop-filter: blur(5px);
      padding: 3px 12px;
      border-radius: 20px;
      margin-right: 10px;
      word-wrap: none;
      margin-bottom: 20px;
    }
  }

  .description {
    font-size: 20px;
  }
}

.graphics {
  max-width: min(70vw, 1000px);
  margin: auto;
  justify-content: center;
  gap: 40px;
  width: 100%;
  padding: 10px 40px 0px 40px;

  &.mobile {
    padding: 10px 20px 0px 20px;
    max-width: 100vw;
  }

  > * {
    display: block;
    min-width: 250px;
  }

  img {
    width: 100%;
    border-radius: 10px;
    user-select: none;
  }

  .picture {
    margin: auto;
  }
}

:deep(u) {
  position: relative;
  text-decoration: none;
  display: inline-block;
}

:deep(u).staggered::after {
  content: "";
  width: 100%;
  height: 2px;
  display: block;
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  transition: 300ms;
  animation: textShown 0.5s ease-in-out;
  position: absolute;
  margin-top: -6px;
}

@keyframes textShown {
  from {
    width: 0px;
  }
  to {
    width: 100%;
  }
}

p {
  line-height: 2;
  opacity: 0.95;
}
</style>
