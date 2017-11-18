<script>
  // Declare global scoped vars
  let vm;

  export default {
    name: 'Dashboard',
    created() {
      // Instantiate view model
      vm = this;
    },
  };
</script>
<template src="~/templates/dashboard.html"></template>
<style src="~/assets/styles/dashboard.scss" lang="scss" scoped></style>
