<template>
  <div class="icon">
    <div class="d d1" />
    <div class="d d2" />
    <div class="d d3" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.icon {
  aspect-ratio: 1;
  min-width: 30px;
  max-width: 100px;
  display: flex;
  flex-direction: row;
  --icon-off-color: rgb(71, 71, 71);

  .d {
    height: 80%;
    margin-top: 10%;
    width: 21%;
    margin-left: 6%;
    margin-right: 6%;
    background-color: var(--icon-off-color);
    border-radius: 10px;
    animation: diodeIcon 0.5s infinite;
  }
}

.d1 {
    --icon-on-color: rgb(180, 74, 74);
}

.d2 {
    --icon-on-color: rgb(96, 176, 96);
    animation-delay: 0.16s !important;
}

.d3 {
    --icon-on-color: rgb(85, 85, 182);
    animation-delay: 0.33s !important;
}

@keyframes diodeIcon {
  0% {
    background-color: var(--icon-off-color);
  }
  25% {
    background-color: var(--icon-on-color);
    scale: 1.1;
  }
  50% {
    background-color: var(--icon-off-color);
  }
}
</style>
