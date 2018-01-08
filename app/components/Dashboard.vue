<script>
  import countdown from 'countdown';
  // Declare scoped vars
  let vm;
  let date = new Date(2018, 3, 1);

  export default {
    name: 'Dashboard',
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        verified: false,
        crv: 3095,
        eth: 10.5,
        collected: 204563,
        target: 500000,
        timer: null,
        count: this.getTimer(),
        transactions: [
          // { TxHash: 2345255, block: '4325t234', age: 40, from: 'Dickerson', to: 'Macdonald' },
          // { TxHash: 2345255, block: '4325t234', age: 21, from: 'Larsen', to: 'Shaw' },
          // { TxHash: 2345255, block: '4325t234', age: 89, from: 'Geneva', to: 'Wilson' },
          // { TxHash: 2345255, block: '4325t234', age: 38, from: 'Jami', to: 'Carney' },
          // { TxHash: 2345255, block: '4325t234', age: 40, from: 'Dickerson', to: 'Macdonald' },
          // { TxHash: 2345255, block: '4325t234', age: 21, from: 'Larsen', to: 'Shaw' },
        ],
        emptyTxn: [
          { TxHash: 2345255, block: '4325t234', age: 40, from: 'Dickerson', to: 'Macdonald' },
          { TxHash: 2345255, block: '4325t234', age: 21, from: 'Larsen', to: 'Shaw' },
          { TxHash: 2345255, block: '4325t234', age: 89, from: 'Geneva', to: 'Wilson' },
          { TxHash: 2345255, block: '4325t234', age: 38, from: 'Jami', to: 'Carney' },
          { TxHash: 2345255, block: '4325t234', age: 89, from: 'Geneva', to: 'Wilson' },
          { TxHash: 2345255, block: '4325t234', age: 38, from: 'Jami', to: 'Carney' }
        ]
      }
    },
    methods: {
      getTimer() {
        return countdown( null, date, countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS );
      },
      navigate(component) {
        this.$emit('event-navigate', component);
      },
    },
    filters: {
      numFormat: function (value) {
        if (!value) return ''
        value = value.toString()
        value = value.replace(new RegExp("^(\\d{" + (value.length%3? value.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
        value = value.replace(/\s/g, ",");
        return value;
      }
    },
    computed: {
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
    mounted () {
      this.timer = setInterval(() => {
        this.count = this.getTimer();
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
      this.timer = null
    },
    notifications: {
      errorLogin: {
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error',
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
