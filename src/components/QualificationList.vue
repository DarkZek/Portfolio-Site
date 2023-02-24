<template>
  <a>Test</a>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.test {
  display: flex;
  flex-direction: column;

  > div {
    height: 120px;
  }

  video {
    height: 120px;
    position: absolute;
  }
}
</style>
