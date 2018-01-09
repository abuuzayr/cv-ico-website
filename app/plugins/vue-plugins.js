import Vue from 'vue';

import Notifications from 'vue-notification';
import Prism from 'vue-prism';
import Vuelidate from 'vuelidate';
import Particles from '../components/Particles.vue';
import VTooltip from 'v-tooltip';

Vue.use(Notifications);
Vue.use(Particles, Prism);
Vue.use(Vuelidate);
Vue.use(VTooltip);
