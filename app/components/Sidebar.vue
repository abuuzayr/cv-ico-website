<script>
// Declare global scoped vars
let vm;

export default {
  name: 'Sidebar',
  created() {
    // Instantiate view model
    vm = this;
  },
  data() {
    return {
      activeItem: 'dashboard'
    }
  },
  methods: {
    navigate(component) {
      this.$emit('event-navigate', component);
      this.setActive(component);
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem // no need for Vue.set()
    }
  },
};
</script>
<template src="./templates/sidebar.html"></template>
<style src="./styles/sidebar.scss" lang="scss" scoped></style>
