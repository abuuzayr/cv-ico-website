<script>
  import { mapActions } from 'vuex';
  import {
    feedbackEmail,
    isValidEmail,
  } from '~/helpers/authentication';

  // Declare global scoped vars
  let vm;
  let states;

  export default {
    name: 'Forgot-Password',
    created() {
      // Instantiate view model
      vm = this;

      // Instantiate states
      states = {
        email: false,
        recaptcha: false,
      }
    },
    data() {
      return {
        email: '',
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
      feedbackEmail,
      checkResetStates() {
        return !(states.email && states.recaptcha);
      },
      setRecaptcha(event) {
        vm.recaptcha = event;
      },
      submit(email, recaptcha) {
      },
    },
    notifications: {
      successReset: {
        title: 'Message Sent',
        message: 'Please check your email for the password reset instructions',
        type: 'success',
      },
    },
  };
</script>
<template src="./templates/forgot_password.html"></template>
<style src="./styles/forgot_password.scss" lang="scss" scoped></style>
