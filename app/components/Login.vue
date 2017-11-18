<script>
  import { mapActions } from 'vuex';
  import authentication from '~/helpers/authentication';

  // Declare scoped vars
  let vm;
  let states;

  export default {
    name: 'Login',
    created() {
      // Instantiate view model
      vm = this;

      // Instantiate states
      states = {
        email: false,
        password: false,
        recaptcha: false,
      };
    },
    data() {
      return {
        email: '',
        password: '',
        recaptcha: '',
      };
    },
    computed: {
      checkValidEmail() {
        states.email = false;

        if (vm.email.length === 0) {
          return null;
        }

        if (authentication.isValidEmail(vm.email)) {
          states.email = true;
          return 'valid';
        }

        return 'invalid';
      },
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
      checkValidRecaptcha() {
        states.recaptcha = false;

        if (vm.recaptcha !== '') {
          states.recaptcha = true;
          return 'valid';
        }

        return 'invalid';
      },
    },
    methods: {
      checkLoginStates() {
        return !(states.email && states.password && states.recaptcha);
      },
      feedbackEmail(input) {
        return input === 'invalid' ? 'Please enter a valid email address' : '';
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
      ...mapActions({
        login: 'authentication/login',
      }),
      setRecaptcha(event) {
        vm.recaptcha = event;
      },
      submit(email, password, recaptcha) {
        vm.login({ email, password, recaptcha }).then(() => {
          vm.$router.push('dashboard');
        });
      },
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
<template src="~/templates/login.html"></template>
<style src="~/assets/styles/login.scss" lang="scss" scoped></style>
