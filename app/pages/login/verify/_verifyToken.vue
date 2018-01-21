<script>
  // Declare global scoped vars
  let vm;

  export default {
    name: 'verifyToken',
    created() {
      // Instantiate view model
      vm = this;
    },
    mounted() {
      vm.$axios.$post('authManagement', {
        action: 'verifySignupLong',
        value: vm.$route.params.verifyToken,
      })
      .then(() => {
        vm.$notify({
          group: 'announce-info',
          title: 'Verification Successful',
          text: 'You have successfully verified your email. Please login \
                 to continue',
        });
      })
      .catch((err) => {
        switch (err.response.status) {
          case 400:
            vm.$notify({
              group: 'announce-error',
              title: 'Verification Token Invalid',
              text: 'The verification token used when verifying your email \
                     was incorrect. Resend another verification email.',
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
  };
</script>
<template>
  <div class="verifyToken">
    <b-container class="component-container">
      <Login />
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .verifyToken {
    @include page-mixin();
  }

  @media (max-width: $screen-xs-max) {
  }
  @media (min-width: $screen-sm-min) {
  }
  @media (min-width: $screen-md-min) {
  }
  @media (min-width: $screen-lg-min) {
  }
</style>
