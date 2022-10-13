<template>
  <div class="projects">
    <div v-for="i in 3" :key="i">
      <ProjectTile
        :project="mainStore.projects[i-1]"
        :index="i-1"
        :showingIndex="selectedIndex"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ProjectTile from "../components/ProjectTile.vue";
import { useMainStore } from "@/stores/main";

export default {
  setup() {
    const mainStore = useMainStore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  components: {
    ProjectTile,
  },
};
</script>

<style>
.projects {
  width: 1000vw;
  height: 70vh;
  display: flex;
  flex-direction: row;
}
</style>