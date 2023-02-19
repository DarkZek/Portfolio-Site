<template>
  <div class="page">
    <header-bar></header-bar>
    <about-me></about-me>
    <project-list></project-list>
    <qualification-list />
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from "../components/HeaderBar.vue";
import AboutMe from "../components/AboutMe.vue";
import ProjectList from "../components/ProjectList.vue";
import QualificationList from "../components/QualificationList.vue";
</script>

<style scoped lang="scss">
.page {
  min-height: 200vh;
}
</style>
