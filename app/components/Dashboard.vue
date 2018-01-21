<script>
  import { mapGetters } from 'vuex';

  import countdown from 'countdown';
  // Declare scoped vars
  let vm;
  let date = new Date(2018, 3, 1);

  export default {
    name: 'Dashboard',
    beforeDestroy () {
      clearInterval(this.timer)
      this.timer = null
    },
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        ethAddress: '0xd675F62eEfD415Cd3eE9E48dF8dFe8A81C3d2225',
        crv: 0,
        eth: 0,
        collected: 0,
        target: 500000,
        timer: null,
        count: this.getTimer(),
        transactions: [
          // { txNo: 0, block: 1379584, txHash: '0xfec86de092435e4c502ab26c62e1bb6deb7ce02c65270427d56dd6d35240a0ae', timestamp: 1512754703, contribution: '1 ETH', referralHash: 'ef46135efb976e4cd578b5c01186aebd39616086b58dd3a44364b7a80b1b8b61' },
          // { txNo: 0, block: 1379584, txHash: '0xfec86de092435e4c502ab26c62e1bb6deb7ce02c65270427d56dd6d35240a0ae', timestamp: 1512754703, contribution: '1 ETH', referralHash: 'ef46135efb976e4cd578b5c01186aebd39616086b58dd3a44364b7a80b1b8b61' },
          // { txNo: 0, block: 1379584, txHash: '0xfec86de092435e4c502ab26c62e1bb6deb7ce02c65270427d56dd6d35240a0ae', timestamp: 1512754703, contribution: '1 ETH', referralHash: 'ef46135efb976e4cd578b5c01186aebd39616086b58dd3a44364b7a80b1b8b61' },
          // { txNo: 0, block: 1379584, txHash: '0xfec86de092435e4c502ab26c62e1bb6deb7ce02c65270427d56dd6d35240a0ae', timestamp: 1512754703, contribution: '1 ETH', referralHash: 'ef46135efb976e4cd578b5c01186aebd39616086b58dd3a44364b7a80b1b8b61' },
          // { txNo: 0, block: 1379584, txHash: '0xfec86de092435e4c502ab26c62e1bb6deb7ce02c65270427d56dd6d35240a0ae', timestamp: 1512754703, contribution: '1 ETH', referralHash: 'ef46135efb976e4cd578b5c01186aebd39616086b58dd3a44364b7a80b1b8b61' },
          // { txNo: 0, block: 1379584, txHash: '0xfec86de092435e4c502ab26c62e1bb6deb7ce02c65270427d56dd6d35240a0ae', timestamp: 1512754703, contribution: '1 ETH', referralHash: 'ef46135efb976e4cd578b5c01186aebd39616086b58dd3a44364b7a80b1b8b61' },
        ],
        emptyTxn: [
          { txNo: 0, block: 0, txHash: '', timestamp: 0, contribution: '', referralHash: '' },
          { txNo: 0, block: 0, txHash: '', timestamp: 0, contribution: '', referralHash: '' },
          { txNo: 0, block: 0, txHash: '', timestamp: 0, contribution: '', referralHash: '' },
          { txNo: 0, block: 0, txHash: '', timestamp: 0, contribution: '', referralHash: '' },
          { txNo: 0, block: 0, txHash: '', timestamp: 0, contribution: '', referralHash: '' },
          { txNo: 0, block: 0, txHash: '', timestamp: 0, contribution: '', referralHash: '' },
        ]
      }
    },
    async mounted () {
      vm.timer = setInterval(() => {
        vm.count = vm.getTimer();
      }, 1000);

      const res = await vm.$axios.get('users?$select=eth_address');
      vm.ethAddress = res.data.data[0].eth_address;

      vm.$eth.ico.methods.totalFund().call((error, result) => {
        if (error) throw error;
        vm.collected = parseInt(vm.$eth.utils.fromWei(result));
      });

      vm.$eth.ico.methods.contributionsPerAddress(vm.ethAddress).call((error, result) => {
        if (error) throw error;
        vm.eth = parseInt(result);
        console.log(vm.eth);
      });

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
    },
    computed: {
      ...mapGetters({
        isEmailVerified: 'authentication/isEmailVerified',
      }),
      days() {
        return this.count.days;
      },
      hours() {
        return this.count.hours;
      },
      min() {
        return this.count.minutes;
      },
      sec() {
        return this.count.seconds;
      },
    },
    methods: {
      getTimer() {
        return countdown( null, date, countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS );
      },
      navigate(component) {
        this.$emit('event-navigate', component);
      },
    },
  };
</script>
<template src="./templates/dashboard.html"></template>
<style src="./styles/dashboard.scss" lang="scss" scoped></style>
<style>
  .grey-table-head thead {
    background: #f3f8fa;
  }
  .transactions th:first-child,
  .transactions tr td:first-child {
    padding-left: 30px;
  }
  .transactions th:last-child,
  .transactions tr td:last-child {
    padding-right: 15px;
  }
  .transactions th {
    font-weight: bold;
    color: #b3beca;
  }
</style>
