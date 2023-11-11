<template>
  <div class="content">
    <div class="background"></div>
    <div class="centered text">
      <div class="back" @click.stop="router.push('/#mobingo')">
        <font-awesome-icon icon="fa-solid fa-chevron-left" class="icon" />
        Back
      </div>
      <img src="/img/charchingo.png" class="logo" />
      <p>
        Mobingo is an innovative white label online gaming platform created by
        Ruby Play Network specifically for customers in Alabama. This
        commercial-level application was developed to provide an online
        experience for players who enjoy in-person bingo hall games to
        experience the same fun in the comfort of their own homes.
      </p>
    </div>
    <div class="text row demo-row">
      <div class="demo" style="--size: 300px">
        <iframe src="https://play.charchingo.com" ref="iframe"></iframe>
        <img src="/img/iphone.png" />
        <a class="title">play.charchingo.com</a>
        <div class="refresh" tabindex="0" @click="refresh"></div>
      </div>
      <div class="phone-text">
        <h3>Features</h3>
        <p>
          Mobingo offers a variety of features to enhance the gaming experience,
          including the ability to accept donations through various payment
          providers, facilitate online gaming, and provide rewards and jackpots
          to players. With its user-friendly interface and exciting gameplay
          options, Mobingo based sites are quickly becoming a popular choice for
          online gaming enthusiasts in Alabama.
        </p>
      </div>
    </div>
    <div class="centered text">
      <p>
        In my role as a UI designer for the project, I was tasked with
        refreshing the user interface. The previous design was <b>difficult to use
        and confusing to navigate</b>, especially on mobile devices. To address this
        issue, I created mockups for a mobile-first website that was clean,
        smooth, and unobtrusive. Over the course of several months, <b>I gradually
        transitioned the interface to a new design</b>, culminating in the release
        of version 2 of the application. This update was met with very positive
        reviews from users. Since then, I have continued to work with other team
        members to add new functionality and improve administrative features.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const iframe = ref<HTMLIFrameElement>();

function refresh() {
  if (iframe.value) {
    // eslint-disable-next-line no-self-assign
    iframe.value.src = iframe.value.src;
  }
}
</script>

<style scoped lang="scss">
$iphonePadding: 4.5%;
$iphonePaddingTop: 30%;

$scale: 0.75;

.content {
  padding: 0px 80px;
  max-width: 1000px;
  font-size: 18px;
  line-height: 1.6;
  color: #cfcfcf;
  margin: auto;
  margin-top: 110px;
  min-height: 50vh;
  display: flex;
  flex-direction: column;

  .demo {
    min-width: var(--size);
    max-width: var(--size);
    min-height: calc(var(--size) / 0.48733153638);
    max-height: calc(var(--size) / 0.48733153638);
    container-type: inline-size;
    margin: 70px 0px;

    img {
      width: 100%;
      position: absolute;
      left: 0px;
      pointer-events: none;
      top: 0px;
    }

    .title {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      margin-top: 18.5%;
      color: #0f0f0f;
      text-align: center;
      font-size: 4.6cqw;
    }

    .refresh {
      position: absolute;
      position: absolute;
      right: 8%;
      top: 0px;
      margin-top: 18.5%;
      width: 7%;
      aspect-ratio: 1;
      border-radius: 100%;
      cursor: pointer;
    }

    iframe {
      border: none;
      border-radius: 0 0 10% 10%;
      overflow: hidden;
      width: calc(calc(100% - ($iphonePadding * 2)) / $scale);
      height: calc(calc(100% - $iphonePaddingTop / 2) / $scale);
      margin-left: $iphonePadding;
      margin-top: $iphonePaddingTop;
      overflow: hidden;
      transform: scale($scale);
      -webkit-transform-origin: 0 0;
      background-color: white;
      position: absolute;

      &::-webkit-scrollbar {
        width: 10px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: rgb(41, 41, 41);
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #474747;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #5a5a5a;
      }
    }
  }
}

// When screen size is mobile
@media screen and (max-width: 800px) {
  .content {
    padding: 20px 20px;
  }
  .back {
    left: -5px;
  }
}

.button {
  background-color: #fca326;
  border-radius: 10px;
  padding: 8px 40px;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  .icon {
    font-size: 1rem;
    margin-bottom: 2px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    background-color: #fc6d26;
  }

  &:hover .icon {
    transform: translateX(5px);
  }
}

p {
  line-height: 2;
}

.logo {
  width: min(60vw, 400px);
}

.centered {
  text-align: center;
}

.demo-row {
  flex-wrap: nowrap;
}

.phone-text {
  padding: 180px 0px 0px 60px;
}

@media screen and (max-width: 900px) {
  .demo-row {
    flex-direction: column;
    align-items: center;
  }
  .phone-text {
    padding: 10px 0px 0px 0px;
  }

  .centered p {
    text-align: left;
  }
}

h3 {
  color: white;
}

.background {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-image: url("/content/mobingo/Background.png");
  background-size: cover;
  z-index: -1;
}

@media screen and (max-width: 600px) {
  .back {
    display: none !important;
  }
}

.back {
  position: absolute;
  padding: 10px 20px;
  border-radius: 40px;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.2s ease-in-out;
  top: 40px;
  display: flex;

  svg {
    margin-top: 5px;
    margin-right: 15px;
  }

  &:hover {
    background-color: rgba(200, 200, 200, 0.15);
  }
}
</style>
