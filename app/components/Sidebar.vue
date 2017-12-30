<script>
// Declare global scoped vars
let vm;

export default {
  name: 'Sidebar',
  created() {
    // Instantiate view model
    vm = this;
  },
  methods: {
    navigate(component) {
      this.$emit('event-navigate', component);
    },
  },
};
</script>
<template src="./templates/sidebar.html"></template>
<style src="./styles/sidebar.scss" lang="scss" scoped></style>
