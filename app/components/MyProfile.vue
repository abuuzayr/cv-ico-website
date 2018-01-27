<script>
  import { mapGetters, mapState } from 'vuex';
  import { getBase64DataURI } from 'dauria';
  import {
    sameAs,
  } from 'vuelidate/lib/validators';
  import {
    feedbackPassword,
    feedbackConfirmPassword,
    isValidPassword,
  } from '~/helpers/authentication';
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
    name: 'MyProfile',
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
        idType: false,
        idNumber: false,
        identification: false,
        selfie: false,
        residence: false,
        signedform_tsa: false,
        signedform_pin: false,
        signedform_cin: false,
        signedform_pp: false,
        ethAddress: false,
        oldPassword: false,
        password: false,
        confirmPassword: false,
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
        idType: null,
        idTypes: null,
        idNumber: null,
        identification: null,
        selfie: null,
        residence: null,
        signedform_tsa: null,
        signedform_pin: null,
        signedform_cin: null,
        signedform_pp: null,
        ethAddress: '',
        email: null,
        oldPassword: '',
        password: '',
        confirmPassword: '',
        kycSubmitted: false,
        editing: false
      };
    },
    async mounted() {
      vm.countries = await vm.$axios.get('countries.txt');
      vm.countries = vm.countries.data.split('\n');
      vm.countries.unshift({
        text: 'Country',
        value: null
      });

      vm.nationalities = await vm.$axios.get('nationalities.txt');
      vm.nationalities = vm.nationalities.data.split('\n');
      vm.nationalities.unshift({
        text: 'Nationality',
        value: null
      });

      vm.idTypes = [{
          text: 'Identification Type',
          value: null
        },
        'PASSPORT', 'DRIVING LICENSE'
      ];

      vm.genders = [{
          text: 'Gender',
          value: null
        },
        'MALE', 'FEMALE'
      ];

      vm.email = vm.authentication.email;

      let kyc_res = await vm.$axios.get('users?$select=kyc');
      let {
        first_name,
        middle_name,
        last_name,
        birthday,
        country_of_birth,
        nationality,
        country_of_residence,
        gender,
        address
        } = kyc_res.data.data[0].kyc;

      vm.firstName = first_name;
      vm.middleName = middle_name;
      vm.lastName = last_name;
      birthday = new Date(birthday);
      let birthdayFormatted = birthday.getFullYear() + '-';
      birthdayFormatted += birthday.getMonth() < 9 ? '0' : '';
      birthdayFormatted += (birthday.getMonth() + 1) + '-';
      birthdayFormatted += birthday.getDate() < 10 ? '0' : '';
      birthdayFormatted += birthday.getDate();
      vm.birthday = birthdayFormatted;
      vm.birthCountry = country_of_birth;
      vm.nationality = nationality;
      vm.residenceCountry = country_of_residence;
      vm.gender = gender;
      vm.address = address;
      vm.kycSubmitted = first_name && first_name.length > 0 && !vm.isKYCVerified;

    },
    computed: {
      ...mapGetters({
        isEmailVerified: 'authentication/isEmailVerified',
        isKYCVerified: 'kyc/isKYCVerified',
      }),
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
      checkOldPassword() {
        states.oldPassword = false;

        if (vm.oldPassword.length === 0) {
          return null;
        }

        if (isValidPassword(vm.oldPassword)) {
          states.oldPassword = true;
          return 'valid';
        }

        return 'invalid';
      },
      checkValidPassword() {
        states.password = false;

        if (vm.password.length === 0) {
          return null;
        }

        if (isValidPassword(vm.password)) {
          states.password = true;
          return 'valid';
        }

        return 'invalid';
      },
      checkPasswordMatch() {
        states.confirmPassword = false;

        if (vm.confirmPassword.length === 0) {
          return null;
        }

        if (vm.$v.confirmPassword.sameAsPassword) {
          states.confirmPassword = true;
          return 'valid';
        }

        return 'invalid';
      },
      canSubmit() {
        return [
          vm.firstName,
          vm.middleName,
          vm.lastName,
          vm.birthday,
          vm.birthCountry,
          vm.nationality,
          vm.residenceCountry,
          vm.gender,
          vm.address,
          vm.identification,
          vm.selfie,
          vm.residence,
          vm.signedform_tsa,
          vm.signedform_pin,
          vm.signedform_cin,
          vm.signedform_pp,
          vm.ethAddress.length === 42,
        ].some(function(e) {
          return !e;
        });
      },
    },
    methods: {
      feedbackBirthday,
      feedbackName,
      feedbackPassword,
      feedbackConfirmPassword,
      changePassword(oldPassword, password) {
        vm.$axios.post('authManagement', {
          action: 'passwordChange',
        	value: {
            user: {
              email: vm.email,
            },
            oldPassword,
            password,
        	},
        })
          .then(() => {
            vm.$notify({
              group: 'notify',
              title: 'Password Successfully Change',
              text: 'Your password was successfully changed.',
              type: 'success',
            });
          });
      },
      checkPasswordStates() {
        return !(states.oldPassword && states.password && states.confirmPassword);
      },
      checkKYCStates() {
        return !(states.firstName && states.lastName && states.birthday);
      },
      async documentUpload(file, type) {
        try {
          const buffer = new Buffer(await vm.fileToBuffer(file));
          const uri = getBase64DataURI(buffer, file.type);
          const res = await vm.$axios.post('documents', {
            uri: uri,
            id: `${vm.authentication.user}_${type}.${file.type.split('/')[1]}`,
          });

          return res;

        } catch (e) {
          console.log (e);
        }
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
        try {
          const resIdentification = await vm.documentUpload(args['identification'], 'identification');
          const resSelfie = await vm.documentUpload(args['selfie'], 'selfie');
          const resAddress = await vm.documentUpload(args['residence'], 'residence');
          const resSignedForm_tsa = await vm.documentUpload(args['signedform_tsa'], 'signedform_tsa');
          const resSignedForm_pin = await vm.documentUpload(args['signedform_pin'], 'signedform_pin');
          const resSignedForm_cin = await vm.documentUpload(args['signedform_cin'], 'signedform_cin');
          const resSignedForm_pp = await vm.documentUpload(args['signedform_pp'], 'signedform_pp');

          vm.$axios.patch(`users/${vm.authentication.user}`, {
          'kyc.first_name': args['firstName'],
          'kyc.middle_name': args['middleName'],
          'kyc.last_name': args['lastName'],
          'kyc.country_of_birth': args['birthCountry'],
          'kyc.nationality': args['nationality'],
          'kyc.country_of_residence': args['residenceCountry'],
          'kyc.gender': args['gender'],
          'kyc.birthday': `${args['birthday']} UTC`,
          'kyc.address': args['address'],
          'kyc.id_type': args['idType'],
          'kyc.id_number': args['idNumber'],
          'kyc.eth_address': args['ethAddress'],
          'kyc.refIdentificationBlob.id': resIdentification.data.id,
          'kyc.refIdentificationBlob.checksum': resIdentification.data.checksum,
          'kyc.refSelfieBlob.id': resSelfie.data.id,
          'kyc.refSelfieBlob.checksum': resSelfie.data.checksum,
          'kyc.refAddressBlob.id': resAddress.data.id,
          'kyc.refAddressBlob.checksum': resAddress.data.checksum,
          'kyc.refSignedFormTSABlob.id': resSignedForm_tsa.data.id,
          'kyc.refSignedFormTSABlob.checksum': resSignedForm_tsa.data.checksum,
          'kyc.refSignedFormPINBlob.id': resSignedForm_pin.data.id,
          'kyc.refSignedFormPINBlob.checksum': resSignedForm_pin.data.checksum,
          'kyc.refSignedFormCINBlob.id': resSignedForm_cin.data.id,
          'kyc.refSignedFormCINBlob.checksum': resSignedForm_cin.data.checksum,
          'kyc.refSignedFormPPBlob.id': resSignedForm_pp.data.id,
          'kyc.refSignedFormPPBlob.checksum': resSignedForm_pp.data.checksum,
        })
          .then(() => {
            vm.$notify({
              group: 'notify',
              title: 'KYC Details Submitted',
              text: 'Your KYC details have been submitted.',
              type: 'success',
            });
          });
        } catch (e) {
          vm.$notify({
            group: 'notify',
            title: 'Submission Error',
            text: 'There was an error processing your submission. Please try again later.',
            type: 'warning',
          });
        }

        // await vm.$axios.post('kyc', {
        //   domain_name: 'REIDAO UAT',
        // 	rfrID: vm.authentication.user,
        // 	first_name: args['firstName'],
        // 	middle_name: args['middleName'],
        // 	last_name: args['lastName'],
        // 	country_of_birth: args['birthCountry'],
        // 	nationality: args['nationality'],
        // 	country_of_residence: args['residenceCountry'],
        // 	gender: args['gender'],
        // 	date_of_birth: moment(args['birthday']).format('DD/MM/YYYY'),
        // 	ssic_code: 'UNKNOWN',
        // 	ssoc_code: 'UNKNOWN',
        // 	onboarding_mode: 'NON FACE-TO-FACE',
        // 	payment_mode: 'VIRTUAL CURRENCY',
        // 	product_service_complexity: 'SIMPLE',
        // 	emails: [vm.authentication.email],
        // 	addresses: args['address'],
        // });
      },
      verifyEmail() {
        vm.$axios.post('authManagement', {
          action: 'resendVerifySignup',
        	value: {
        		email: vm.email,
        	},
        })
          .then(() => {
            vm.$notify({
              group: 'notify',
              title: 'Verification Email Sent',
              text: 'A verification email was sent to your email address.',
              type: 'success',
            });
          });
      },
    },
    validations: {
      confirmPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  };
</script>
<template src="./templates/my_profile.html"></template>
<style src="./styles/my_profile.scss" lang="scss" scoped></style>
<style lang="scss">
  @import '~assets/styles/main.scss';

  .custom-file-control:before { background: $green; color: #fff; }
</style>
