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
      subtitle=""
      msg="Please check your email for the verification link"
    />
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .registration-success {
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
