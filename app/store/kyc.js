export const state = () => ({
  verified: null,
});

/* eslint no-param-reassign:
  ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["_state"]
  }]
*/
export const mutations = {
  SET_VERIFIED(_state, verified) {
    _state.verified = verified || null;
  },
};

export const getters = {
  isVerified(_state) {
    return !!_state.verified;
  },
};

export const actions = {
  async verify({ commit }) {
    try {
      const res = await this.$axios.$get('users?$select=kyc.isVerified');

      if (res.data.length > 0) {
        commit('SET_VERIFIED', res.data[0].kyc.isVerified);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials');
      }
    }
  },
};
