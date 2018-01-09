function feedbackEmail(input) {
  return input === 'invalid' ? 'Please enter a valid email address' : '';
}

function feedbackPassword(input) {
  return input === 'invalid' ? 'Password must contain at least eight '
                                + 'characters: both lower and uppercase letters, '
                                + 'at least one number, '
                                + 'and at least one special character' : '';
}

function feedbackConfirmPassword(input) {
  return input === 'invalid' ? 'Password does not match!' : '';
}

function isValidPassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

  if (re.test(password)) {
    return true;
  }

  return false;
}

export default null;
export {
  feedbackEmail,
  feedbackPassword,
  feedbackConfirmPassword,
  isValidPassword,
};
