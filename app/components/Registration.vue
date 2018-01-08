<script>
  import { mapActions } from 'vuex';
  import marked from 'marked';
  import {
    email,
    minLength,
    sameAs,
  } from 'vuelidate/lib/validators';
  import {
    feedbackEmail,
    feedbackPassword,
    feedbackConfirmPassword,
    isValidPassword,
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
        tos: false,
      }
    },
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        markdown: '',
        referralCode: this.referral,
        recaptcha: '',
        recaptchaKey: process.env.RECAPTCHA,
        tos: '',
      };
    },
    async mounted() {
      const res = await vm.$axios.get('tos.md');
      vm.markdown = marked(res.data, { sanitize: true });
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
      checkPasswordMatch() {
        states.confirmPassword = false;

        if (vm.confirmPassword.length === 0) {
          return null;
        }

        if (vm.$v.confirmPassword.sameAsPassword) {
          states.confirmPassword = true;
          return 'valid';
        }

        return 'invalid';
      },
      checkTickedTOS() {
        states.tos = false;

        if (vm.tos.length === 0) {
          return null;
        }

        if (vm.tos) {
          states.tos = true;
          return 'valid';
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
        return !(states.email && states.password && states.confirmPassword && states.recaptcha && states.tos);
      },
      setRecaptcha(event) {
        vm.recaptcha = event;
      },
      submit(email, password, referralCode, recaptcha) {
        vm.$axios.post('users', {
          email,
          password,
          referralCode,
          recaptcha,
        })
          .then(() => {
            vm.$notify({
              group: 'announce-info',
              title: 'Registation Successful',
              text: 'You have successfully registered. Check your email for \
                     further instructions.',
            });
            setTimeout(() => {
              vm.$router.push('registration/success');
            }, 5000);
          })
          .catch((err) => {
            vm.$refs.recaptcha.reset();
            vm.password = '';
            vm.confirmPassword = '';

            switch (err.response.status) {
              case 400:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Empty Referral Code',
                  text: 'A referral code is needed for early registration.',
                });
                break;
              case 406:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Invalid reCAPTCHA Token',
                  text: 'An error was encountered with reCAPTCHA. Please try again.',
                });
                break;
              case 409:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Account Already Exists',
                  text: 'The email entered already exists. Please login using \
                         existing registered email.',
                });
                setTimeout(() => {
                  vm.$router.push('login');
                }, 5000);
                break;
              case 422:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Invalid Referral Code',
                  text: 'The referral code entered could not be found or is \
                         incorrect. Kindly enter the correct referral code.',
                });
                break;
              default:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Unexpected Error Encountered',
                  text: 'The application has encountered an unexpected error. \
                         Please contact support.',
                });
                break;
            }
          });
      },
    },
    props: ['referral'],
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
<template src="./templates/registration.html"></template>
<style src="./styles/registration.scss" lang="scss" scoped></style>
<style>
  .modal-header .close {
    padding: 15px;
    margin: 0;
    cursor: pointer;
    outline: none;
  }

  .modal-header .modal-title {
    padding: 10px 30px;
  }
</style>
