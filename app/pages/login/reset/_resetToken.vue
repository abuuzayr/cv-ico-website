<script>
  import {
    sameAs,
  } from 'vuelidate/lib/validators';
  import {
    feedbackPassword,
    feedbackConfirmPassword,
    isValidPassword,
  } from '~/helpers/authentication';

  // Declare global scoped vars
  let vm;
  let states;

  export default {
    name: 'resetToken',
    created() {
      // Instantiate view model
      vm = this;

      // Instantiate states
      states = {
        password: false,
        confirmPassword: false,
        recaptcha: false,
      }
    },
    data() {
      return {
        password: '',
        confirmPassword: '',
        recaptcha: '',
        recaptchaKey: process.env.RECAPTCHA,
      };
    },
    computed: {
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
    },
    methods: {
      feedbackPassword,
      feedbackConfirmPassword,
      checkResetStates() {
        return !(states.password && states.confirmPassword && states.recaptcha);
      },
      setRecaptcha(event) {
        vm.recaptcha = event;
      },
      submit(password, recaptcha) {
        vm.$axios.$post('authManagement', {
        	action: 'resetPwdLong',
        	value: {
            token: vm.$route.params.resetToken,
            password,
          },
          recaptcha,
        })
          .then(() => {
            vm.$notify({
              group: 'announce-info',
              title: 'Password Reset Successful',
              text: 'You have successfully reset your password. Login using \
                     your new password.',
            });
            setTimeout(() => {
              vm.$router.push('/login');
            }, 5000);
          })
          .catch((err) => {
            vm.$refs.recaptcha.reset();

            switch (err.response.status) {
              case 400:
                vm.$notify({
                  group: 'announce-error',
                  title: 'Password Reset Token Expired',
                  text: 'Password reset token has expired. Please re-initiate \
                         forgot password',
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
                  text: 'The application has encountered an unexpected error. \
                         Please contact support.',
                });
                break;
            }
          });
      },
    },
    validations: {
      confirmPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  };
</script>
<template>
  <div class="resetToken">
    <b-container class="component-container">
      <div class="row mb-5">
        <div class="col-12">
          <img src="~@/assets/images/full-size-login-logo.png" alt="login" width="100%">
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-3 sub-title">
          <h5 class="mb-3">Reset Password</h5>
          <p>
             Enter your new password.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-form-group
            v-bind:state="checkValidPassword"
          >
            <b-input-group>
              <b-input-group-addon>
                <img src="~@/assets/images/full-size-login-password-icon-dark.png" style="max-width:20px;">
              </b-input-group-addon>
              <b-form-input
                v-model="password"
                v-bind:required="true"
                v-bind:state="checkValidPassword"
                placeholder="Password"
                type="password"
              >
              </b-form-input>
            </b-input-group>
            <img src="~@/assets/images/full-size-alert-icon.png" v-if="checkValidPassword == 'invalid' || checkPasswordMatch == 'invalid'" class="icon-in-input">
            <b-form-feedback><img src="~@/assets/images/full-size-alert-icon-white.png"> Password must contain at least eight characters: both lower and uppercase letters, at least one number, and at least one special character</b-form-feedback>
          </b-form-group>
        </div>
        <div class="col-12">
          <b-form-group
            v-bind:state="checkPasswordMatch"
          >
            <b-input-group>
              <b-input-group-addon>
                <img src="~@/assets/images/full-size-login-password-icon-dark.png" style="max-width:20px;">
              </b-input-group-addon>
              <b-form-input
                v-model="confirmPassword"
                v-bind:required="true"
                v-bind:state="checkPasswordMatch"
                placeholder="Confirm Password"
                type="password"
              >
              </b-form-input>
            </b-input-group>
            <img src="~@/assets/images/full-size-alert-icon.png" v-if="checkPasswordMatch == 'invalid'" class="icon-in-input">
            <b-form-feedback><img src="~@/assets/images/full-size-alert-icon-white.png"> The passwords you entered do not match</b-form-feedback>
          </b-form-group>
        </div>
      </div>
      <div class="row justify-content-center">
        <Recaptcha
          ref="recaptcha"
          v-bind:sitekey="recaptchaKey"
          v-bind:state="checkValidRecaptcha"
          v-on:verify="setRecaptcha"
        >
        </Recaptcha>
      </div>
      <div class="row justify-content-center mt-3 mb-3">
        <b-button
          size="lg"
          type="button"
          v-bind:disabled="checkResetStates()"
          v-on:click="submit(password, recaptcha)"
        >
          Submit
        </b-button>
      </div>
    </b-container>
  </div>
</template>
