<template>
    <div class="nav">
        <div style="width: 280px;">
            <h3 class="title" id="title">&#8203;</h3>
        </div>
        <div class="links">
            <a href="https://flixrapp.com/">Flixrapp</a>
            <a href="https://blog.flixrapp.com/">Byte Unwrapped</a>
            <a href="https://github.com/darkzek/rustcraft/">Rustcraft</a>
        </div>
        <div class="socials">
            <video src="./img/linkedin.webm"></video>
            <a href="https://www.linkedin.com/in/marshall-scott-746989167/" class="fi fi-linkedin" target="_blank"></a>
            <a href="https://github.com/darkzek/" class="fi fi-github" target="_blank"></a>
            <a href="mailto:mashdowne@hotmail.co.nz" class="fi fi-email" target="_blank"></a>
        </div>
    </div>
</template>

<style>

/* Nav */

.nav {
  color: white;
  padding: 50px 10vw 50px 10vw;
}

.nav .title {
  font-family: 'Ubuntu', sans-serif;
  border-right: #cecece 2px solid;
  display: inline-block;
}

.nav .links a {
  font-size: 1.25em;
  margin-right: 25px;
  margin-top: 2px;
  color: rgb(216, 216, 216);
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

.nav .socials {
  position: absolute;
  right: 10vw;
}

.socials video {
  width: 45px;
  height: 45px;
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