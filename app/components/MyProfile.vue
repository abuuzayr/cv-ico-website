<script>
  import { mapGetters, mapState } from 'vuex';
  import { getBase64DataURI, parseDataURI } from 'dauria';
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
  var web3 = require("web3")

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
        identificationImg: null,
        selfie: null,
        selfieImg: null,
        residence: null,
        residenceImg: null,
        signedformTSA: null,
        signedformTSAImg: null,
        signedformPIN: null,
        signedformPINImg: null,
        signedformCIN: null,
        signedformCINImg: null,
        signedformPP: null,
        signedformPPImg: null,
        changedFileFields: [],
        ethAddress: '',
        email: null,
        oldPassword: '',
        password: '',
        confirmPassword: '',
        kycSubmitted: false,
        editing: false,
        verifyLastSent: null,
        verifyResend: false,
        emailInterval: null,
        checkTimeInterval: null,
        remainingTime: []
      };
    },
    async mounted() {
      vm.email = vm.user.email;
      const verifyLastSent = await vm.$axios.get('users?$select=verifyLastSent');
      vm.verifyLastSent = new Date(verifyLastSent.data.data[0].verifyLastSent);

      vm.setEmailInterval();

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
        address,
        eth_address
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
      vm.ethAddress = eth_address;
      vm.kycSubmitted = first_name && first_name.length > 0 && !vm.isKYCVerified;

      vm.getImages();

    },
    computed: {
      ...mapGetters({
        isEmailVerified: 'user/isEmailVerified',
        isKYCSubmitted: 'user/kycSubmitted',
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
          vm.changedFileFields.indexOf('identification') > -1 || !vm.kycSubmitted ? vm.identification : true,
          vm.changedFileFields.indexOf('selfie') > -1 || !vm.kycSubmitted ? vm.selfie : true,
          vm.changedFileFields.indexOf('residence') > -1 || !vm.kycSubmitted ? vm.residence : true,
          vm.changedFileFields.indexOf('signedformTSA') > -1 || !vm.kycSubmitted ? vm.signedformTSA : true,
          vm.changedFileFields.indexOf('signedformPIN') > -1 || !vm.kycSubmitted ? vm.signedformPIN : true,
          vm.changedFileFields.indexOf('signedformCIN') > -1 || !vm.kycSubmitted ? vm.signedformCIN : true,
          vm.changedFileFields.indexOf('signedformPP') > -1 || !vm.kycSubmitted ? vm.signedformPP : true,
          web3.utils.isAddress(vm.ethAddress)
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
          const buffer = Buffer.from(await vm.fileToBuffer(file));
          const uri = getBase64DataURI(buffer, file.type);
          res = await vm.$axios.post('documents', {
            uri,
            id: `${vm.user.userID}_${type}.${file.type.split('/')[1]}`,
          });
          return res;
        } catch (e) {
          console.log("document upload error: " + e);
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
      changedField (field) {
        if (vm.changedFileFields.indexOf(field.srcElement.id) == -1) {
          vm.changedFileFields.push(field.srcElement.id);
        }
        switch (field.srcElement.id) {
          case 'identification':
            vm.identificationImg = '';
            break;
          case 'selfie':
            vm.selfieImg = '';
            break;
          case 'residence':
            vm.residenceImg = '';
            break;
          case 'signedformTSA':
            vm.signedformTSAImg = '';
            break;
          case 'signedformPIN':
            vm.signedformPINImg = '';
            break;
          case 'signedformCIN':
            vm.signedformCINImg = '';
            break;
          case 'signedformPP':
            vm.signedformPPImg = '';
            break;
          default:
            console.log('default');
        }
      },
      async getImages() {

        let kyc_res = await vm.$axios.get('users?$select=kyc');
        let {
          refIdentificationBlob,
          refSelfieBlob,
          refResidenceBlob,
          refSignedFormTSABlob,
          refSignedFormPINBlob,
          refSignedFormCINBlob,
          refSignedFormPPBlob
        } = kyc_res.data.data[0].kyc;
        if (refIdentificationBlob.id) {
          vm.identificationImg = await vm.$axios.get(`documents/${refIdentificationBlob.id}`)
            .then(result => result.data.uri);
        } else {
          vm.identificationImg = "";
        }
        if (refSelfieBlob.id) {
          vm.selfieImg = await vm.$axios.get(`documents/${refSelfieBlob.id}`)
            .then(result => result.data.uri);
        } else {
          vm.selfieImg = "";
        }
        if (refResidenceBlob.id) {
          vm.residenceImg = await vm.$axios.get(`documents/${refResidenceBlob.id}`)
            .then(result => result.data.uri);
        } else {
          vm.residenceImg = "";
        }
        if (refSignedFormTSABlob.id) {
          vm.signedformTSAImg = await vm.$axios.get(`documents/${refSignedFormTSABlob.id}`)
            .then(result => result.data.uri);
        } else {
          vm.signedformTSAImg = "";
        }
        if (refSignedFormPINBlob.id) {
          vm.signedformPINImg = await vm.$axios.get(`documents/${refSignedFormPINBlob.id}`)
            .then(result => result.data.uri);
        } else {
          vm.signedformPINImg = "";
        }
        if (refSignedFormCINBlob.id) {
          vm.signedformCINImg = await vm.$axios.get(`documents/${refSignedFormCINBlob.id}`)
            .then(result => result.data.uri);
        } else {
          vm.signedformCINImg = "";
        }
        if (refSignedFormPPBlob.id) {
          vm.signedformPPImg = await vm.$axios.get(`documents/${refSignedFormPPBlob.id}`)
            .then(result => result.data.uri);
        } else {
          vm.signedformPPImg = "";
        }
      },
      async submit(args) {
        try {

          let patchObj = {
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
          };

          if (vm.kycSubmitted && vm.changedFileFields.indexOf('identification') > -1 || !vm.kycSubmitted) {
            const resIdentification = await vm.documentUpload(args.identification, 'identification');
            patchObj['kyc.refIdentificationBlob.id'] = resIdentification.data.id;
            patchObj['kyc.refIdentificationBlob.checksum'] = resIdentification.data.checksum;
          };

          if (vm.kycSubmitted && vm.changedFileFields.indexOf('selfie') > -1 || !vm.kycSubmitted) {
            const resSelfie = await vm.documentUpload(args.selfie, 'selfie');
            patchObj['kyc.refSelfieBlob.id'] = resSelfie.data.id;
            patchObj['kyc.refSelfieBlob.checksum'] = resSelfie.data.checksum;
          };

          if (vm.kycSubmitted && vm.changedFileFields.indexOf('residence') > -1 || !vm.kycSubmitted) {
            const refResidence = await vm.documentUpload(args.residence, 'residence');
            patchObj['kyc.refResidenceBlob.id'] = refResidence.data.id;
            patchObj['kyc.refResidenceBlob.checksum'] = refResidence.data.checksum;
          };

          if (vm.kycSubmitted && vm.changedFileFields.indexOf('signedformTSA') > -1 || !vm.kycSubmitted) {
            const resSignedFormTSA = await vm.documentUpload(args.signedformTSA, 'signedformTSA');
            patchObj['kyc.refSignedFormTSABlob.id'] = resSignedFormTSA.data.id;
            patchObj['kyc.refSignedFormTSABlob.checksum'] = resSignedFormTSA.data.checksum;
          };

          if (vm.kycSubmitted && vm.changedFileFields.indexOf('signedformPIN') > -1 || !vm.kycSubmitted) {
            const resSignedFormPIN = await vm.documentUpload(args.signedformPIN, 'signedformPIN');
            patchObj['kyc.refSignedFormPINBlob.id'] = resSignedFormPIN.data.id;
            patchObj['kyc.refSignedFormPINBlob.checksum'] = resSignedFormPIN.data.checksum;
          };

          if (vm.kycSubmitted && vm.changedFileFields.indexOf('signedformCIN') > -1 || !vm.kycSubmitted) {
            const resSignedFormCIN = await vm.documentUpload(args.signedformCIN, 'signedformCIN');
            patchObj['kyc.refSignedFormCINBlob.id'] = resSignedFormCIN.data.id;
            patchObj['kyc.refSignedFormCINBlob.checksum'] = resSignedFormCIN.data.checksum;
          };

          if (vm.kycSubmitted && vm.changedFileFields.indexOf('signedformPP') > -1 || !vm.kycSubmitted) {
            const resSignedFormPP = await vm.documentUpload(args.signedformPP, 'signedformPP');
            patchObj['kyc.refSignedFormPPBlob.id'] = resSignedFormPP.data.id;
            patchObj['kyc.refSignedFormPPBlob.checksum'] = resSignedFormPP.data.checksum;
          };

          vm.$axios.patch(`users/${vm.user.userID}`, patchObj)
            .then(() => {
              vm.$notify({
                group: 'notify',
                title: 'KYC Details Submitted',
                text: 'Your KYC details have been submitted.',
                type: 'success',
              });
              vm.editing = false;
              vm.getImages();
            });
        } catch (e) {
          console.log("the error: " + e);
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
            vm.$axios.patch(`users/${vm.user.userID}`, {
              'verifyLastSent': new Date()
            });
            vm.verifyLastSent = new Date();
            vm.verifyResend = false;
            vm.setEmailInterval();
            vm.$notify({
              group: 'notify',
              title: 'Verification Email Sent',
              text: 'A verification email was sent to your email address.',
              type: 'success',
            });
          });
      },
      setEmailInterval() {
        vm.emailInterval = setInterval(() => {
          if (new Date() - vm.verifyLastSent >= 300000) {
            clearInterval(vm.emailInterval);
            vm.verifyResend = true;
          }
          vm.getRemainingTime();
        }, 1000);
      },
      getRemainingTime() {
        vm.checkTimeInterval = setInterval(() => {
          if (new Date() - vm.verifyLastSent >= 300000) {
            clearInterval(vm.checkTimeInterval);
            vm.remainingTime = [];
          } else {
            let duration = 300000 - (new Date() - vm.verifyLastSent);
            vm.remainingTime = [
              parseInt((duration/(1000*60))%60),
              parseInt((duration/1000)%60)
            ];
          }
        }, 1000);
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

  .custom-file-label:after {
    background: $green;
    color: #fff;
    }
</style>

