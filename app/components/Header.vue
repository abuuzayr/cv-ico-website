<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  let vm;

  export default {
    name: 'Header',
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
      const res = await vm.$axios.get('users?$select=kyc.first_name&$select=kyc.last_name');
      const { first_name, last_name } = res.data.data[0].kyc;
      vm.user = (first_name && last_name) ? `${first_name} ${last_name}` : null;
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'authentication/isAuthenticated',
        isVerified: 'kyc/isVerified',
      }),
      ...mapState([
        'authentication',
      ]),
      displayUser() {
        return (vm.user !== null) ? vm.user : vm.authentication.email;
      },
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
