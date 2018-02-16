<script>
  import { email } from 'vuelidate/lib/validators';
  import { feedbackEmail } from '~/helpers/authentication';

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
      };
    },
    data() {
      return {
        email: '',
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
      submit(_email, _recaptcha) {
        vm.$axios.post('/api/authManagement', {
          action: 'sendResetPwd',
          value: {
            email: _email,
          },
          recaptcha: _recaptcha,
        })
          .then(() => {
            vm.$notify({
              group: 'announce-info',
              title: 'Initiated Reset Password',
              text: 'Check your email for password reset instructions.',
            });
            setTimeout(() => {
              vm.$router.push('/');
            }, 5000);
          })
          .catch((error) => {
            vm.$refs.recaptcha.reset();

            switch (error.response.status) {
              case 400:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Unverified Email Address or User Not Found',
                  text: `The email address entered is not found or verified
                         in our system. If the email is unverified, a
                         verification email has been sent. Please verify the
                         email before attempting password recovery.`,
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
    },
  };
</script>
<template src="./templates/forgot_password.html"></template>
<style src="./styles/forgot_password.scss" lang="scss" scoped></style>
