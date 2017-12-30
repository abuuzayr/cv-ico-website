<script>
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
    notifications: {
      errorLogin: {
        title: 'Login Failed',
        message: 'Failed to authenticate',
        type: 'error',
      },
    },
  };
</script>
<template src="./templates/profile.html"></template>
<style src="./styles/profile.scss" lang="scss" scoped></style>
