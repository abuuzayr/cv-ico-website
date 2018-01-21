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
<template>
  <div class="login-page">
    <b-container class="component-container">
      <Login />
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .login-page {
    @include page-mixin();
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
