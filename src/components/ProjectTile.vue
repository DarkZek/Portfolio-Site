<template>
  <div
    :class="`col-lg-5 project big-project project-diff-${index - showingIndex}`"
  >
    <div class="project-image-container">
      <div class="project-image">
        <video muted loop class="video"></video>
      </div>
    </div>
    <div class="project-info">
      <h3 class="title">{{ project.name }}</h3>
      <p class="description">{{ project.description }}</p>
    </div>
    <div class="tags">
      <div class="tag" v-for="tag in project.tags" v-bind:key="tag">
        {{ tag }}
      </div>
    </div>
    <div class="shadow"></div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    project: null,
    showingIndex: Number,
    index: Number,
  },
};
</script>

<style>
.project {
  max-width: 700px;
  margin: 0 75px 0 75px;
}

.project-image-container {
  border-radius: 10px;
  max-height: 500px;
  cursor: pointer;
  transition: ease-in 0.15s all;
  background-color: #f3f4f5;
  margin-bottom: 20px;
  /* Fallback in JS */
  aspect-ratio: 1.805;
  border-left: solid 7px rgb(239, 50, 61);
  border-bottom: solid 7px rgb(239, 50, 61);
  outline: 4px rgb(239, 50, 61);
}

.big-project {
  animation: floating 3s ease-in-out infinite;
}

.project-image {
  width: 100%;
  outline: black 30px;
  border-radius: 5px;
  transition: ease-in 0.15s all;
  background-size: 100%;
  background-position: center;
  opacity: 0;
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  /* Fallback in JS */
  aspect-ratio: 1.805;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0px);
  }
}

.project:hover .project-image {
  background-size: calc(100% + 10px);
}
.loaded {
  opacity: 1 !important;
}

.project .title {
  font-family: "Ubuntu", sans-serif;
  font-weight: thin;
}

.project video {
  width: 106%;
  margin-left: -3%;
  visibility: hidden;
  transform: scale(0.98);
  transition: ease-in-out all 0.1s;
  opacity: 0;
}

.project .shadow {
  width: 150%;
  margin-left: -25%;
  height: 80px;
  background: radial-gradient(
    ellipse,
    rgba(20, 20, 20, 0.5) 0%,
    rgba(0, 0, 0, 0) 60%
  );
  box-shadow: unset !important;
}

.project:hover video {
  visibility: visible;
  transform: scale(1);
  opacity: 1;
}

.small-project .project-image-container {
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.small-project h3 {
  font-size: 1.3rem;
  text-align: center;
}

.small-project p {
  opacity: 0;
  transition: ease-in-out 0.1s opacity;
}

.small-project:hover p {
  opacity: 1;
}

.tags {
  opacity: 0;
  transition: 0.1s ease-in opacity;
}
.project:hover .tags {
  opacity: 1;
}

#project-selector p {
  font-weight: bold;
  text-align: right;
  width: 100%;
  cursor: pointer;
  margin-bottom: 0px;
  padding-top: 9px;
  padding-bottom: 9px;
  padding-right: 10px;
  font-size: 18px;
  border-right: grey 1px solid;
  user-select: none;
}

#project-selector p:hover,
#project-selector .active {
  background-color: rgba(180, 180, 180, 0.2);
}

.project-info {
  transition: ease-in 0.15s all;
  color: rgb(192, 192, 192);
}

.col-4:hover .project-info {
  color: white;
  cursor: pointer;
}

/** Get the fading out of cards */
.project-diff-1{
  -webkit-mask-image: -webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.5)), to(rgba(0,0,0,0)));
}
.project-diff--1 {
  -webkit-mask-image: -webkit-gradient(linear, right top, left top, from(rgba(0,0,0,0.5)), to(rgba(0,0,0,0)));
}
</style>
