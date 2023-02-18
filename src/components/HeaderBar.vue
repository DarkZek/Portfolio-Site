<template>
  <div class="bar row" :style="`animation-delay: -${animationProgress}s`">
    <div class="name-location">
      <name-title text="Marshall" :font-size="fontSize"></name-title>
      <div
        class="row location"
        :style="`animation-delay: -${animationProgress}s`"
      >
        <span class="material-icons"> place </span>

        <a>Christchurch, New Zealand</a>
      </div>
    </div>
    <div class="socials row" :style="`animation-delay: -${animationProgress}s`">
      <div class="email">
        <font-awesome-icon icon="fa-solid fa-envelope" />
      </div>
      <div class="linkedin">
        <font-awesome-icon icon="fa-brands fa-linkedin-in" />
      </div>
      <div class="github">
        <font-awesome-icon icon="fa-brands fa-github-alt" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import NameTitle from "./NameTitle.vue";

let maxScroll = 500;

// 0 - 1 scale on how progressed the header bar closing is
let animationProgress = ref(window.scrollY / maxScroll);

let windowWidth = ref(window.innerWidth);

let fontSize = computed(() => {
  let size = 62 - 18 * animationProgress.value;
  if (windowWidth.value < 736) {
    size *= 0.7;
  }
  return size;
});

watch(
  () => window.innerWidth,
  () => {
    windowWidth.value = window.innerWidth;
  }
);

window.addEventListener("scroll", () => {
  animationProgress.value = Math.min(0.9999, window.scrollY / maxScroll);
});
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
  justify-content: space-between;
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
}

.location {
  color: #e6e6e6;
  display: flex;
  animation: loadingHide 1s infinite;
  animation-play-state: paused;
  width: 360px;
  position: span {
    font-size: 30px;
    margin-right: 6px;
    padding-top: 3px;
  }

  a {
    font-size: 24px;
  }
}

@media only screen and (max-width: 768px) {
  .socials {
    animation: socialsCondenseMobile 1s infinite;
    animation-play-state: paused;
  }
}

@keyframes barCondense {
  0% {
    padding: 70px 80px 50px 80px;
  }
  100% {
    padding: 15px 60px;
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
