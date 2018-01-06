<template>
  <div class="forgot-page">
    <b-container class="component-container">
      <ForgotPassword />
    </b-container>
  </div>
</template>
<script>
  export default {
    name: 'Forgot-Password-Page',
    middleware: 'authenticated',
  };
</script>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .forgot-page {
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
