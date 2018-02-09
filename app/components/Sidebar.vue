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
      activeItem: 'dashboard',
    };
  },
  methods: {
    navigate(component) {
      vm.$emit('event-navigate', component);
      vm.setActive(component);
    },
    isActive(menuItem) {
      return vm.activeItem === menuItem;
    },
    setActive(menuItem) {
      vm.activeItem = menuItem;
    },
    externalLink(path) {
      window.open(`https://crowdvilla.io/${path}`,'_blank');
    }
  },
};
</script>
<template src="./templates/sidebar.html"></template>
<style src="./styles/sidebar.scss" lang="scss" scoped></style>
