import Vue from 'vue';

function twoDigits(value) {
  if (value.toString().length <= 1) {
    return `0${value.toString()}`;
  }

  return value.toString();
}

Vue.filter('twoDigits', twoDigits);
