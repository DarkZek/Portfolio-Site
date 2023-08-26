<template>
  <div class="content">
    <div class="background"></div>
    <div class="centered text">
      <div class="container">
        <div class="row">
          <div class="back" @click.stop="router.push('/#rustcraft')">
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="icon" />
          </div>
          <div class="brand">
            <img class="logo" src="/public/content/rustcraft/logo_hd.png" />
            <span>RustCraft</span>
          </div>
        </div>
        <div class="row text-center">
          <video
            autoplay
            muted
            loop
            poster="/content/rustcraft/output_image.jpg"
            onclick="window.open('/content/rustcraft/video_1920x1080.mp4', '_blank');"
          >
            <source src="/content/rustcraft/video_1280x720.mp4" type="video/mp4" />
          </video>
        </div>
        <br />
        <div class="row">
          <div class="expanding-col">
            <div class="row" style="max-height: 50; overflow: hidden">
              <div
                class="github-info col"
                onclick="window.open('https://github.com/darkzek/rustcraft', '_blank');"
              >
                <img src="/content/rustcraft/GitHub_Logo.png" />
                <div class="col stars github-stat">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    version="1.1"
                    data-view-component="true"
                    height="16"
                    width="16"
                  >
                    <path
                      style="fill: #f0b106"
                      fill-rule="evenodd"
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                    ></path>
                  </svg>
                  <a class="label">Stars</a>
                  <a class="value">{{ stars ?? "↺" }}</a>
                </div>
                <div class="col github-stat">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    version="1.1"
                    data-view-component="true"
                    height="16"
                    width="16"
                    class="octicon octicon-repo-forked"
                  >
                    <path
                      style="fill: #adadad"
                      fill-rule="evenodd"
                      d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    ></path>
                  </svg>
                  <a class="label">Forks</a>
                  <a class="value">{{ forks ?? "↺" }}</a>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="post-mortem">
                <h2>RustCraft Mid Project Review</h2>
                <p>
                  RustCraft has been by far the most advanced and educational of
                  my personal projects to date. It has pushed me to learning
                  many new programming concepts from Graphics APIs to Entity
                  Component Systems helping me to understand the game engine
                  pipeline more fully. As it has been a learning process, I
                  wanted to reflect on the decisions I have made this far and
                  what I would do differently with my new-found knowledge.
                  <br />
                  <br />
                  <b>Rust</b><br />
                  I chose Rust because of my goal to achieve high performance
                  with the project, as well as to expose myself to lower-level
                  languages and concepts to further understand the overall
                  software toolchain. This is one of the choices I am most happy
                  with as Rust allowed me to create a very robust codebase that
                  was clean and exposed a safe interface to interact with while
                  not restricting my ability to heavily optimise.
                  <br />In the beginning of the project this decision seemed
                  like a poor one as I had only used Rust in a very limited
                  capacity before. The borrow checking functionality of Rust
                  made the object-oriented approach I took to creating the
                  engine very difficult. I managed to get basic functionality
                  working, however anything that required access to more than
                  one variable at a time meant that the project would refuse to
                  compile. To solve this and many other problems I settled on
                  using an Entity Component System (ECS) for my core engine
                  loop. This would not only solve my Rust borrowing checker
                  problems but upon reflection turned out to be a large strength
                  of the project, allowing me to compartmentalize every aspect
                  of the engine to provide a nice and simplified codebase. This
                  is because I used an ECS to manage my core render loop, not
                  just the user facing objects. This means that to begin a frame
                  I simply dispatch the mesh building system, the texture
                  system, the UI system and then finally render the results to
                  the screen. This worked especially well and meant that the
                  entire engine well utilised multiple threads. <br />At the
                  current point in the project my experience in Rust means that
                  it is not taking significantly longer to write than equivalent
                  code in another language while still promising safety and
                  stability. I think the decision to use Rust for this project
                  was a very good one and one that has helped me to deliver one
                  of the main goals of the project, to have performant voxel
                  rendering. <br /><br />
                  <b>Vulkan-like wgpu-rs</b><br />
                  The graphics API used for RustCraft was a very important one,
                  I wanted the flexibility to create a highly compatible and
                  performant voxel engine. These two attributes are hard to get
                  together, I looked through many of the graphics crates in the
                  Rust library and settled on wgpu-rs. It is essentially a
                  wrapper over Vulkan, DirectX and WebGPU simply allowing code
                  to be run on all three of these API’s while still being low
                  level enough to optimise for speed. This was another major
                  strength of RustCraft, usually porting engines to use multiple
                  graphics API’s and support web at all is a gigantic
                  undertaking – however because of this library RustCraft was
                  able to run on the web, on desktops, gaming consoles and
                  Linux!
                  <br />This was also a major change from what I am used to,
                  previously only having used GUI libraries such as that on
                  Android. Having to allocate buffers manually and schedule
                  render passes led to me developing my knowledge of the
                  graphics ecosystem significantly. The decision to use wgpu-rs
                  meant that I kept options for alternate platforms open, while
                  allowing for high amounts of optimisation and while being not
                  as verbose as direct Vulkan. I am very happy with this
                  decision; however, it is one of the biggest challenges of the
                  project. <br />If I were to do the project again, I would have
                  approached the problem with more planning and abstraction
                  rather than the direct approach I have taken to storage. This
                  is especially represented in Mesh storage where instead of
                  abstracting a mesh into a single variable, it is spread over
                  buffers, descriptors and assets which makes it messy and
                  overcomplicated to work with. Creating generic types like this
                  that would be used around the engine, and a more cohesive
                  vision for how the graphics interacts with the rest of the
                  engine would increase the code quality. <br /><br />
                  I really enjoyed making RustCraft, from beginning to its
                  current state it has taught me so much and I can’t wait to
                  continue learning in the future!
                </p>
              </div>
            </div>
            <br />
            <br />
            <div>
              <iframe
              loading="lazy"
              width="800"
              height="450"
              src="https://www.youtube.com/embed/r3HJ04u0-2Q"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const stars = ref(undefined);
const forks = ref(undefined);

fetch("https://api.github.com/repos/DarkZek/RustCraft").then((response) => {
  response.json().then((data) => {
    stars.value = data.stargazers_count;
    forks.value = data.forks_count;
  });
});
</script>

<style scoped lang="scss">
$iphonePadding: 4.5%;
$iphonePaddingTop: 30%;

$scale: 0.75;

.content {
  padding: 40px 0px 0px 0px;
  max-width: 1000px;
  font-size: 18px;
  line-height: 1.6;
  color: #cfcfcf;
  margin: auto;
  margin-top: 110px;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
}

.container {
  padding-bottom: 0px;
}

video {
  max-width: 70vw !important;
  overflow: hidden;
  border-radius: 5px;
  justify-content: center;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}

.github {
  max-height: 18vh;
  overflow: hidden;
  padding: 0px !important;
  border-radius: 5px;
  box-shadow: 0 0 10px #b9b9b9;
  transition: ease-in-out 0.1s box-shadow;
  cursor: pointer;
}

.github:hover {
  box-shadow: 0 0 12px #9b9b9b;
}

.github-info {
  border-radius: 10px;
  background-color: #f8f8f8;
  height: 48px !important;
  display: flex;
  padding-top: 4px;
  padding-left: 10px;
  cursor: pointer;
  max-width: 100%;
  overflow: auto hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.github-info img {
  height: 25px;
  padding-right: 10px;
  margin-top: 7px;
  vertical-align: middle;
}

.github-stat {
  border-radius: 10px;
  border: 1px #7e7e7e solid;
  background-color: white;
  min-height: 40px !important;
  height: 40px !important;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  padding-top: 4px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  font-size: 16px;
  transition: border 0.1s, background-color 0.1s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }
}

.github-stat svg {
  margin-top: 6px;
  margin-right: 4px;
}

.github-stat .label {
  color: #6b6b6b;
  text-decoration: none;
  padding-top: 2px;
  padding-right: 10px;
  padding-bottom: 2px;
  display: inline-block;
  vertical-align: middle;
}

.github-stat .value {
  border-left: 1px #d6d6d6 solid;
  padding-left: 9px;
  text-decoration: none;
  color: black;
  padding-top: 2px;
  padding-bottom: 2px;
  display: inline-block;
  vertical-align: middle;
}

.stars {
  border: 1px #f0b106 solid !important;

  &:hover {
    border: 1px #ac810a solid !important;
  }
}

.stars .label {
  color: #f0b106 !important;
}

.stars .value {
  border-left: 1px #f0b106 solid !important;
}

.brand {
  max-width: 300px !important;
  display: block;
  margin: auto;
  margin-bottom: 60px;
}

.brand .logo {
  width: 70px;
  display: inline-block;
  margin-bottom: -15px;
  padding-right: 10px;
}

.brand span {
  display: inline-block;
  font-size: 2.5rem;
  font-weight: bold;
  width: 200px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

iframe {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

@supports(aspect-ratio: 800 / 450) {
  iframe {
    aspect-ratio: 800 / 450;
    height: unset;
  }
}

.expanding-col {
  max-width: 60vw !important;
  display: block;
  margin: 0 auto;
  justify-content: center;
}

@media only screen and (max-width: 1000px) {
  .expanding-col {
    max-width: 80vw !important;
  }
}

.btn-primary {
  border-color: #eb4e56 !important;
  border-radius: 1000px !important;
  background-color: #eb4e56 !important;
}

.gradient {
  height: 300px;
  width: 100vw;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(238, 238, 238) 100%
  );
  z-index: -1;
}

p {
  font-size: 16px;
  line-height: 1.6;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.logo {
  width: min(60vw, 400px);
}

.row {
  flex-wrap: nowrap;
}

.phone-text {
  padding: 180px 0px 0px 60px;
}

h3,
h2,
b {
  color: white;
}

.background {
  position:fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url("/content/rustcraft/Background.png");
  background-size: cover;
  z-index: -1;
}

@media screen and (max-width: 600px) {
  .back {
    display: none;
  }
}

.back {
  position: absolute;
  padding: 10px;
  border-radius: 40px;
  width: 60px;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.2s ease-in-out;
  top: 10px;

  &:hover {
    background-color: rgba(200, 200, 200, 0.15);
  }
}
</style>
