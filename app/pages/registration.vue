<template>
  <div class="registration-page">
    <Registration></Registration>
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

  @media (max-width: $screen-xs-max) {
  }
  @media (min-width: $screen-sm-min) {
  }
  @media (min-width: $screen-md-min) {
  }
  @media (min-width: $screen-lg-min) {
  }
</style>
