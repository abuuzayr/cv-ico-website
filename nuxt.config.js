const postcsscssnext = require('postcss-cssnext');
const path = require('path');
const formatter = require('eslint-friendly-formatter');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  /*
  ** Axios configuration
  */
  axios: {
    baseURL: 'http://localhost:1337',
    credentials: false,
    debug: true,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          include: [resolve('app'), resolve('test')],
          options: {
            formatter,
          },
        });
      }
    },
    postcss: [
      postcsscssnext(),
    ],
    vendor: [
      'vuelidate',
      'vue-notification',
      'vue-prism',
    ],
  },
  css: [
    'animate.css/animate.css',
  ],
  dev: process.env.NODE_ENV !== 'production',
  env: {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 1338,
    RECAPTCHA: process.env.RECAPTCHA_KEY,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100,400,500,600,700,900' },
    ],
    script: [
      { src: 'https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js' },
      { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: undefined, defer: undefined },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/font-awesome',
  ],
  plugins: [
    { src: '@/plugins/vue-components-ssr.js', ssr: true },
    { src: '@/plugins/vue-plugins.js', ssr: false },
    { src: '@/plugins/filters.js', ssr: true },
    { src: '@/plugins/local-storage.js', ssr: false },
    { src: '@/plugins/ga.js', ssr: false },
    { src: '@/plugins/eth.js', ssr: false },
  ],
  srcDir: 'app/',
};
