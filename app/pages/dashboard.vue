<script>
  import { mapState } from 'vuex';

  // Declare global scoped vars
  let vm;

  export default {
    name: 'Dashboard-Page',
    middleware: 'unauthenticated',
    beforeMount() {
      vm.$axios.setToken(vm.authentication.accessToken, 'Bearer');
    },
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        component: 'dashboard',
      };
    },
    computed: {
      ...mapState([
        'authentication',
      ]),
    },
    methods: {
      navigate(event) {
        vm.component = event;
      },
    },
  };
</script>
<template>
  <div class="dashboard-page">
    <b-container>
      <Header />
      <Sidebar id="Sidebar" v-on:event-navigate="navigate" />
      <Profile v-if="component == 'profile'" />
      <KYC v-if="component === 'kyc'" />
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  #Sidebar {
    float: left;
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
