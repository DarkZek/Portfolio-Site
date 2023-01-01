<template>
  <div>
    <div id="blur">
      <div class="floor"></div>
      <div class="background"></div>
      <div class="test"></div>
        <div class="test" style="animation-delay: 0.35s"></div>
      <div class="test" style="animation-delay: .7s"></div>
        <div class="test" style="animation-delay: 2s"></div>
        <div class="test" style="animation-delay: 2.35s"></div>
    </div>
    <div id="blur2">
      <div class="floor">
        <div class="background"></div>
        <div class="test"></div>
        <div class="test" style="animation-delay: 0.35s"></div>
      <div class="test" style="animation-delay: .7s"></div>
        <div class="test" style="animation-delay: 2s"></div>
        <div class="test" style="animation-delay: 2.35s"></div>
      </div>
    </div>
    <div id="blur3">
      <div class="floor">
        <div class="background"></div>
        <div class="test"></div>
        <div class="test" style="animation-delay: 0.35s"></div>
      <div class="test" style="animation-delay: .7s"></div>
        <div class="test" style="animation-delay: 2s"></div>
        <div class="test" style="animation-delay: 2.35s"></div>
      </div>
    </div>
    <div id="vibrant">
      <div class="not-floor">
        <div class="test"></div>
        <div class="test" style="animation-delay: 0.35s"></div>
      <div class="test" style="animation-delay: .7s"></div>
        <div class="test" style="animation-delay: 2s"></div>
        <div class="test" style="animation-delay: 2.35s"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ProjectsBar from "../components/ProjectsBar.vue";
export default {
    components: { ProjectsBar }
};
</script>

<style scoped lang="scss">

#vibrant {

  overflow: hidden;
  isolation: isolate;
  height: 100vh;
  width: 100vw;
  position: absolute;

  .not-floor {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 52% 55%, 48% 55%, 0% 100%);
    height: 100vh;
    width: 100vw;
    top: 0vh;
    position: absolute;
    z-index: 10;
  }

  .test {
    position: absolute;
    margin: auto;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
}

#blur {

  isolation: isolate;
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;

  .floor {
    height: 45vh;
    width: 100vw;
    top: 55vh;
    position: absolute;
    backdrop-filter: blur(25px) brightness(100%);
  }

  .background {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(15px);
  }

  .test {
    position: absolute;
    margin: auto;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
  }
}

#blur2 {

  isolation: isolate;
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;

  .background {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(8px);
  }

  .floor {
    height: 100vh;
    width: 100vw;
    top: 0vh;
    position: absolute;
    z-index: 10;
  }

  .test {
    position: absolute;
    margin: auto;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
  }
}

#blur3 {

  isolation: isolate;
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;

  .background {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(40px) opacity(0.8);
  }

  .floor {
    height: 100vh;
    width: 100vw;
    top: 0vh;
    position: absolute;
    z-index: 10;
  }

  .test {
    position: absolute;
    margin: auto;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
  }
}

.test {
  animation: anim 3s infinite;
  animation-timing-function: cubic-bezier(.45,.15,.9,.71);
  border: 10px yellow solid;
}

.floor {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 52% 55%, 48% 55%, 0% 100%);
}

@keyframes anim {
  0% {
    width: 15vw;
    height: 21.12vw;
    opacity: 0;
    border-width: 5px;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    width: 100vw;
    height: 140vw;
    opacity: 0;
    border-width: 17px;
  }
}

</style>