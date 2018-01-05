<script>
  export default {
    name: 'Registration-Page',
    middleware: 'authenticated',
  };
</script>
<template>
  <div class="registration-page">
    <b-container class="component-container">
      <Registration v-bind:referral="$route.query.r" />
      <NeedHelp />
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .registration-page {
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
