<template>
  <div class="about">
    <div class="content">
      <p>Hi! I am a Front-End Developer with a passion for computer graphics.</p>
      <p>
        I take pride in my ability to turn complex ideas into simple and elegant
        solutions. I am always eager to take on new challenges and learn new
        technologies. My passion for graphics allows me to bring a unique
        perspective to my work and helps me create visually stunning interfaces.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  padding: 0px 80px;
  max-width: 1160px;
  font-size: 24px;
  line-height: 1.6;
  color: white;
  margin: auto;
  margin-top: 280px;
  min-height: 50vh;

  .content {
    max-width: 700px;
  }
}

@media screen and (max-width: 768px) {
  .about {
    padding: 0px 40px;
  }
}

p {
  margin-bottom: 30px;
}
</style>
