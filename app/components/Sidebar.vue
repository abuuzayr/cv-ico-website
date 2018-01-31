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
      vm.$emit('event-navigate', component);
      vm.setActive(component);
    },
    isActive: function (menuItem) {
      return vm.activeItem === menuItem
    },
    setActive: function (menuItem) {
      vm.activeItem = menuItem // no need for Vue.set()
    }
  },
};
</script>
<template src="./templates/sidebar.html"></template>
<style src="./styles/sidebar.scss" lang="scss" scoped></style>
