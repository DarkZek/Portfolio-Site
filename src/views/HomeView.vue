<template>
  <div>
    <a class="title">
      <span char="0" :style="charStyle[0]">M</span>
      <span char="1" :style="charStyle[1]">a</span>
      <span char="2" :style="charStyle[2]">r</span>
      <span char="3" :style="charStyle[3]">s</span>
      <span char="4" :style="charStyle[4]">h</span>
      <span char="5" :style="charStyle[5]">a</span>
      <span char="6" :style="charStyle[6]">l</span>
      <span char="7" :style="charStyle[7]">l</span>
    </a>
    <a class="title2">Scott</a>
    <div style="height: 800px"></div>
    <div id="name"></div>
    <div id="name2"></div>
  </div>
</template>

<script lang="ts" setup>
import { p5 } from "p5js-wrapper";
import { computed, nextTick, ref } from "vue";
import * as name from "../sketches/name";

let offsets = ref([0, 0, 0, 0, 0, 0, 0, 0]);

let charStyle = computed(() => {
  return offsets.value.map((offset, index) => {
    return `background-position-x: ${-offset}px;`;
  });
});

nextTick(() => {
  for (let i = 0; i < 8; i++) {
    offsets.value[i] = document.querySelector(`span[char="${i}"]`).offsetLeft;
  }

  //const P5 = new p5(() => name);
  let sketch1 = new p5((p) => {
    p.setup = () => name.setup(p);
    p.draw = () => name.draw(p);
  }, "name");

  // Sketch2
  let sketch2 = new p5((p) => {
    p.setup = () => {
      // canvas size is specified in the CSS file (size of div #two)
      const two = document.getElementById("name2");
      p.createCanvas(two.clientWidth, two.clientHeight);
      // same as: p.createCanvas($("#two").width(), $("#two").height());
    };

    p.draw = () => {
      p.background(170);
      p.noStroke();
      p.fill(255);
      p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
  }, "name2");
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

.title :deep(span) {
  color: transparent;
  position: unset;
  animation: test 0.6s ease-out forwards;
  background-image: url(./img/gradient.jpg);
  background-size: 900px;
  font-size: 200px;
  font-weight: 600;
  line-height: 280px;
  background-clip: text;
  -webkit-background-clip: text;
  color: rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  display: inline-block;
  opacity: 0;
}

.title2 {
  background-color: blue;
  font-family: "Poppins", sans-serif;
  font-size: 200px;
  font-weight: 600;
  color: white;
}

@for $i from 0 through 8 {
  .title :deep(span)[char="#{$i}"] {
    animation-delay: #{(0.05 * $i) + 1}s;
  }
}

@keyframes test {
  0% {
    transform: translateY(-100px);
    background-position-y: 100px;
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    background-position-y: 0px;
    opacity: 1;
  }
}

#name,
#name2 {
  width: 800px;
  height: 800px;
}
</style>
