<script>
  export default {
    name: 'ForgotPassword-Page',
  };
</script>
<template>
  <div class="forgotpassword-page">
    <b-container class="component-container">
      <ForgotPassword />
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .forgotpassword-page {
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
