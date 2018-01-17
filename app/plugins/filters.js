import Vue from 'vue';

function numFormat(value) {
  if (value === 0) {
    return 0;
  } else if (!value) {
    return '';
  }
  value = value.toString();
  value = value.replace(new RegExp('^(\\d{' + (value.length%3? value.length%3:0) + '})(\\d{3})', 'g'), '$1 $2').replace(/(\d{3})+?/gi, '$1 ').trim();
  value = value.replace(/\s/g, ',');

  return value;
}

function twoDigits(value) {
  if (value.toString().length <= 1) {
    return `0${value.toString()}`;
  }

  return value.toString();
}

Vue.filter('numFormat', numFormat);
Vue.filter('twoDigits', twoDigits);
