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
import { computed, onUnmounted } from "vue";
import { nextTick, ref } from "vue";

let tiles = ref([
  {
    img: "/content/ChristmasEvent2021/Cover.png",
    title: "UDC Christmas Event 2021",
    color: 'pink',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/content/cgra/Cover.png",
    title: "CGRA352 Group Project",
    color: 'blue',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/content/ChristmasEvent2019/Cover.png",
    title: "UDC Christmas Event 2019",
    color: 'green',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/content/aliens_are_attacking/Cover.png",
    title: "Lorem Ipsum",
    color: 'white',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/content/ChristmasEvent2018/Cover.png",
    title: "UDC Christmas Event 2018",
    color: 'linear-gradient(135deg, hsla(122, 66%, 52%, 1) 0%, hsla(0, 72%, 52%, 1) 100%)',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/img/background.webp",
    title: "Lorem Ipsum",
    color: 'purple',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
]);

let scroller = ref<HTMLElement>();
let images = ref<HTMLElement>();
let imagesBg = ref<HTMLElement>();
let content = ref<HTMLElement>();

let size = 400;
let padding = 40;

let sizePlusPadding = size + padding;

nextTick(() => {
  scrollToIndex(getClosestIndex(), 'instant');
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
    let center = i * sizePlusPadding + sizePlusPadding / 2;

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
    (scroller.value!.scrollLeft + window.innerWidth / 2 - sizePlusPadding / 2) /
      sizePlusPadding
  );
}

function scrollToIndex(index: number, behavior?: 'auto' | 'instant' | 'smooth') {
  let left = index * sizePlusPadding + sizePlusPadding / 2 - window.innerWidth / 2;

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
  return tiles.value.length * sizePlusPadding;
});

let dragging = false;
let downTime = new Date();

const MAX_CLICK_MILLIS = 4500;

// Start dragging functionality
function mouseDown() {
  dragging = true;
  downTime = new Date();
}

function mouseMove(event) {
  if (!dragging) {
    return;
  }
  scroller.value!.scrollLeft -= event.movementX;
}

function mouseUp(event) {
  dragging = false;

  if (new Date() - downTime < MAX_CLICK_MILLIS) {
    let i = getClosestIndex();

    // Get side of screen and adjust i based on that
    event.screenX < screen.width / 2 ? i-- : i++;

    scrollToIndex(i);
  }
}
</script>

<style lang="scss">
.carousel {
  --width: 400px;

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
