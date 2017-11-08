<template>
  <div class="logo">
    <div class="container">
      <img src="~assets/images/logo.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Logo',
};
</script>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  @media (max-width: $screen-xs-max) {
    img {
      width: 60%;
      margin-bottom: 7vw;
    }
  }
  @media (min-width: $screen-sm-min) {
    img {
      width: 35%;
      margin-bottom: 2vw;
      margin-top: -0.5vw;
    }
  }
  @media (min-width: $screen-md-min) {
    img {
      width: 35%;
      margin-bottom: 2vw;
      margin-top: -0.5vw;
    }
  }
  @media (min-width: $screen-lg-min) {
    img {
      width: 30%;
      margin-bottom: 2vw;
      margin-top: -1vw;
    }
  }
  @media (min-width: $screen-xl-min) {
    img {
      width: 30%;
      margin-bottom: 1vw;
      margin-top: -1vw;
    }
  }
</style>
