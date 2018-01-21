/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';

function numFormat(value) {
  if (value === 0) {
    return 0;
  } else if (!value) {
    return '';
  }

  const result = value
    .toString()
    .replace(new RegExp(`^(\\d{${(value.toString().length % 3 ? value.toString().length % 3 : 0)}})(\\d{3})`, 'g'), '$1 $2').replace(/(\d{3})+?/gi, '$1 ')
    .trim()
    .replace(/\s/g, ',');

  return result;
}

function twoDigits(value) {
  if (value.toString().length <= 1) {
    return `0${value.toString()}`;
  }

  return value.toString();
}

Vue.filter('numFormat', numFormat);
Vue.filter('twoDigits', twoDigits);
