<template>
  <div class="parent">
    <font-awesome-icon icon="fa-solid fa-chevron-left" class="left navigate" @click.prevent="carousel?.scrollBy({ left: -tileSize, behavior: 'smooth' })" />
    <font-awesome-icon icon="fa-solid fa-chevron-right" class="right navigate" @click.prevent="carousel?.scrollBy({ left: tileSize, behavior: 'smooth' })" />
    <div class="carousel" ref="carousel">
      <div
        class="padding"
        ref="paddingLeft"
        :style="`width: ${paddingLeftPx}px`"
      />
      <a
        class="images"
        v-for="i in displayTiles.entries()"
        :key="i[0]"
        :style="`width: ${tileSize}px`"
        :href="i[1].url"
        target="_blank"
      >
        <div>
          <div class="background-tile" :style="`background: ${i[1].color}`"></div>
        </div>
        <div class="tile" :style="`background-image: url(${i[1].img})`"></div>
        <div class="tile-content">
          <h3>
            <b>{{ i[1].title }}</b>
          </h3>
          <p>
            {{ i[1].description }}
          </p>
        </div>
      </a>
      <div
        class="padding"
        ref="paddingRight"
        :style="`width: ${paddingRightPx}px`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onUnmounted, watch } from "vue";
import { ref } from "vue";

let tiles = ref([
  {
    img: "/content/ChristmasEvent2021/Cover.webp",
    title: "UDC Christmas Event 2021",
    color: "red",
    description:
      "UDC Christmas Event 2021 was a virtual security software development social 'Capture The Flag' event for the Unity Developer Community made by me, containing a set of challenges including website exploits, SSH challenges, quizzes and more.",
    url: "/content/ChristmasEvent2021/Server.mp4",
  },
  {
    img: "/content/cgra/Cover.webp",
    title: "CGRA352 Group Project",
    color: "blue",
    description:
      "A group project for CGRA352 - Real Time 3D Rendering. We created a 3D scene from scratch using C++ and OpenGL. I was responsible for the mesh optimisation utilising marching cubes to automatically create low-poly versions of assets.",
    url: "https://github.com/tessapower/cgra350-group-project",
  },
  {
    img: "/content/ChristmasEvent2019/Cover.webp",
    title: "UDC Christmas Event 2019",
    color: "#ffb700",
    description:
      "UDC Christmas Event 2019 was a virtual security software development social 'Capture The Flag' event for the Unity Developer Community made by me, containing a set of challenges including website exploits, SSH challenges, software development and more.",
    url: "/content/ChristmasEvent2019/index.html",
  },
  {
    img: "/content/aliens_are_attacking/Cover.webp",
    title: "Aliens Are Attacking",
    color: "white",
    description:
      "Aliens Are Attacking is a 2D slicing game made in Unity in collaboration with James Kellie. It was made for the 2020 UDC Game Jam. I was responsible for the game mechanics, UI, and the game's art style.",
    url: "/content/aliens_are_attacking/WebGL/index.html",
  },
  {
    img: "/content/ChristmasEvent2018/Cover.webp",
    title: "UDC Christmas Event 2018",
    color:
      "linear-gradient(135deg, hsla(122, 66%, 52%, 1) 0%, hsla(0, 72%, 52%, 1) 100%)",
    description:
      "UDC Christmas Event 2018 was a virtual security software development social 'Capture The Flag' event for the Unity Developer Community made by me, containing a set of challenges including website exploits, SSH challenges, software development and more.",
    url: "https://darkzek.github.io/UDC-Christmas-Event/Website/index.html",
  },
]);

const carousel = ref<HTMLElement>();
const paddingLeft = ref<HTMLElement>();
const paddingRight = ref<HTMLElement>();

const screenWidth = ref(window.innerWidth);

let update = () => screenWidth.value = window.innerWidth;
document.addEventListener('resize', update);
onUnmounted(() => document.removeEventListener('resize', update));

const windowSize = 5;
const tileSize = computed(() => Math.min(600, screenWidth.value * 0.8));
const padding = 2000000;
const center = ref(padding + (windowSize / 2) * tileSize.value);

const scrollX = ref(center.value);
const windowOffset = computed(() => {
  return Math.round((scrollX.value - center.value) / (tileSize.value * windowSize));
});
const paddingLeftPx = computed(
  () => padding + tileSize.value * windowSize * windowOffset.value
);
const paddingRightPx = computed(
  () => padding - tileSize.value * windowSize * windowOffset.value
);

nextTick(() => {
  carousel.value?.addEventListener(
    "scroll",
    () => {
      scrollX.value = carousel.value!.scrollLeft;
    },
    { passive: true }
  );
});

nextTick(() => {
  carousel.value?.scrollTo(center.value, 0);
});

// Display tiles 3x, one for the left of the screen, one displayed and one for the right - to provide infinite scrolling
let displayTiles = computed(() => {
  return [
    ...tiles.value,
    ...tiles.value,
    ...tiles.value,
    ...tiles.value,
    ...tiles.value,
  ];
});
</script>

<style lang="scss" scoped>
.carousel {
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  padding: 100px 0px 0px 0px;
  width: 100vw;
  height: 650px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .images {
    padding: 15px !important;
  }
  .navigate {
    display: none;
  }
}

.images {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 40px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  text-decoration: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .tile {
    width: 100%;
    aspect-ratio: 5/3;
    flex-shrink: 0;
    border-radius: 20px;
    background-position: center;
    background-size: cover;
  }

  .background-tile {
    width: 100%;
    aspect-ratio: 5/3;
    border-radius: 20px;
    filter: blur(50px);
    opacity: 0.5;
    background-position: center;
    background-size: cover;
    z-index: 0;
    position: absolute;
  }
}

.tile-content {
  border-radius: 20px;
  padding-top: 20px;

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

  p {
    color: var(--color-text) !important;
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

.padding {
  flex-shrink: 0;
}

.parent:hover .navigate {
  opacity: 1;
}

.navigate {

  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 20px;
  border-radius: 100%;
  bottom: 0px;
  top: 0px;
  margin: auto;
  z-index: 2;
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(100, 50, 20, 0.5);
    color: white;
  }

  &.left {
    left: 50px;
  }

  &.right {
    right: 50px;
  }
}
</style>
