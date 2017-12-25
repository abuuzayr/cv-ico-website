<template>
  <div class="reset-success">
    <Notify
      title=""
      subtitle="Message sent"
      msg="Please check your email for the password reset instructions" />
  </div>
</template>
<script>
  export default {
    name: 'Reset-success',
    middleware: 'authenticated',
  };
</script>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .reset-success {
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
