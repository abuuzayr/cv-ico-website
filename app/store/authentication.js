export const state = () => ({
  user: null,
});

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
    const { token, email } = await this.$axios.$post('authentication', {
      strategy: 'jwt',
      accessToken,
    });

    this.$axios.setToken(token, 'Bearer');
    commit('SET_USER', email);
  },
  async login({ commit }, { email, password }) {
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
