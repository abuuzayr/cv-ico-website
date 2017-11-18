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
<template></template>
