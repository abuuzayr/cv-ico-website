import decode from 'jwt-decode';

export const state = () => ({
  accessToken: null,
  email: null,
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
  SET_USER(_state, user) {
    _state.user = user || null;
  },
};

export const getters = {
  isAuthenticated(_state) {
    return !!_state.user;
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
      const res = await this.$axios.$post('authentication', {
        strategy: 'jwt',
        accessToken,
      });

      await setPersistence(this, commit, res.accessToken);
      await dispatch('kyc/verify', {}, { root: true });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch('logout');
      }
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
    await this.$axios.$delete('authentication');
    commit('SET_USER', null);
    commit('SET_ACCESSTOKEN', null);
  },
};
