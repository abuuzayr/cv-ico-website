<script>
  import { mapActions } from 'vuex';
  import {
    email,
    sameAs,
  } from 'vuelidate/lib/validators';
  import {
    feedbackEmail,
    feedbackPassword,
    feedbackConfirmPassword,
    isValidPassword,
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
        recaptchaKey: process.env.RECAPTCHA,
      };
    },
    computed: {
      checkValidEmail() {
        states.email = false;

        if (vm.email.length === 0) {
          return null;
        }

        if (vm.$v.email.email) {
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

        if (vm.recaptcha) {
          states.recaptcha = true;
          return 'valid';
        }

        return 'invalid';
      },
    },
    methods: {
      ...mapActions({
        jwt: 'authentication/jwt',
        login: 'authentication/login',
        setPersistence: 'user/setPersistence',
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
      submit(_email, _password, _recaptcha) {
        vm.login({ email: _email, password: _password, recaptcha: _recaptcha })
          .then(() => {
            vm.setPersistence();
            vm.$router.push('/dashboard');
          })
          .catch((error) => {
            vm.$refs.recaptcha.reset();
            vm.password = '';

            switch (error.response.status) {
              case 401:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Invalid Login',
                  text: 'The email or password entered is invalid.',
                });
                break;
              case 406:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Invalid reCAPTCHA Token',
                  text: 'An error was encountered with reCAPTCHA. Please try again.',
                });
                break;
              default:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Unexpected Error Encountered',
                  text: `The application has encountered an unexpected error.
                         Please contact support.`,
                });
                break;
            }
          });
      },
    },
    validations: {
      email: {
        email,
      },
      confirmPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  };
</script>
<template src="./templates/login.html"></template>
<style src="./styles/login.scss" lang="scss" scoped></style>
