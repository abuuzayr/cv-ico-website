<script>
  // Declare global scoped vars
  let vm;
  let states;

  export default {
    name: 'resetToken',
    created() {
      // Instantiate view model
      vm = this;

      states = {
        password: false,
        confirmPassword: false,
      }
    },
    data() {
      return {
        password: '',
        confirmPassword: '',
      };
    },
    computed: {
      checkValidPassword() {
        states.password = false;

        if (vm.password.length === 0) {
          return null;
        }

        if (authentication.isValidPassword(vm.password)) {
          states.password = true;
          return 'valid';
        }

        return 'invalid';
      },
      checkPasswordMatch() {
        states.confirmPassword = false;

        if (vm.confirmPassword === '') {
          return null;
        }

        if (vm.password === vm.confirmPassword) {
          states.confirmPassword = true;
          return'valid';
        }

        return 'invalid';
      },
    },
    methods: {
      checkPasswordStates() {
        return !(states.password && states.confirmPassword);
      },
      feedbackPassword(input) {
        return input === 'invalid' ? 'Password must contain at least eight '
                                      + 'characters: both lower and uppercase letters, '
                                      + 'at least one number, '
                                      + 'and at least one special character' : '';
      },
      feedbackConfirmPassword(input) {
        return input === 'invalid' ? 'Password does not match!' : '';
      },
      reset(password) {
        vm.$axios.$post('authManagement', {
          'action': 'resetPwdLong',
          'value': {
            'token': vm.$route.params.resetToken,
            'password': password,
          }
        });
      },
    },
  };
</script>
<template src="~/templates/forgot_password.html"></template>
<style src="~/assets/styles/forgot_password.scss" lang="scss" scoped></style>
