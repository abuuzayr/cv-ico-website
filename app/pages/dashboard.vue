<template>
  <div class="dashboard-page">
    <Dashboard></Dashboard>
  </div>
</template>
<script>
  // Declare scoped vars
  let vm;
  import * as Cookies from 'js-cookie';

  export default {
    name: 'Dashboard-Page',
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
