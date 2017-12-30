<script>
  export default {
    name: 'RegistrationSuccess-Page',
    middleware: 'authenticated',
  };
</script>
<template>
  <div class="registration-success">
    <Notify
      title="Create an account"
      subtitle="Thank you for registering"
      msg="Please check your email for the verification link"
    />
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .registration-success {
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
