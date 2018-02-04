<script>
import { mapActions, mapGetters, mapState } from 'vuex';

let vm;

export default {
  name: 'Mobile-Header',
  created() {
    // Instantiate view model
    vm = this;
  },
  data() {
    return {
      isOpen: false,
      activeItem: 'dashboard',
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
      isKYCVerified: 'user/isKYCVerified',
    }),
    ...mapState([
      'authentication',
    ]),
  },
  methods: {
    ...mapActions({
      logout: 'authentication/logout',
    }),
    signOut() {
      vm.logout().then(() => {
        vm.$router.push('/');
      });
    },
    toggleSidebar() {
      if (vm.isOpen) vm.isOpen = !vm.isOpen;
    },
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
  },
  directives: {
    'click-outside': {
      bind(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
          console.log(warn);
        }
        // Define Handler and cache it on the element
        const { bubble } = binding.modifiers;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler; // eslint-disable-line no-param-reassign,no-underscore-dangle,max-len

        // add Event Listeners
        document.addEventListener('click', handler);
      },

      unbind(el, binding) { // eslint-disable-line no-unused-vars
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__); // eslint-disable-line no-param-reassign,no-underscore-dangle,max-len
        el.__vueClickOutside__ = null; // eslint-disable-line no-param-reassign,no-underscore-dangle
      },
    },
  },
};
</script>
<template src="./templates/mobile-header.html"></template>
<style src="./styles/mobile-header.scss" lang="scss" scoped></style>
