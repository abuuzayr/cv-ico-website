export const state = () => ({
  accessToken: null,
});

/* eslint no-param-reassign:
  ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["_state"]
  }]
*/
export const mutations = {
  SET_ACCESSTOKEN(_state, accessToken) {
    _state.accessToken = accessToken || null;
  },
};

export const getters = {

};

function endpoint() {
  return (process.server) ? '/authentication' : '/api/authentication';
}

export const actions = {
  async jwt({ commit, dispatch }, { accessToken }) {
    try {
      const { accessToken: newAccessToken } = await this.$axios.$post(endpoint(), {
        strategy: 'jwt',
        accessToken,
      });

      this.$axios.setToken(newAccessToken, 'Bearer');
      commit('SET_ACCESSTOKEN', newAccessToken);
    } catch (error) {
      switch (error.response.status) {
        case 401:
          dispatch('logout');
          break;
        case 403:
          throw error;
        default:
          break;
      }
    }
  },
  async login({ commit }, { email, password, recaptcha }) {
    try {
      const { accessToken } = await this.$axios.$post(endpoint(), {
        strategy: 'user',
        email,
        password,
        recaptcha,
      });

      this.$axios.setToken(accessToken, 'Bearer');
      commit('SET_ACCESSTOKEN', accessToken);
    } catch (error) {
      throw error;
    }
  },
  async logout({ commit, dispatch }) {
    try {
      commit('SET_ACCESSTOKEN', null);
      dispatch('user/unsetPersistence', {}, { root: true });
      // await this.$axios.$delete(endpoint());
      console.log('logout');
    } catch (error) {
      throw error;
    }
  },
};
