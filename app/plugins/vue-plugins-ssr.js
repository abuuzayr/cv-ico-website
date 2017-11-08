import Vue from 'vue';

import Notifications from 'vue-notifications';
import MiniToastr from 'mini-toastr';

// If using mini-toastr, provide additional configuration
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn',
};

MiniToastr.init({ types: toastTypes });

// Here we setup messages output to `mini-toastr`
const toast = ({
  title,
  message,
  type,
  timeout,
  cb,
}) => MiniToastr[type](message, title, timeout, cb);

// Binding for methods .success(), .error() and etc. You can specify and map your own methods here.
// Required to pipe our outout to UI library (mini-toastr in example here)
// All not-specified events (types) would be piped to output in console.
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
};

// ===================== Use ===================================
Vue.use(Notifications, options);
