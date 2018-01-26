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
        name: null,
      };
    },
    mounted() {
      vm.name = (vm.data.kyc.first_name && vm.data.kyc.last_name) ? `${vm.data.kyc.first_name} ${vm.data.kyc.last_name}` : null;
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        isKYCVerified: 'user/isKYCVerified',
      }),
      ...mapState([
        'user',
      ]),
      displayUser() {
        return (vm.name !== null) ? vm.name : vm.data.email;
      },
    },
    methods: {
      ...mapActions({
        logout: 'authentication/logout',
      }),
      signOut() {
        vm.logout().then(() => {
          vm.$router.push('/');
        });
      }
    },
    props: ['data'],
  };
</script>
<template src="./templates/header.html"></template>
<style src="./styles/header.scss" lang="scss" scoped></style>
