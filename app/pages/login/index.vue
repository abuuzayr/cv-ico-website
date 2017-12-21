<template>
  <div class="login-page">
    <Login></Login>
  </div>
</template>
<script>
  // Declare scoped vars
  let vm;

  export default {
    name: 'Login-Page',
    created() {
      // Instantiate view model
      vm = this;
    },
    middleware: 'authenticated',
  };
</script>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .login-page {
    height: 100%;
    background: url('~@/assets/images/full-size-bg.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  @media (max-width: $screen-xs-max) {
  }
  @media (min-width: $screen-sm-min) {
  }
  @media (min-width: $screen-md-min) {
  }
  @media (min-width: $screen-lg-min) {
  }
</style>
