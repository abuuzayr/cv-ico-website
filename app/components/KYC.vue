<script>
  import { mapState } from 'vuex';
  import { getBase64DataURI } from 'dauria';
  import {
    feedbackBirthday,
    feedbackName,
    isValidBirthday,
    isValidName,
  } from '~/helpers/kyc';
  import moment from 'moment';

  // Declare global scoped vars
  let vm;
  let states;

  export default {
    name: 'KYC',
    beforeMount() {
      vm.$axios.setToken(vm.authentication.accessToken, 'Bearer');
    },
    created() {
      // Instantiate view model
      vm = this;

      // Instantiate states
      states = {
        firstName: false,
        middleName: false,
        lastName: false,
        birthday: false,
        nationality: false,
        address: false,
        identification: false,
        selfie: false,
        residence: false,
        signedform: false,
      };
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
        email: null,
      };
    },
    async mounted() {
      vm.countries = await vm.$axios.get('countries.txt');
      vm.countries = vm.countries.data.split('\n');
      vm.countries.unshift({ text: 'Country', value: null });

      vm.nationalities = await vm.$axios.get('nationalities.txt');
      vm.nationalities = vm.nationalities.data.split('\n');
      vm.nationalities.unshift({ text: 'Nationality', value: null });

      vm.genders = [
        { text: 'Gender', value: null },
        'MALE', 'FEMALE'
      ];

      vm.email = vm.authentication.email;
    },
    computed: {
      ...mapState([
        'authentication',
      ]),
      checkValidFName() {
        states.firstName = false;

        if (!vm.firstName) {
          return null;
        }

        if (isValidName(vm.firstName)) {
          states.firstName = true;
          return 'valid';
        }

        return 'invalid';
      },
      checkValidMName() {
        states.middleName = false;

        if (!vm.middleName) {
          return null;
        }

        if (isValidName(vm.middleName)) {
          states.middleName = true;
          return 'valid';
        }

        return 'invalid';
      },
      checkValidLName() {
        states.lastName = false;

        if (!vm.lastName) {
          return null;
        }

        if (isValidName(vm.lastName)) {
          states.lastName = true;
          return 'valid';
        }

        return 'invalid';
      },
      checkValidBirthday() {
        states.birthday = false;

        if (!vm.birthday) {
          return null;
        }

        if (isValidBirthday(vm.birthday)) {
          states.birthday = true;
          return 'valid';
        }

        return 'invalid';
      },
    },
    methods: {
      feedbackBirthday,
      feedbackName,
      checkKYCStates() {
        return !(states.firstName && states.lastName && states.birthday);
      },
      async documentUpload(file, type) {
        const buffer = new Buffer(await vm.fileToBuffer(file));
        const uri = getBase64DataURI(buffer, file.type);
        const res = await vm.$axios.post('documents', {
          uri: uri,
          id: `${vm.authentication.user}_${type}.${file.type.split('/')[1]}`,
        });

        return res;
      },
      fileToBuffer(file) {
        return new Promise((resolve, reject) => {
          const reader = new window.FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });
      },
      async submit(args) {
        const resIdentification = await vm.documentUpload(args['identification'], 'identification');
        const resSelfie = await vm.documentUpload(args['selfie'], 'selfie');
        const resAddress = await vm.documentUpload(args['residence'], 'residence');
        const resSignedForm = await vm.documentUpload(args['signedform'], 'signedform');

        await vm.$axios.patch(`users/${vm.authentication.user}`, {
          'kyc.first_name': args['firstName'],
          'kyc.middle_name': args['middleName'],
          'kyc.last_name': args['lastName'],
          'kyc.country_of_birth': args['birthCountry'],
          'kyc.nationality': args['nationality'],
          'kyc.country_of_residence': args['residenceCountry'],
          'kyc.gender': args['gender'],
          'kyc.birthday': `${args['birthday']} UTC`,
          'kyc.address': args['address'],
          'kyc.refIdentificationBlob.id': resIdentification.data.id,
          'kyc.refIdentificationBlob.checksum': resIdentification.data.checksum,
          'kyc.refSelfieBlob.id': resSelfie.data.id,
          'kyc.refSelfieBlob.checksum': resSelfie.data.checksum,
          'kyc.refAddressBlob.id': resAddress.data.id,
          'kyc.refAddressBlob.checksum': resAddress.data.checksum,
          'kyc.refSignedFormBlob.id': resSignedForm.data.id,
          'kyc.refSignedFormBlob.checksum': resSignedForm.data.checksum,
        });

        await vm.$axios.post('kyc', {
          domain_name: 'REIDAO UAT',
        	rfrID: vm.authentication.user,
        	first_name: args['firstName'],
        	middle_name: args['middleName'],
        	last_name: args['lastName'],
        	country_of_birth: args['birthCountry'],
        	nationality: args['nationality'],
        	country_of_residence: args['residenceCountry'],
        	gender: args['gender'],
        	date_of_birth: moment(args['birthday']).format('DD/MM/YYYY'),
        	ssic_code: 'UNKNOWN',
        	ssoc_code: 'UNKNOWN',
        	onboarding_mode: 'NON FACE-TO-FACE',
        	payment_mode: 'VIRTUAL CURRENCY',
        	product_service_complexity: 'SIMPLE',
        	emails: [vm.authentication.email],
        	addresses: args['address'],
        });
      },
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
<template src="./templates/kyc.html"></template>
<style src="./styles/kyc.scss" lang="scss" scoped></style>
<style lang="scss">
@import '~assets/styles/main.scss';

.custom-file-control:before {
  background: $green;
  color: #fff;
}
</style>
