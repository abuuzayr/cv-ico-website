import Vue from 'vue';
import reCAPTCHA from 'vue-recaptcha';

import Dashboard from '../components/Dashboard.vue';
import Footer from '../components/Footer.vue';
import KYC from '../components/KYC.vue';
import Navigation from '../components/Navigation.vue';
import Login from '../components/Login.vue';
import Logo from '../components/Logo.vue';
import MailChimp from '../components/MailChimp.vue';
import Particles from '../components/Particles.vue';
import Registration from '../components/Registration.vue';

Vue.component('Dashboard', Dashboard);
Vue.component('Footer', Footer);
Vue.component('KYC', KYC);
Vue.component('Navigation', Navigation);
Vue.component('Login', Login);
Vue.component('Logo', Logo);
Vue.component('MailChimp', MailChimp);
Vue.component('Particles', Particles);
Vue.component('reCAPTCHA', reCAPTCHA);
Vue.component('Registration', Registration);
