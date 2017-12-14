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
      });
    },
  };
</script>
<template>
  <div class="verify">
    <b-card no-body>
      <b-tabs class="nav-justified">
        <b-tab title="Your email is now verified">
          <div class="container-fluid">
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
