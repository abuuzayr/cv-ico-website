<script>
  // Declare scoped vars
  let vm;

  export default {
    name: 'Dashboard',
    created() {
      // Instantiate view model
      vm = this;
    },
    notifications: {
      errorLogin: {
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error',
      },
    },
  };
</script>
<template src="./templates/dashboard.html"></template>
<style src="./styles/dashboard.scss" lang="scss" scoped></style>
