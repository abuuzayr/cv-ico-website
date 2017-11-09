<script>
  import { mapActions } from 'vuex';

  // Declare scoped vars
  let vm;

  export default {
    name: 'Login',
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        stateEmail: false,
        statePassword: false,
        stateConfirmPassword: false,
      };
    },
    computed: {
      checkLoginStates() {
        return !(vm.stateEmail &&
                 vm.statePassword);
      },
      checkSignupStates() {
        return !(vm.stateEmail &&
                 vm.statePassword &&
                 vm.stateConfirmPassword);
      },
      checkValidEmail() {
        const re = /\S+@\S+\.\S+/;
        let result;

        if (vm.email.length === 0) {
          result = null;
        } else if (re.test(vm.email)) {
          vm.stateEmail = true;
          result = 'valid';
        } else {
          vm.stateEmail = false;
          result = 'invalid';
        }

        return result;
      },
      checkValidPassword() {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        let result;

        if (vm.password.length === 0) {
          result = null;
        } else if (re.test(vm.password)) {
          vm.statePassword = true;
          result = 'valid';
        } else {
          vm.statePassword = false;
          result = 'invalid';
        }

        return result;
      },
      checkPasswordMatch() {
        let result;

        if (vm.confirmPassword === '') {
          result = null;
        } else if (vm.password === vm.confirmPassword) {
          vm.stateConfirmPassword = true;
          result = 'valid';
        } else {
          vm.stateConfirmPassword = false;
          result = 'invalid';
        }

        return result;
      },
    },
    methods: {
      clear() {
        vm.email = '';
        vm.password = '';
        vm.confirmPassword = '';
        vm.stateEmail = false;
        vm.statePassword = false;
        vm.stateConfirmPassword = false;
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
      gotoRoute() {
        vm.$router.push('dashboard');
      },
      ...mapActions([
        'jwt',
        'login',
        'logout',
        'register',
      ]),
    },
    // middleware: 'anonymous',
    notifications: {
      errorLogin: {
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error',
      },
      successRegistration: {
        title: 'Registration Successful',
        message: 'Please check your email',
        type: 'success',
      },
    },
  };
</script>
<template src="~/templates/login.html"></template>
<style src="~/assets/styles/login.scss" lang="scss" scoped></style>
