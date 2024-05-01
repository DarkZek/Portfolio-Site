<template>
  <div class="bar row" :style="`animation-delay: -${animationProgress}s`">
    <div class="row content">
      <div class="name-location">
        <name-title text="Marshall Scott" :font-size="fontSize"></name-title>
        <div
          class="row location"
          :style="`animation-delay: -${animationProgress}s`"
        >
          <map-marker-icon />

          <span>Christchurch, New Zealand</span>
        </div>
      </div>
      <div
        class="socials row"
        :style="`animation-delay: -${animationProgress}s`"
      >
        <a
          class="email"
          href="mailto:mashdowne@hotmail.co.nz"
          target="_blank"
          aria-label="Email Address">
          <font-awesome-icon icon="fa-solid fa-envelope" />
        </a>
        <a
          class="linkedin"
          href="https://www.linkedin.com/in/marshall-scott-746989167/"
          target="_blank"
          aria-label="LinkedIn Page"
        >
          <font-awesome-icon icon="fa-brands fa-linkedin-in" />
        </a>
        <a
          class="github"
          href="https://github.com/darkzek/"
          target="_blank"
          aria-label="Github Page">
          <font-awesome-icon icon="fa-brands fa-github-alt" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onUnmounted, watch } from "vue";
import NameTitle from "./NameTitle.vue";
import MapMarkerIcon from "vue-material-design-icons/MapMarker.vue";
import { useRoute } from 'vue-router'

let maxScroll = 500;

// 0 - 1 scale on how progressed the header bar closing is
let animationProgress = ref(window.scrollY / maxScroll);

let windowWidth = ref(window.innerWidth);

let fontSize = computed(() => {
  let size = 62 - 18 * animationProgress.value;
  // Max on mobile is 10% vw
  if (size > window.innerWidth * .1) {
    size = window.innerWidth * .1;
  }
  if (windowWidth.value < 736) {
    //size *= 0.7;
  }
  return size;
});

const route = useRoute();

function onResize() {
  windowWidth.value = window.innerWidth;
}

function onScroll() {
  if (route.name == 'home') {
    animationProgress.value = Math.min(0.9999, window.scrollY / maxScroll);
  } else {
    animationProgress.value = 0.9999
  }
}

watch(route, onScroll)

if (window.innerWidth > 768) {
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onResize);

  onScroll();
} else {
  animationProgress.value = 0.9999
}

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
})
</script>

<style lang="scss" scoped>
.bar {
  position: fixed;
  z-index: 10;
  background: linear-gradient(
    90deg,
    rgba(46, 44, 42, 0.9) 0%,
    rgba(36, 36, 36, 0.9) 100%
  );
  width: 100vw;
  top: 0px;
  backdrop-filter: blur(40px);
  animation: barCondense 1s;
  animation-play-state: paused;
}

.content {
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  margin: auto;
}

@media screen and (max-width: 768px) {
  .bar {
    animation: barCondenseMobile 1s;
    animation-play-state: paused;
  }
}

.socials {
  animation: socialsCondense 1s infinite;
  animation-play-state: paused;
  flex-wrap: nowrap;
  a {
    color: rgb(167, 167, 167);
  }
}

.location {
  color: #e6e6e6;
  display: flex;
  animation: loadingHide 1s infinite;
  animation-play-state: paused;
  width: 360px;

  span {
    font-size: 30px;
    margin-right: 6px;
    margin-top: -4px;
  }

  a {
    font-size: 24px;
  }
}

@media only screen and (max-width: 768px) {
  .socials {
    animation: socialsCondenseMobile 1s infinite;
    animation-play-state: paused;
    margin-top: 5px !important;
  }

  .location {
    display: none;
  }
}

@keyframes barCondense {
  0% {
    padding: 70px 80px 50px 80px;
    backdrop-filter: blur(0px);
    background: transparent;
  }
  100% {
    padding: 15px 60px;
    backdrop-filter: blur(40px);
    background: linear-gradient(
      90deg,
      rgba(46, 44, 42, 0.9) 0%,
      rgba(36, 36, 36, 0.9) 100%
    );
  }
}

@keyframes barCondenseMobile {
  0% {
    padding: 50px 40px 50px 40px;
  }
  100% {
    padding: 15px 30px;
  }
}

@keyframes loadingHide {
  0% {
    transform: translateY(0px);
    opacity: 1;
    height: auto;
  }
  100% {
    transform: translateY(-15px);
    opacity: 0;
    height: 0px;
  }
}

@keyframes socialsCondense {
  0% {
    font-size: 45px;
    margin-top: 0px;
    gap: 25px;
  }
  100% {
    font-size: 35px;
    margin-top: 10px;
    gap: 15px;
  }
}

@keyframes socialsCondenseMobile {
  0% {
    font-size: 35px;
    margin-top: 0px;
    gap: 25px;
  }
  100% {
    font-size: 25px;
    margin-top: 10px;
    gap: 15px;
  }
}
</style>
