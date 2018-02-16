import * as cookie from 'cookie';

export const state = () => ({
  appTitle: 'Crowdvilla Token Sale',
  appVersion: '1.0.0',
});

export const mutations = {

};

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    if (req.headers.cookie) {
      const parsedCookie = cookie.parse(req.headers.cookie);

      if (parsedCookie.crowdvilla) {
        const storage = JSON.parse(parsedCookie.crowdvilla);
        const { accessToken } = storage.authentication;

        if (accessToken) {
          this.$axios.setToken(accessToken, 'Bearer');
          await dispatch('authentication/jwt', { accessToken });
          await dispatch('user/setPersistence', { accessToken });
        }
      }
    }
  },
};
