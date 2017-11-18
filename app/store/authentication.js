import decode from 'jwt-decode';

export const state = () => ({
  accessToken: null,
  user: null,
  email: null,
  name: null,
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
  SET_USER(_state, user) {
    _state.user = user || null;
  },
  SET_EMAIL(_state, email) {
    _state.email = email || null;
  },
  SET_NAME(_state, { fname, lname }) {
    _state.name = `${fname} ${lname}` || null;
  },
};

export const getters = {
  isAuthenticated(_state) {
    return !!_state.user;
  },
};

export const actions = {
  async jwt({ commit }, { accessToken }) {
    try {
      const res = await this.$axios.$post('authentication', {
        strategy: 'jwt',
        accessToken,
      });
      const { userId } = decode(res.accessToken);

      this.$axios.setToken(res.accessToken, 'Bearer');

      const { data } = await this.$axios.get(`users/${userId}`);

      commit('SET_ACCESSTOKEN', res.accessToken);
      commit('SET_USER', userId);
      commit('SET_EMAIL', data.email);
      commit('SET_NAME', { fname: data.kyc.first_name, lname: data.kyc.last_name });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials');
      }
    }
  },
  async login({ dispatch }, { email, password, recaptcha }) {
    try {
      const { accessToken } = await this.$axios.$post('authentication', {
        strategy: 'local',
        email,
        password,
        recaptcha,
      });

      this.$axios.setToken(accessToken, 'Bearer');

      await dispatch('jwt', { accessToken });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials');
      }

      throw error;
    }
  },
  async logout({ commit }) {
    await this.$axios.$delete();
    commit('SET_USER', null);
    commit('SET_EMAIL', null);
    commit('SET_NAME', null, null);
  },
  async register({ dispatch }, { email, password, recaptcha }) {
    await this.$axios.$post('users', {
      email,
      password,
    });

    await dispatch('login', { email, password, recaptcha });
  },
};
