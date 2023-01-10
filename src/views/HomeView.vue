<template>
  <div>
    <name-title></name-title>
    <project-slide-2></project-slide-2>
    <project-slide></project-slide>
    <div id="name2"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import NameTitle from "../components/NameTitle.vue";
import ProjectSlide from "../components/ProjectSlide.vue";
import ProjectSlide2 from "../components/ProjectSlide2.vue";
</script>

<style scoped lang="scss">
#name,
#name2 {
  width: 800px;
  height: 800px;
}
</style>
