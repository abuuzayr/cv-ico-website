<script>
  export default {
    name: 'ForgotPassword-Page',
  };
</script>
<template>
  <div class="forgotpassword-page">
    <b-container class="component-container">
      <Header />
      <Sidebar id="Sidebar" />
      <KYC />
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  #Sidebar {
    float: left;
  }

  .forgotpassword-page {
    @include page-mixin();
  }

  .component-container {
    max-width: 25rem;
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
