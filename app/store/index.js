export const state = () => ({
  user: null,
});

/* eslint no-param-reassign:
  ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["ustate"]
  }]
*/
export const mutations = {
  SET_USER(user) {
    state.user = user || null;
  },
};

export const getters = {
  isAuthenticated() {
    return !!state.user;
  },
};

export const actions = {
  async jwt({ commit }, { accessToken }) {
    /* eslint no-console: 0 */
    console.log('& accesstoken: ');
    console.log(accessToken);

    const { token, email } = await this.$axios.$post('authentication', {
      strategy: 'jwt',
      accessToken,
    });

    this.$axios.setToken(token, 'Bearer');
    commit('SET_USER', email);
  },
  async login({ commit }, { email, password }) {
    console.log('logging in');
    const payload = await this.$axios.$post('authentication', {
      strategy: 'local',
      email,
      password,
    });

    commit('SET_USER', payload.email);
  },
  async logout({ commit }) {
    await this.$axios.$delete();
    commit('SET_USER', null);
  },
  async register({ dispatch }, { email, password }) {
    await this.$axios.$post('users', {
      email,
      password,
    });
    dispatch('login', { email, password });
  },
};
