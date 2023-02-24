<template>
  <div class="flixr-title-animation">
    <div class="row">
      <div class="logo-parent">
        <div class="logo">
          <div class="logo">
            <div class="cube">
              <div class="cube__face cube__face--front"></div>
              <div class="cube__face cube__face--back"></div>
              <div class="cube__face cube__face--left">Flixr</div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">
        <div class="hiding">
          <a>Flixr</a>
        </div>
      </div>
    </div>
  </div>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    rel="stylesheet"
  />
</template>

<style lang="scss" scoped>
.rustcraft-title-animation {
  height: 82px;
}

.title {
  font-size: 40px;
  animation-fill-mode: forwards;
  color: white;
  animation: test2 0.6s linear;
  animation-fill-mode: forwards;
  margin-left: 80px;
  margin-top: -7px;
  padding-bottom: 14px;
}

img {
  height: 60px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-100px) rotateY(0deg);
  animation: test 0.6s linear;
  animation-fill-mode: forwards;
}

@keyframes test {
  0% {
    transform: translateZ(-100px) translateX(140px) rotateY(0deg);
  }
  50% {
    transform: translateZ(-100px) translateX(117px) rotateY(-90deg);
    color: white;
  }
  51% {
    transform: translateZ(-100px) translateX(117px) rotateY(-90deg);
    color: #a1a6c9;
  }
  100% {
    transform: translateZ(-100px) translateX(50px) rotateY(-180deg);
  }
}

@keyframes test2 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  51% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.cube__face {
  position: absolute;
  width: 48px;
  height: 48px;
  text-align: center;
}

.cube__face--front {
  transform: rotateY(0deg) translateZ(48px);
  background-image: url("/content/flixr/favicon.png");
  background-size: contain;
  width: 48px;
}

.cube__face--back {
  transform: rotateY(180deg) translateZ(48px);
  background-image: url("/content/flixr/favicon.png");
  background-size: contain;
}

.cube__face--left {
  background-color: #7782d2;
  transform: rotateY(-90deg) scaleX(-1);
  width: 96px;
  font-size: 40px;
  line-height: 1.2;
}
</style>
