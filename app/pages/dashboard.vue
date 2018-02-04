<script>
  import { mapState } from 'vuex';

  // Declare global scoped vars
  let vm;

  export default {
    name: 'Dashboard-Page',
    async asyncData({ $axios, $eth, store }) {
      const { data } = await $axios.get(`users/${store.state.user.userID}`);

      let fields = {
        idTypes: [{
            text: 'Identification Type',
            value: null
          },
          'PASSPORT', 'DRIVING LICENSE'
        ],
        genders: [{
            text: 'Gender',
            value: null
          },
          'MALE', 'FEMALE'
        ],
        countries: [{
          text: 'Country',
          value: null,
        }],
        nationalities: [{
          text: 'Nationality',
          value: null
        }],
      }

      let sale = {
        totalCollected: 0,
        userContribution: 0,
        userTxHistory: {},
        userTotalCRV: 0,
      };

      fields.countries = fields.countries.concat((await $axios.get('countries.txt')).data.split('\n'));
      fields.nationalities = fields.nationalities.concat((await $axios.get('nationalities.txt')).data.split('\n'));

      sale.totalCollected = await $eth.ico.methods.totalFund().call();
      sale.totalCollected = parseInt($eth.utils.fromWei(sale.totalCollected));

      sale.userContribution = await $eth.ico.methods.contributionsPerAddress(data.kyc.eth_address).call();
      sale.userContribution = parseInt(sale.userContribution);

      // const addressTopic = `0x${'0'.repeat(24)}${vm.ethAddress.substring(2)}`;
      // const blockNumber = vm.$eth.utils.toHex(1379584);
      // const topic0 = vm.$eth.utils.sha3('Contribute(uint256,uint256,address,address,uint256,bytes32)');
      // vm.$axios.$post('https://rinkeby.infura.io/VihYi00x9NbdZ1abMuRz', {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //   },
      //   jsonrpc: '2.0',
      //   method: 'eth_getLogs',
      //   params: [{
      //     topics: [topic0, addressTopic],
      //     fromBlock: blockNumber,
      //     address: vm.ethAddress,
      //   }],
      //   id: 1,
      // }).then((err, res) => {
      //   console.log(err);
      //   console.log(res);
      // });

      // sale.userTotalCRV = await $eth.ico.methods.getPromisedCRVTokenAmount(data.kyc.eth_address).call();

      return {
        data,
        fields,
        sale,
      };
    },
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
    middleware: 'unauthenticated',
  };
</script>
<template>
  <div class="dashboard-page">
    <Header v-bind:data="data" />
    <MobileHeader v-on:event-navigate="navigate" />
    <div class="page">
      <Sidebar id="Sidebar" v-on:event-navigate="navigate" />
      <div class="side-page">
        <Dashboard
          v-if="component == 'dashboard'"
          v-on:event-navigate="navigate"
          v-bind:sale="sale"
        />
        <MyProfile
          v-if="component == 'myprofile'"
          v-bind:data="data"
          v-bind:fields="fields"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .page {
    display: flex;
    align-items: start;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  #Sidebar {
    flex: 0 0 250px;
  }

  .side-page {
    flex: 1 1 auto;
    background: #f3f7fa;
    min-height: calc(100vh);
    height: 100%;
  }

  .dashboard-page {
    background: $blue-bg;
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
