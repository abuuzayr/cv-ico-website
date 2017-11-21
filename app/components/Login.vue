<script>
  import { mapActions } from 'vuex';
  import {
    feedbackEmail,
    feedbackPassword,
    feedbackConfirmPassword,
    isValidEmail,
    isValidPassword
  } from '~/helpers/authentication';

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
        recaptchaKey: process.env.RECAPTCHA
      };
    },
    computed: {
      checkValidEmail() {
        states.email = false;

        if (vm.email.length === 0) {
          return null;
        }

        if (isValidEmail(vm.email)) {
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

        if (isValidPassword(vm.password)) {
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
      ...mapActions({
        login: 'authentication/login',
      }),
      feedbackEmail,
      feedbackPassword,
      feedbackConfirmPassword,
      checkLoginStates() {
        return !(states.email && states.password && states.recaptcha);
      },
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
