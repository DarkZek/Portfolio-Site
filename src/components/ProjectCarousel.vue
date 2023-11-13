<template>
  <div class="carousel">
    <div class="scroller" ref="scroller" @scroll="onScroll">
      <div
        class="inside"
        :style="`width: ${displayWidth * 3}px;`"
      ></div>
    </div>
    <div class="images" ref="images">
      <div
        v-for="i in displayTiles.entries()"
        :key="i[0]"
        class="tile"
        :style="`background-image: url(${i[1].img}); animation-delay: ${-animationProgress[i[0]]}s`"
      ></div>
    </div>
    <div class="content" ref="content">
      <div class="row" ref="row">
        <div class="tile-content" v-for="i in displayTiles.entries()" :key="i[0]" :style="`animation-delay: ${-animationProgress[i[0]]}s`">
          <h3>
            <b>{{ i[1].title }}</b>
          </h3>
          <p>
            {{ i[1].description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { nextTick, ref } from "vue";

let scroller = ref<HTMLElement>();
let images = ref<HTMLElement>();
let content = ref<HTMLElement>();
let row = ref<HTMLElement>();

nextTick(() => {
  scroller.value!.scrollLeft = displayWidth.value;
  row.value.style.left = -content.value?.getBoundingClientRect().x + "px";
});

function onScroll(event: Event) {
    let scrollLeft = event.target.scrollLeft;

    if (scrollLeft < displayWidth.value * 0.5) {
        event.target.scrollLeft += displayWidth.value;
    }
    if (scrollLeft > displayWidth.value * 2.5) {
        event.target.scrollLeft -= displayWidth.value;
    }
    
    scrollLeft = event.target.scrollLeft;

    images.value.scrollLeft = scrollLeft;
    content.value.scrollLeft = scrollLeft;

    for (let i = 0; i < displayTiles.value.length; i++) {
        let center = (i * (400 + 40)) + 200;

        let screenCenter = center - scrollLeft;

        animationProgress.value[i] = Math.min(1, Math.abs(screenCenter - window.innerWidth / 2) / 500)
    }
}

let tiles = ref([
  {
    img: "/content/ChristmasEvent2021/Cover.png",
    title: "UDC Christmas Event 2021",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/img/background.webp",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/content/ChristmasEvent2019/Cover.png",
    title: "UDC Christmas Event 2019",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/content/aliens_are_attacking/Cover.png",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/content/ChristmasEvent2018/Cover.png",
    title: "UDC Christmas Event 2018",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/img/background.webp",
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
]);

// Display tiles 3x, one for the left of the screen, one displayed and one for the right - to provide infinite scrolling
let displayTiles = computed(() => {
  return [...tiles.value, ...tiles.value, ...tiles.value];
});

let animationProgress = ref(new Array(displayTiles.value.length).fill(0));

let displayWidth = computed(() => {
    return tiles.value.length * (400 + 40);
});
</script>

<style lang="scss">
.carousel {
  --width: 400px;

  margin-top: 50px;

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

  .content {
    width: 600px;
    height: 300px;
    background-color: rgba(150, 150, 150, 0.05);
    border-radius: 20px;
    align-self: center;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      width: 100vw;
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
    height: 800px;
    z-index: 10;
    overflow-x: scroll;

    .inside {
      width: 800vw;
    }
  }
}

@keyframes descriptionFade {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@keyframes tileFade {
    0% {
        opacity: 1;
        transform: scale(1.0);
    }
    100% {
        opacity: 0.5;
        transform: scale(0.9);
    }
}
</style>
