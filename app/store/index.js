import * as cookie from 'cookie';

export const state = () => ({
  appTitle: 'Crowdvilla Token Sale',
  appVersion: '1.0.0',
});

export const mutations = {

};

// export const actions = {
//   async nuxtServerInit({ dispatch }, { req }) {
//     if (req.headers.cookie) {
//       const storage = JSON.parse(cookie.parse(req.headers.cookie).vuex);
//       const { accessToken } = storage.authentication;

//       if (accessToken !== null) {
//         await dispatch('authentication/jwt', { accessToken });
//       }
//     }
//   },
// };
