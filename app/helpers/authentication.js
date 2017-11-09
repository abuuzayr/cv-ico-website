export default {
  isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;

    if (re.test(email)) {
      return true;
    }

    return false;
  },

  isValidPassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

    if (re.test(password)) {
      return true;
    }

    return false;
  },
};
