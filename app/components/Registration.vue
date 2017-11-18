<script>
  import { mapActions } from 'vuex';
  import authentication from '~/helpers/authentication';

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
      }
    },
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
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
      checkRegistrationStates() {
        return !(states.email && states.password && states.confirmPassword);
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
        register: 'authentication/register',
      }),
      submit(email, password) {
        vm.register({ email, password }).then(() => {
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
