<template>
  <div class="registration-page">
    <Registration v-bind:referral-code="$route.query.r"></Registration>
  </div>
</template>
<script>
  export default {
    name: 'Registration-Page',
    middleware: 'authenticated',
  };
</script>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .registration-page {
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
