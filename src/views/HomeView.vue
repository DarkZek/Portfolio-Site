<template>
  <div class="curve-shadow"></div>
  <div>
    <ProjectsBar />
  </div>
</template>

<script lang="ts">
import ProjectsBar from "../components/ProjectsBar.vue";
export default {
    components: { ProjectsBar }
};
</script>

<style scoped>

.curve-shadow {
  background: linear-gradient(0deg, rgba(20,20,20,0) 0%, rgb(80, 80, 80) 20%, rgb(80, 80, 80) 30%, rgb(80, 80, 80) 67%, rgba(0,0,0,0) 100%);
  position: absolute;
  top: 70vh;
  width: 100vw;
  height: 500px;
}

</style>