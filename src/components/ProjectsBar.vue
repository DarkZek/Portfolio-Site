<template>
    <div  class="projects">
        <RecycleScroller
            class="scroller"
            :items="mainStore.projects"
            :item-size="800"
            key-field="id"
            direction="horizontal"
            v-slot="{ item }"
        >
            <ProjectTile
                :project="item"
                :index="1"
                :showingIndex="selectedIndex"
            />
        </RecycleScroller>
    </div>
</template>

<script lang="ts">
import ProjectTile from "../components/ProjectTile.vue";
import { RecycleScroller } from "vue-virtual-scroller";

import { useMainStore } from "@/stores/main";
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
  setup() {
    const mainStore = useMainStore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      selectedIndex: 1,
    };
  },
  components: {
    ProjectTile,
    RecycleScroller
  },
};
</script>

<style scoped>
.projects {
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: row;
}

.projects .scroller {
    width: 100vw;
}
</style>