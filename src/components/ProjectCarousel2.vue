<template>
  <div class="carousel"
      ref="carousel">
      <div class="padding" ref="paddingLeft" />
    <div
      class="images"
      v-for="i in displayTiles.entries()"
      :key="i[0]"
    >
      <div class="background-tile" :style="`background: ${i[1].color}`"></div>
      <div class="tile" :style="`background-image: url(${i[1].img})`"></div>
      <div class="tile-content">
        <h3>
          <b>{{ i[1].title }}</b>
        </h3>
        <p>
          {{ i[1].description }}
        </p>
      </div>
    </div>
    <div class="padding" ref="paddingRight" />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick } from "vue";
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

nextTick(() => {
  carousel.value?.scrollTo(2000000, 0);
})

// Display tiles 3x, one for the left of the screen, one displayed and one for the right - to provide infinite scrolling
let displayTiles = computed(() => {
  return [...tiles.value, ...tiles.value, ...tiles.value, ...tiles.value, ...tiles.value];
});
</script>

<style lang="scss" scoped>
.carousel {
  --width: min(400px, 90vw);

  margin-top: 80px;
  display: flex;
  flex-direction: row;
  padding: 150px 0px;
  width: 100vw;
  height: 800px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.images {
  display: flex;
  flex-direction: column;
  width: 400px;
  flex-shrink: 0;
  padding: 20px;
  scroll-snap-align: center;

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

  &::-webkit-scrollbar {
    display: none;
  }

  .background-tile {
    width: var(--width);
    aspect-ratio: 5/3;
    flex-shrink: 0;
    border-radius: 20px;
    filter: blur(60px);
    background-position: center;
    background-size: cover;
    z-index: 0;
    position: absolute;
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
  width: 2000000px;
  flex-shrink: 0;
}

</style>
