import decode from 'jwt-decode';

export const state = () => ({
  accessToken: null,
  email: null,
  emailVerified: null,
  user: null,
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
  SET_EMAIL(_state, email) {
    _state.email = email || null;
  },
  SET_EMAILVERIFIED(_state, verified) {
    _state.emailVerified = verified || null;
  },
  SET_USER(_state, user) {
    _state.user = user || null;
  },
};

export const getters = {
  isAuthenticated(_state) {
    return !!_state.user;
  },
  isEmailVerified(_state) {
    return !!_state.emailVerified;
  },
};

async function setPersistence(action, commit, accessToken) {
  const { userId } = decode(accessToken);

  action.$axios.setToken(accessToken, 'Bearer');

  const res = await action.$axios.get('users?$select=email');

  commit('SET_ACCESSTOKEN', accessToken);
  commit('SET_EMAIL', res.data.data[0].email);
  commit('SET_USER', userId);
}

export const actions = {
  async jwt({ commit, dispatch }, { accessToken }) {
    try {
      console.log(accessToken);
      const res = await this.$axios.$post('authentication', {
        strategy: 'jwt',
        accessToken,
      });

      await setPersistence(this, commit, res.accessToken);
      await dispatch('verify');
      await dispatch('kyc/verify', {}, { root: true });
    } catch (error) {
      dispatch('logout');
    }
  },
  async login({ commit }, { email, password, recaptcha }) {
    try {
      const res = await this.$axios.$post('authentication', {
        strategy: 'local',
        email,
        password,
        recaptcha,
      });

      await setPersistence(this, commit, res.accessToken);
    } catch (error) {
      throw error;
    }
  },
  async logout({ commit }) {
    try {
      commit('SET_ACCESSTOKEN', null);
      commit('SET_EMAIL', null);
      commit('SET_EMAILVERIFIED', null);
      commit('SET_USER', null);
      await this.$axios.$delete('authentication');
    } catch (error) {
      console.log(error);
    }
  },
  async verify({ commit }) {
    try {
      const res = await this.$axios.$get('users?$select=isVerified');

      if (res.data.length > 0) {
        commit('SET_EMAILVERIFIED', res.data[0].isVerified);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials');
      }
    }
  },
};
