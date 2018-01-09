<script>
  import { mapState } from 'vuex';

  // Declare global scoped vars
  let vm;

  export default {
    name: 'Profile',
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        firstName: null,
        middleName: null,
        lastName: null,
        birthday: null,
        birthCountry: null,
        countries: null,
        nationality: null,
        nationalities: null,
        residenceCountry: null,
        gender: null,
        genders: null,
        address: null,
        identification: null,
        selfie: null,
        residence: null,
        signedform: null,
      };
    },
    async mounted() {
      const res = await vm.$axios.get(`users/${vm.authentication.user}`);
      vm.firstName = res.data.kyc.first_name;
      vm.middleName = res.data.kyc.middle_name;
      vm.lastName = res.data.kyc.last_name;
      vm.birthday = res.data.kyc.birthday;
      vm.birthCountry = res.data.kyc.country_of_birth;
      vm.nationality = res.data.kyc.nationality;
      vm.residenceCountry = res.data.kyc.country_of_residence;
      vm.gender = res.data.kyc.gender;
      vm.address = res.data.kyc.address;
    },
    computed: {
      ...mapState([
        'authentication',
      ]),
    },
  };
</script>
<template src="./templates/profile.html"></template>
<style src="./styles/profile.scss" lang="scss" scoped></style>
