<template>
  <div class="page">
    <header-bar></header-bar>
    <blueprint-section></blueprint-section>
    <about-me></about-me>
    <project-list></project-list>
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from "../components/HeaderBar.vue";
import BlueprintSection from "../components/BlueprintSection.vue";
import AboutMe from "../components/AboutMe.vue";
import ProjectList from "../components/ProjectList.vue";
</script>

<style scoped lang="scss">
.page {
  min-height: 200vh;
}
</style>
