<template>
  <div class="bar row">
    <name-title></name-title>
    <div class="spacer"></div>
    <div class="socials row">
      <div class="email">
        <font-awesome-icon icon="fa-solid fa-envelope" />
      </div>
      <div class="linkedin">
        <font-awesome-icon icon="fa-brands fa-linkedin-in" />
      </div>
      <div class="github">
        <font-awesome-icon icon="fa-brands fa-github-alt" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NameTitle from "./NameTitle.vue";
</script>

<style lang="scss" scoped>
.bar {
  padding: 70px 80px;
}

.socials > div {
  font-size: 45px !important;
  margin-left: 40px;
}
</style>
