<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  let vm;

  export default {
    name: 'Header',
    created() {
      // Instantiate view model
      vm = this;
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
      }
    },
  };
</script>
<template src="./templates/header.html"></template>
<style src="./styles/header.scss" lang="scss" scoped></style>
