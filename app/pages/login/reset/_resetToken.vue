<script>
  // Declare global scoped vars
  let vm;

  export default {
    name: 'resetToken',
    created() {
      // Instantiate view model
      vm = this;
    },
    mounted() {
      vm.$axios.$post('authManagement', {
      	action: 'resetPwdLong',
      	value: vm.$route.params.resetToken,
      });
    },
  };
</script>
<template>
  <div class="verify">
    <b-card no-body>
      <b-tabs class="nav-justified">
        <b-tab title="Your password was successfully reset">
          <div class="container-fluid">
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
