<template>
  <div class="bar row" :style="`animation-delay: -${animationProgress}s`">
    <div>
      <name-title
        text="Marshall"
        :font-size="62 - 18 * animationProgress"
      ></name-title>
      <div
        class="row location"
        :style="`animation-delay: -${animationProgress}s`"
      >
        <span class="material-icons"> place </span>

        <a>Christchurch, New Zealand</a>
      </div>
    </div>
    <div class="spacer"></div>
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
import { ref } from "vue";
import NameTitle from "./NameTitle.vue";

let maxScroll = 500;

// 0 - 1 scale on how progressed the header bar closing is
let animationProgress = ref(window.scrollY / maxScroll);

window.addEventListener("scroll", () => {
  animationProgress.value = Math.min(0.9999, window.scrollY / maxScroll);
});
</script>

<style lang="scss" scoped>
.bar {
  padding: 70px 80px;
  position: fixed;
  z-index: 10;
  background: linear-gradient(
    90deg,
    rgb(46, 44, 42) 0%,
    rgba(36, 36, 36, 1) 100%
  );
  width: 100vw;
  top: 0px;
  backdrop-filter: blur(40px);
  animation: barCondense 1s infinite;
  animation-play-state: paused;
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

  span {
    font-size: 30px;
    margin-right: 6px;
    padding-top: 3px;
  }

  a {
    font-size: 24px;
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
</style>
