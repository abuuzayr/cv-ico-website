<script>
  import { mapGetters } from 'vuex';
  import countdown from 'countdown';

  // Declare scoped vars
  let vm;
  let date = new Date(2018, 3, 1);

  export default {
    name: 'Dashboard',
    beforeDestroy () {
      clearInterval(vm.timer)
      vm.timer = null
    },
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
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
    mounted () {
      vm.timer = setInterval(() => {
        vm.count = vm.getTimer();
      }, 1000);
    },
    computed: {
      ...mapGetters({
        isEmailVerified: 'user/isEmailVerified',
        isKYCSubmitted: 'user/isKYCSubmitted',
        isKYCVerified: 'user/isKYCVerified',
      }),
      days() {
        return vm.count.days;
      },
      hours() {
        return vm.count.hours;
      },
      min() {
        return vm.count.minutes;
      },
      sec() {
        return vm.count.seconds;
      },
    },
    methods: {
      getTimer() {
        return countdown(null, date, countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
      },
      navigate(component) {
        vm.$emit('event-navigate', component);
      },
    },
    props: ['sale'],
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
