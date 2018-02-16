<script>
  import { mapGetters, mapState } from 'vuex';
  import countdown from 'countdown';

  // Declare scoped vars
  let vm;
  const date = new Date(2018, 3, 1);

  export default {
    name: 'Dashboard',
    beforeDestroy() {
      clearInterval(vm.timer);
      vm.timer = null;
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
        transactions: [],
        emptyTxn: [],
      };
    },
    mounted() {
      vm.email = vm.user.email;
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
      ...mapState([
        'user',
      ]),
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
        return countdown(
          null,
          date,
          countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS, // eslint-disable-line no-bitwise,max-len
        );
      },
      navigate(component) {
        vm.$emit('event-navigate', component);
      },
      verifyEmail() {
        vm.$axios.post('/api/authManagement', {
          action: 'resendVerifySignup',
          value: {
            email: vm.email,
          },
        })
          .then(() => {
            vm.$notify({
              group: 'notify',
              title: 'Verification Email Sent',
              text: 'A verification email was sent to your email address.',
              type: 'success',
            });
          });
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
