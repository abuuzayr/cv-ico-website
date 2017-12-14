<template>
  <div class="dashboard">
    <Header />
    <Sidebar id="Sidebar" />
    <KYC />
    <div style="font-style:bold;color:white;">
      Test web3 {{ totalRaised }}
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  // Declare global scoped vars
  let vm;

  export default {
    name: 'Dashboard',
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
        balCRV: 3000,
        balETH: 100,
        totalRaised: null,
      };
    },
    async mounted() {
      vm.totalRaised = await vm.$eth.methods.totalFund().call();
    },
    computed: {
      ...mapState([
        'authentication',
      ]),
    },
  };
</script>
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
