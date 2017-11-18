<template>
  <div class="kyc-page">
    <KYC></KYC>
  </div>
</template>
<script>
  // Declare scoped vars
  let vm;

  export default {
    name: 'KYC-Page',
    created() {
      // Instantiate view model
      vm = this;
    },
    middleware: 'unauthenticated',
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
