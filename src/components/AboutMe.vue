<template>
  <div>
    <div class="about">
      <div class="content">
        <p>
          Hi! I am a Front-End Developer with a passion for computer graphics.
        </p>
        <p>
          I take pride in my ability to turn complex ideas into simple and elegant
          solutions. I am always eager to take on new challenges and learn new
          technologies. My passion for graphics allows me to bring a unique
          perspective to my work and helps me create visually stunning interfaces.
        </p>
      </div>
    </div>
    <div class="game-background" ref="gameParent" v-if="game != undefined">
      <canvas id="game-about-me" ref="gameObj"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { SnakeGame } from "../utils/snake";
import { isMobile } from "../composables/isMobile";

let gameObj = ref<HTMLCanvasElement>();
let gameParent = ref<Element>();

let size = 600;
let playing = true;

let game: SnakeGame | undefined = undefined;

let opacity = 0;

function gameSetup() {
  game = new SnakeGame(10);

  function onScroll() {
    if (gameObj.value == undefined) {
      return;
    }

    opacity = Math.min(0.8, Math.max(0, 0.5 - window.scrollY / 500));
    gameObj.value!.style.opacity = opacity.toString();
    if (opacity == 0) {
      playing = false;
    } else {
      playing = true;
    }
  }

  document.addEventListener("scroll", onScroll);

  game.addListeners();

  function resized() {
    size = window.innerHeight;

    if (size > 800) {
      size = 1000;
    }

    if (gameObj.value == undefined) {
      return;
    }

    gameObj.value.height = size;
    gameObj.value.width = size;
    gameParent.value.style.height = size + 'px';
    gameParent.value.style.width = size + 'px';
  }

  watch(gameParent, () => {
    new ResizeObserver(resized).observe(gameParent.value!);
  });

  watch(gameObj, () => {
    if (gameObj.value == undefined) {
      return;
    }

    gameObj.value.height = size;
    gameObj.value.width = size;

    const ctx = gameObj.value.getContext("2d");

    setInterval(() => {
      if (ctx != null && playing) {
        game.tick();
        game.draw(ctx, size);
      }
    }, 150);
  });
}

if (!isMobile()) {
  gameSetup();
}
</script>

<style lang="scss" scoped>
.about {
  padding: 0px 80px;
  max-width: 1160px;
  font-size: 24px;
  line-height: 1.6;
  color: white;
  margin: auto;
  margin-top: 280px;
  min-height: 40vh;

  .content {
    max-width: 700px;
  }
}

@media screen and (max-width: 768px) {
  .about {
    padding: 0px 40px;
  }
}

p {
  margin-bottom: 30px;
}

.game-background {
  position: fixed;
  width: 100vh;
  height: 100vh;

  right: 0px;
  top: 0px;
  pointer-events: none;

  #game-about-me {
    position: relative;
    opacity: 0.8;
    filter: blur(8px);
  }
}
</style>
