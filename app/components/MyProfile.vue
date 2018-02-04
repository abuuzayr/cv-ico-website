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
        signedformTSA: false,
        signedformPIN: false,
        signedformCIN: false,
        signedformPP: false,
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
        nationality: null,
        residenceCountry: null,
        gender: null,
        address: null,
        idType: null,
        idNumber: null,
        identification: null,
        selfie: null,
        residence: null,
        signedformTSA: null,
        signedformPIN: null,
        signedformCIN: null,
        signedformPP: null,
        ethAddress: '',
        email: null,
        oldPassword: '',
        password: '',
        confirmPassword: '',
        kycSubmitted: false,
        editing: false
      };
    },
    mounted() {
      vm.email = vm.user.email;

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
        isEmailVerified: 'user/isEmailVerified',
        isKYCSubmitted: 'user/isKYCSubmitted',
        isKYCVerified: 'user/isKYCVerified',
      }),
      ...mapState([
        'user',
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
          vm.signedformTSA,
          vm.signedformPIN,
          vm.signedformCIN,
          vm.signedformPP,
          vm.ethAddress.length === 42,
        ].some(e => !e);
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
        let res;

        try {
          const buffer = Buffer.alloc(await vm.fileToBuffer(file));
          const uri = getBase64DataURI(buffer, file.type);
          res = await vm.$axios.post('documents', {
            uri,
            id: `${vm.user.userID}_${type}.${file.type.split('/')[1]}`,
          });

          return res;
        } catch (e) {
          console.log(e);
        }

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
        try {
          const resIdentification = await vm.documentUpload(args.identification, 'identification');
          const resSelfie = await vm.documentUpload(args.selfie, 'selfie');
          const resAddress = await vm.documentUpload(args.residence, 'residence');
          const resSignedFormTSA = await vm.documentUpload(args.signedformTSA, 'signedformTSA');
          const resSignedFormPIN = await vm.documentUpload(args.signedformPIN, 'signedformPIN');
          const resSignedFormCIN = await vm.documentUpload(args.signedformCIN, 'signedformCIN');
          const resSignedFormPP = await vm.documentUpload(args.signedformPP, 'signedformPP');

          vm.$axios.patch(`users/${vm.user.userID}`, {
            'kyc.first_name': args.firstName,
            'kyc.middle_name': args.middleName,
            'kyc.last_name': args.lastName,
            'kyc.country_of_birth': args.birthCountry,
            'kyc.nationality': args.nationality,
            'kyc.country_of_residence': args.residenceCountry,
            'kyc.gender': args.gender,
            'kyc.birthday': `${args.birthday} UTC`,
            'kyc.address': args.address,
            'kyc.id_type': args.idType,
            'kyc.id_number': args.idNumber,
            'kyc.eth_address': args.ethAddress,
            'kyc.refIdentificationBlob.id': resIdentification.data.id,
            'kyc.refIdentificationBlob.checksum': resIdentification.data.checksum,
            'kyc.refSelfieBlob.id': resSelfie.data.id,
            'kyc.refSelfieBlob.checksum': resSelfie.data.checksum,
            'kyc.refAddressBlob.id': resAddress.data.id,
            'kyc.refAddressBlob.checksum': resAddress.data.checksum,
            'kyc.refSignedFormTSABlob.id': resSignedFormTSA.data.id,
            'kyc.refSignedFormTSABlob.checksum': resSignedFormTSA.data.checksum,
            'kyc.refSignedFormPINBlob.id': resSignedFormPIN.data.id,
            'kyc.refSignedFormPINBlob.checksum': resSignedFormPIN.data.checksum,
            'kyc.refSignedFormCINBlob.id': resSignedFormCIN.data.id,
            'kyc.refSignedFormCINBlob.checksum': resSignedFormCIN.data.checksum,
            'kyc.refSignedFormPPBlob.id': resSignedFormPP.data.id,
            'kyc.refSignedFormPPBlob.checksum': resSignedFormPP.data.checksum,
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
    props: ['data', 'fields'],
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
