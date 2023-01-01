<template>
  <div class="nav">
    <div class="name">
      <video
        muted
        autoplay
        src="/img/name.webm"
        @ended="playing = false"
        v-if="playing"
      ></video>
      <img src="/img/name.png" v-else />
    </div>
    <div class="links">
      <a href="https://flixrapp.com/">Flixrapp</a>
      <a href="https://blog.flixrapp.com/">Byte Unwrapped</a>
      <a href="https://github.com/darkzek/rustcraft/">Rustcraft</a>
    </div>
    <div class="socials">
      <VideoIcon
        src="./img/linkedin"
        link="https://www.linkedin.com/in/marshall-scott-746989167/"
        class="icon"
      ></VideoIcon>
      <VideoIcon
        src="./img/github"
        link="https://github.com/darkzek/"
        class="icon"
      ></VideoIcon>
      <a
        href="mailto:mashdowne@hotmail.co.nz"
        class="fi fi-email"
        target="_blank"
      ></a>
    </div>
  </div>
</template>

<script lang="ts">
import VideoIcon from "./VideoIcon.vue";

export default {
  name: "NavigationBar",

  components: {
    VideoIcon,
  },

  data() {
    return {
      playing: true,
    };
  },
};
</script>

<style scoped>
.icon {
  width: 45px;
}

/* Nav */

.nav {
  color: white;
  padding: 50px 10vw 50px 10vw;
  display: flex;
  flex-direction: row;
}

.nav .links {
  padding-left: 20px;
}

.nav .links a {
  font-size: 1.25em;
  margin-right: 25px;
  margin-top: 2px;
  color: rgb(189, 189, 189);
  font-weight: bold;
  padding-top: 8px;
  text-decoration: none;
  display: inline-block;
}

.nav .fi {
  font-size: 20px;
  margin-right: 15px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  text-decoration: none;
  color: white;
}

.nav .name {
  max-width: 300px;
}

.nav .name > * {
  width: 100%;
}

.linkedin {
  width: 30px;
  height: 30px;
  isolation: isolate;
}

.linkedin .color {
  position: static;
  transition: all 0.1s ease-in-out;
  background-color: rgb(10, 102, 194);
  width: 100%;
  height: 0px;
  margin-top: -100%;
  mix-blend-mode: multiply;
  transition: height 0.4s ease-out;
  pointer-events: none;
}

.linkedin:hover .color {
  height: 100%;
}

.nav .fi-github:hover {
  color: rgb(36, 41, 46);
}

.nav .fi-email:hover {
  color: rgb(0, 120, 212);
}

/** Socials **/

.socials {
  position: absolute;
  right: 10vw;
  display: flex;
  flex-direction: row;
}

.socials > div {
  width: 45px;
  height: 45px;
  margin-left: 20px;
}

.waves-svg {
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
}

/* Mobile */
@media (max-width: 600px) {
  .nav .socials {
    position: inherit;
    margin-top: 10px;
  }
}
</style>
