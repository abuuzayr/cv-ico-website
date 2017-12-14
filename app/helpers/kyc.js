function feedbackBirthday(input) {
  return input === 'invalid' ? 'You must be of legal age to register' : '';
}

function feedbackName(input) {
  return input === 'invalid' ? 'Please enter a valid name' : '';
}

function isValidBirthday(birthday) {
  return true;
}

function isValidName(name) {
  const re = /^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$/;

  if (re.test(name)) {
    return true;
  }

  return false;
}

export default null;
export {
  feedbackBirthday,
  feedbackName,
  isValidBirthday,
  isValidName,
};
