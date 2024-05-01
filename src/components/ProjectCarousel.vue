<template>
  <div class="carousel">
    <div
      class="scroller"
      ref="scroller"
      @scroll="onScroll"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
    >
      <div
        class="inside"
        :style="`width: ${440}px;`"
        v-for="i of displayTiles"
        :key="i.title"
      ></div>
    </div>
    
    <div class="images-bg" ref="imagesBg">
      <div
        v-for="i in displayTiles.entries()"
        :key="i[0]"
        class="tile"
        :style="`background: ${i[1].color}; animation-delay: ${-animationProgress[i[0]]}s`"
      ></div>
    </div>
    <div class="images" ref="images">
      <div
        v-for="i in displayTiles.entries()"
        :key="i[0]"
        class="tile"
        :style="`background-image: url(${
          i[1].img
        }); animation-delay: ${-animationProgress[i[0]]}s`"
      ></div>
    </div>
    <div class="content" ref="content">
      <div
        class="tile-content"
        v-for="i in displayTiles.entries()"
        :key="i[0]"
        :style="`animation-delay: ${-animationProgress[i[0]]}s`"
      >
        <h3>
          <b>{{ i[1].title }}</b>
        </h3>
        <p>
          {{ i[1].description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { nextTick, ref } from "vue";

let tiles = ref([
  {
    img: "/content/ChristmasEvent2021/Cover.webp",
    title: "UDC Christmas Event 2021",
    color: 'red',
    description:
      "UDC Christmas Event 2021 was a virtual security software development social 'Capture The Flag' event for the Unity Developer Community made by me, containing a set of challenges including website exploits, SSH challenges, quizzes and more.",
    url: '/content/ChristmasEvent2021/Server.mp4'
  },
  {
    img: "/content/cgra/Cover.webp",
    title: "CGRA352 Group Project",
    color: 'blue',
    description:
      "A group project for CGRA352 - Real Time 3D Rendering. We created a 3D scene from scratch using C++ and OpenGL. I was responsible for the mesh optimisation utilising marching cubes to automatically create low-poly versions of assets.",
    url: 'https://github.com/tessapower/cgra350-group-project'
  },
  {
    img: "/content/ChristmasEvent2019/Cover.webp",
    title: "UDC Christmas Event 2019",
    color: '#ffb700',
    description:
      "UDC Christmas Event 2019 was a virtual security software development social 'Capture The Flag' event for the Unity Developer Community made by me, containing a set of challenges including website exploits, SSH challenges, software development and more.",
    url: '/content/ChristmasEvent2019/index.html'
  },
  {
    img: "/content/aliens_are_attacking/Cover.webp",
    title: "Aliens Are Attacking",
    color: 'white',
    description:
      "Aliens Are Attacking is a 2D slicing game made in Unity in collaboration with James Kellie. It was made for the 2020 UDC Game Jam. I was responsible for the game mechanics, UI, and the game's art style.",
    url: '/content/aliens_are_attacking/WebGL/index.html'
  },
  {
    img: "/content/ChristmasEvent2018/Cover.webp",
    title: "UDC Christmas Event 2018",
    color: 'linear-gradient(135deg, hsla(122, 66%, 52%, 1) 0%, hsla(0, 72%, 52%, 1) 100%)',
    description:
      "UDC Christmas Event 2018 was a virtual security software development social 'Capture The Flag' event for the Unity Developer Community made by me, containing a set of challenges including website exploits, SSH challenges, software development and more.",
    url: 'https://darkzek.github.io/UDC-Christmas-Event/Website/index.html'
  },
]);

let scroller = ref<HTMLElement>();
let images = ref<HTMLElement>();
let imagesBg = ref<HTMLElement>();
let content = ref<HTMLElement>();

let size = ref(Math.min(400, window.innerWidth * 0.6));
let padding = 40;

window.addEventListener('resize', () => size.value = Math.min(400, window.innerWidth * 0.9))

let sizePlusPadding = computed(() => size.value + padding);

nextTick(() => {
  // Scroll to a random tile to begin with
  scrollToIndex(tiles.value.length + Math.round(Math.random() * tiles.value.length), 'instant');
  onScroll();
});

let timer: number | null | undefined;
function onScroll() {
  let scrollLeft = scroller.value!.scrollLeft;

  if (scrollLeft < displayWidth.value * 0.5) {
    scroller.value!.scrollLeft += displayWidth.value;
  }
  if (scrollLeft > displayWidth.value * 2.0) {
    scroller.value!.scrollLeft -= displayWidth.value;
  }

  scrollLeft = scroller.value!.scrollLeft;

  images.value!.scrollLeft = scrollLeft;
  imagesBg.value!.scrollLeft = scrollLeft;
  content.value!.scrollLeft = scrollLeft;

  for (let i = 0; i < displayTiles.value.length; i++) {
    let center = i * sizePlusPadding.value + sizePlusPadding.value / 2;

    let screenCenter = center - scrollLeft;

    animationProgress.value[i] = Math.min(
      1,
      Math.abs(screenCenter - window.innerWidth / 2) / 400
    );
  }

  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    scrollToIndex(getClosestIndex());
  }, 150);
}

function getClosestIndex(): number {
  return Math.round(
    (scroller.value!.scrollLeft + window.innerWidth / 2 - sizePlusPadding.value / 2) /
      sizePlusPadding.value
  );
}

function scrollToIndex(index: number, behavior?: 'auto' | 'instant' | 'smooth') {
  let left = index * sizePlusPadding.value + sizePlusPadding.value / 2 - window.innerWidth / 2;

  if (Math.abs(left - scroller.value!.scrollLeft) <= 1) {
    return;
  }

  scroller.value!.scroll({
    left,
    top: 0,
    behavior: behavior ?? 'smooth',
  });
}

// Display tiles 3x, one for the left of the screen, one displayed and one for the right - to provide infinite scrolling
let displayTiles = computed(() => {
  return [...tiles.value, ...tiles.value, ...tiles.value];
});

let animationProgress = ref(new Array(displayTiles.value.length).fill(0));

let displayWidth = computed(() => {
  return tiles.value.length * sizePlusPadding.value;
});

function mouseDown(event) {

  // Detect if center item is clicked then open link
  if (Math.abs(event.screenX - window.innerWidth / 2) < size.value / 2) {
    window.open(displayTiles.value[getClosestIndex()].url, '_blank');
    return;
  }

  let i = getClosestIndex();

  i += event.screenX < window.innerWidth / 2 ? -1 : 1;

  scrollToIndex(i, 'smooth');
}
</script>

<style lang="scss">
.carousel {
  --width: min(400px, 90vw);

  margin-top: 150px;

  display: flex;
  flex-direction: column;

  .images {
    display: flex;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .tile {
      width: var(--width);
      aspect-ratio: 5/3;
      margin: 20px;
      flex-shrink: 0;
      border-radius: 20px;
      background-position: center;
      background-size: cover;
      animation: tileFade 1s ease-in-out;
      animation-play-state: paused;
      animation-fill-mode: forwards;
    }
  }

  .images-bg {
    display: flex;
    overflow-x: scroll;
    padding: 150px 0px;
    position: absolute;
    margin-top: -150px;
    width: 100vw;
    isolation: isolate;
    pointer-events: none;

    &::before {
      content: '';
      z-index: 1;
      backdrop-filter: blur(80px);
      position: absolute;
      left: 0px;
      width: 1000vw;
      height: 200%;
      margin-top: -25%;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .tile {
      width: var(--width);
      aspect-ratio: 5/3;
      margin: 20px;
      flex-shrink: 0;
      border-radius: 20px;
      background-position: center;
      background-size: cover;
      animation: tileBackgroundFade 1s ease-in-out;
      animation-play-state: paused;
      animation-fill-mode: forwards;
      z-index: 0;
    }
  }

  .content {
    height: 200px;
    border-radius: 20px;
    align-self: center;
    overflow-x: scroll;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100vw;

    &::-webkit-scrollbar {
      display: none;
    }

    h3 {
      font-weight: bold !important;
      color: white;
      padding-bottom: 10px;
    }

    .row {
      position: absolute;
    }

    .tile-content {
      width: var(--width);
      flex-shrink: 0;
      margin: 20px;
      animation: descriptionFade 1s ease-in-out;
      animation-play-state: paused;
      animation-fill-mode: forwards;
    }
  }

  .scroller {
    position: absolute;
    width: 100vw;
    left: 0px;
    height: 100%;
    z-index: 10;
    overflow-x: scroll;
    cursor: pointer;

    &::-webkit-scrollbar {
      display: none;
    }

    display: flex;

    .inside {
      height: 10px;
      flex-shrink: 0;
      scroll-snap-align: center;
    }
  }
}

@media screen and (max-width: 600px) {
  .images-bg::before {
    backdrop-filter: blur(50px) !important;
  }
}

@keyframes descriptionFade {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}

@keyframes tileFade {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.5;
    transform: scale(0.9);
  }
}

@keyframes tileBackgroundFade {
  0% {
    filter: contrast(1);
    opacity: 0.4;
  }
  100% {
    filter: contrast(0.5);
    opacity: 0.2;
    scale: 0.9;
  }
}
</style>
