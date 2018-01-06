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
      activeItem: 'dashboard'
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'authentication/isAuthenticated',
      isVerified: 'kyc/isVerified',
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
        vm.$router.push('login');
      });
    },
    toggleSidebar() {
      if (this.isOpen) this.isOpen = !this.isOpen;
    },
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
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding['value'] !== 'function') {
        	const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding['expression']}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
          	binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
			},

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  },
  filters: {
    capitalize(value) {
      return value.slice(0,1).toUpperCase() + value.slice(1,value.length);
    }
  }
};
</script>
<template src="./templates/mobile-header.html"></template>
<style src="./styles/mobile-header.scss" lang="scss" scoped></style>
