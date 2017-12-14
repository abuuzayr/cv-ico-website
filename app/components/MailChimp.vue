<script>
  let vm;

  export default {
    name: 'MailChimp',
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        disabled: true,
        email: '',
        icon: null,
        tester: 'null',
      };
    },
    computed: {
      checkValidEmail() {
        const re = /\S+@\S+\.\S+/;
        let result;

        if (vm.email.length === 0) {
          vm.disabled = true;
          result = null;
        } else if (re.test(vm.email)) {
          vm.disabled = false;
          result = 'fa-check success';
        } else {
          vm.disabled = true;
          result = 'fa-exclamation-triangle warning';
        }

        return result;
      },
    },
  };
</script>
<template src="./templates/mailchimp.html"></template>
<style src="./styles/mailchimp.scss" lang="scss" scoped></style>
