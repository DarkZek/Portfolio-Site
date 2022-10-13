<template>
  <div
    class="icon"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
    tabindex="0"
    @focus="selected"
    @blur="deselected"
    @click="clicked"
    @keydown.enter="clicked"
  >
    <video
      tabindex="-1"
      ref="video_forwards"
      :src="src + '_for.webm'"
      muted
      @ended="playing = false"
      forwards
      v-show="!reversed"
    ></video>
    <video
      tabindex="-1"
      ref="video_reversed"
      :src="src + '_rev.webm'"
      muted
      @ended="playing = false"
      reversed
      v-show="reversed"
    ></video>
  </div>
</template>

<script lang="ts">
export default {
  name: "VideoIcon",
  props: {
    src: String,
    link: String,
  },
  data() {
    return {
      playing: false,
      reversed: false,
      hovered: false,
    };
  },
  methods: {
    play() {
      this.playing = true;
      if (this.reversed) {
        this.$refs.video_reversed.play();
      } else {
        this.$refs.video_forwards.play();
      }
    },
    mouseover() {
      if (this.hovered) {
        return;
      }
      this.reversed = false;
      this.play();
      this.hovered = true;
    },
    mouseleave() {
      if (!this.hovered) {
        return;
      }
      this.reversed = true;
      this.play();
      this.hovered = false;
    },
    selected() {
      this.mouseover();
    },
    deselected() {
      this.mouseleave();
    },
    clicked() {
      window.open(this.link, "_blank");
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
video {
  width: 100%;
}
</style>
