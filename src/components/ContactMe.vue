<template>
  <div class="container">
    <div class="title">
      <h3 class="blur">Get In Touch</h3>
      <h3 class="blur2">Get In Touch</h3>
      <h3>Get In Touch</h3>
    </div>
    <div class="icons">
      <div class="linkedin">
        <font-awesome-icon icon="fa-brands fa-linkedin-in" size="40px" />
      </div>
      <div class="email">
        <font-awesome-icon icon="fa-solid fa-envelope" size="40px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1160px;
  padding: 0 80px;
  width: 100vw;
  margin: auto;
  text-align: center;
  margin-top: 80px;

  .title {
    width: 300px;
    margin: 0 auto;
    position: relative;

    h3 {
      font-size: 40px;
      margin-bottom: 20px;
      background-image: url(/img/background.webp);
      background-size: 400px;
      -webkit-background-clip: text;
      top: 0px;
      text-align: center;
      width: 100%;
      color: transparent;

      &.blur {
        filter: blur(5px);
        position: absolute;
        opacity: 0.3;
        pointer-events: none;
      }

      &.blur2 {
        filter: blur(25px);
        position: absolute;
        pointer-events: none;
      }
    }
  }
}

.icons {
  font-size: 90px;
  gap: 120px;
  display: flex;
  justify-content: center;
  padding: 60px 3px;

  .linkedin {
    width: 90px;
    height: 90px;
  }

  .linkedin::before {
    content: "";
    background-color: #0a66c22a;
    filter: blur(50px);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 20px;
    left: 0px;
  }

  .email {
    width: 90px;
    height: 90px;
  }

  .email::before {
    content: "";
    background-color: #ffffff2a;
    filter: blur(50px);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 20px;
    left: 0px;
  }
}
</style>
