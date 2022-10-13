<template>
  <div class="curve-shadow"></div>
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

<style scoped>
.projects {
  width: 1000vw;
  height: 70vh;
  display: flex;
  flex-direction: row;
}
</style>

<style scoped>

.curve-shadow {
  background: linear-gradient(0deg, rgba(20,20,20,0) 0%, rgb(80, 80, 80) 20%, rgb(80, 80, 80) 30%, rgb(80, 80, 80) 67%, rgba(0,0,0,0) 100%);
  position: absolute;
  top: 70vh;
  width: 100vw;
  height: 500px;
}

</style>