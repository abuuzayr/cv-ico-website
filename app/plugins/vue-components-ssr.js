import Vue from 'vue';
import reCAPTCHA from 'vue-recaptcha';

import Footer from '../components/Footer.vue';
import ForgotPassword from '../components/ForgotPassword.vue';
import Header from '../components/Header.vue';
import KYC from '../components/KYC.vue';
import Login from '../components/Login.vue';
import Logo from '../components/Logo.vue';
import MailChimp from '../components/MailChimp.vue';
import Particles from '../components/Particles.vue';
import Registration from '../components/Registration.vue';
import Sidebar from '../components/Sidebar.vue';
import NeedHelp from '../components/NeedHelp.vue';

Vue.component('Footer', Footer);
Vue.component('ForgotPassword', ForgotPassword);
Vue.component('KYC', KYC);
Vue.component('Header', Header);
Vue.component('Login', Login);
Vue.component('Logo', Logo);
Vue.component('MailChimp', MailChimp);
Vue.component('Particles', Particles);
Vue.component('reCAPTCHA', reCAPTCHA);
Vue.component('Registration', Registration);
Vue.component("Sidebar", Sidebar);
Vue.component("NeedHelp", NeedHelp);
