<script>
  import { mapActions } from 'vuex';
  import {
    feedbackEmail,
    feedbackPassword,
    feedbackConfirmPassword,
    isValidEmail,
    isValidPassword
  } from '~/helpers/authentication';

  // Declare global scoped vars
  let vm;
  let states;

  export default {
    name: 'Registration',
    created() {
      // Instantiate view model
      vm = this;

      // Instantiate states
      states = {
        email: false,
        password: false,
        confirmPassword: false,
        recaptcha: false,
      }
    },
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
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
      ...mapActions({
        register: 'authentication/register',
      }),
      feedbackEmail,
      feedbackPassword,
      feedbackConfirmPassword,
      checkRegistrationStates() {
        return !(states.email && states.password && states.confirmPassword && states.recaptcha);
      },
      setRecaptcha(event) {
        vm.recaptcha = event;
      },
      submit(email, password, recaptcha) {
        vm.register({ email, password, recaptcha }).then(() => {
          vm.$router.push('dashboard');
        });
      },
    },
    notifications: {
      successRegistration: {
        title: 'Registration Successful',
        message: 'Please check your email',
        type: 'success',
      },
    },
  };
</script>
<template src="~/templates/registration.html"></template>
<style src="~/assets/styles/registration.scss" lang="scss" scoped></style>
